/* ==========================================================
   script.js
   Darunnazat Siddikia Kamil Madrasah

   This file is written in simple JavaScript on purpose:
   small functions, clear names, and a comment on each part.
   The notices and timeline come from data.js (loaded first).

   What is inside:
    1. Small helper functions
    2. Toast messages (small popups)
    3. Light / dark theme
    4. Clock and date
    5. Scroll effects (progress bar, back to top, sticky shadow)
    6. Menu: dropdowns and the phone drawer
    7. Notice strip (latest notice with arrows)
    8. Photo slider and big photo viewer
    9. Notice center: tabs, search, filter, load more
   10. Calendar
   11. History and timeline
   12. Copy email button
   13. Reveal on scroll
   14. Start everything
   ========================================================== */


/* ==========================================================
   1. SMALL HELPER FUNCTIONS
   ========================================================== */

// Find ONE element. Example: $("#menuBtn")
function $(selector, parent) {
  return (parent || document).querySelector(selector);
}

// Find ALL elements and return them as a normal array.
function $$(selector, parent) {
  return Array.prototype.slice.call((parent || document).querySelectorAll(selector));
}

// Bengali digits, month names and weekday names
var BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

var BN_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

var BN_MONTHS_SHORT = [
  "জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"
];

// Sunday is first here because JavaScript counts Sunday as 0.
var BN_WEEKDAYS = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
];

// Turn 2026 into ২০২৬
function toBangla(value) {
  return String(value).replace(/[0-9]/g, function (digit) {
    return BN_DIGITS[digit];
  });
}

// Make a number two digits long: 5 becomes "05"
function twoDigits(number) {
  return number < 10 ? "0" + number : String(number);
}

// Replay a CSS animation by removing and adding its class again.
function replayAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth; // this line forces the browser to restart the animation
  element.classList.add(className);
}

// Choose an icon for a notice file (pdf, image, or no file yet)
function getFileIcon(url) {
  if (!url) {
    return "fa-regular fa-file";
  }
  var lower = url.toLowerCase();
  if (lower.indexOf(".pdf") !== -1) {
    return "fa-solid fa-file-pdf";
  }
  if (lower.indexOf(".jpg") !== -1 || lower.indexOf(".jpeg") !== -1 || lower.indexOf(".png") !== -1) {
    return "fa-solid fa-file-image";
  }
  return "fa-solid fa-arrow-up-right-from-square";
}

// Used when a notice has no file attached
function showMissingFileMessage() {
  showToast("এই বিজ্ঞপ্তির ফাইল এখনো যুক্ত করা হয়নি।", "fa-solid fa-circle-info");
}


/* ==========================================================
   2. TOAST MESSAGES
   ========================================================== */
function showToast(message, iconClass) {
  var box = $("#toastBox");

  var toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = '<i class="' + (iconClass || "fa-solid fa-circle-info") + '" aria-hidden="true"></i><span></span>';
  $("span", toast).textContent = message;
  box.appendChild(toast);

  // After 2.6 seconds fade it out, then remove it.
  setTimeout(function () {
    toast.classList.add("hide");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 2600);
}


/* ==========================================================
   3. LIGHT / DARK THEME
   (theme-init.js already set the first theme. Here we handle
   the button.)
   ========================================================== */
function updateThemeButton() {
  var isDark = document.documentElement.getAttribute("data-theme") === "dark";
  var button = $("#themeToggle");
  var icon = $("i", button);

  // Show the icon of the theme you can switch TO.
  icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  button.setAttribute("aria-label", isDark ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন");
}

function setupThemeToggle() {
  updateThemeButton();

  $("#themeToggle").addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    var newTheme = isDark ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem("dskm-theme", newTheme);
    } catch (error) {
      // Saving can fail in private mode. The theme still changes.
    }
    updateThemeButton();
  });
}


/* ==========================================================
   4. CLOCK AND DATE
   ========================================================== */

// Bengali name for the part of the day
function getDayPeriod(hour) {
  if (hour >= 4 && hour < 6) {
    return "ভোর";
  }
  if (hour >= 6 && hour < 12) {
    return "সকাল";
  }
  if (hour >= 12 && hour < 15) {
    return "দুপুর";
  }
  if (hour >= 15 && hour < 17) {
    return "বিকাল";
  }
  if (hour >= 17 && hour < 19) {
    return "সন্ধ্যা";
  }
  return "রাত";
}

function updateClock() {
  var now = new Date();

  // Date: রবিবার, ১৫ নভেম্বর ২০২৬
  var dateText =
    BN_WEEKDAYS[now.getDay()] + ", " +
    toBangla(now.getDate()) + " " +
    BN_MONTHS[now.getMonth()] + " " +
    toBangla(now.getFullYear());

  // Time in 12-hour style: সকাল ১০:৫০:১০
  var hour12 = now.getHours() % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  var timeText =
    getDayPeriod(now.getHours()) + " " +
    toBangla(twoDigits(hour12) + ":" + twoDigits(now.getMinutes()) + ":" + twoDigits(now.getSeconds()));

  $("#todayDate").textContent = dateText;
  $("#clockTime").textContent = timeText;
}

function setupClock() {
  updateClock();
  setInterval(updateClock, 1000); // update every second
}


/* ==========================================================
   5. SCROLL EFFECTS
   ========================================================== */
var scrollTicking = false;

function handleScroll() {
  var scrolled = window.scrollY;
  var maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // 1) Progress bar at the top
  var percent = maxScroll > 0 ? scrolled / maxScroll : 0;
  $("#scrollProgress").style.transform = "scaleX(" + percent + ")";

  // 2) Shadow under the sticky menu bar
  $("#mainNav").classList.toggle("is-scrolled", scrolled > 140);

  // 3) Back-to-top button
  $("#backTop").classList.toggle("show", scrolled > 600);
}

function setupScrollEffects() {
  // requestAnimationFrame keeps scrolling smooth
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        handleScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  $("#backTop").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  handleScroll();
}


/* ==========================================================
   6. MENU: DROPDOWNS AND THE PHONE DRAWER
   ========================================================== */
function closeDropdown(item) {
  item.classList.remove("open");
  $(".dropdown-toggle", item).setAttribute("aria-expanded", "false");
}

// Close every open dropdown (except the one we pass in, if any)
function closeAllDropdowns(exceptItem) {
  $$(".has-dropdown.open").forEach(function (item) {
    if (item !== exceptItem) {
      closeDropdown(item);
    }
  });
}

function setupDropdowns() {
  $$(".has-dropdown").forEach(function (item) {
    var toggle = $(".dropdown-toggle", item);

    toggle.addEventListener("click", function () {
      var willOpen = !item.classList.contains("open");

      closeAllDropdowns(item);
      item.classList.toggle("open", willOpen);
      toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    // On a computer, moving the mouse away closes the menu again.
    item.addEventListener("mouseleave", function () {
      var isDesktop = window.innerWidth > 1100;
      var inTopBar = item.closest(".top-bar");
      if (isDesktop || inTopBar) {
        closeDropdown(item);
      }
    });
  });

  // Click anywhere else: close dropdowns
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".has-dropdown")) {
      closeAllDropdowns();
    }
  });
}

function openMenu() {
  document.body.classList.add("nav-open", "no-scroll");
  $("#menuBtn").setAttribute("aria-expanded", "true");
  $("#menuBtn").setAttribute("aria-label", "মেনু বন্ধ করুন");
}

function closeMenu() {
  document.body.classList.remove("nav-open");
  // Only unlock scrolling if the photo viewer is not open
  if (!$("#lightbox").classList.contains("is-open")) {
    document.body.classList.remove("no-scroll");
  }
  $("#menuBtn").setAttribute("aria-expanded", "false");
  $("#menuBtn").setAttribute("aria-label", "মেনু খুলুন");
}

function setupMobileMenu() {
  $("#menuBtn").addEventListener("click", function () {
    if (document.body.classList.contains("nav-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $("#menuClose").addEventListener("click", closeMenu);
  $("#navOverlay").addEventListener("click", closeMenu);

  // If the screen becomes wide, close the drawer
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1100 && document.body.classList.contains("nav-open")) {
      closeMenu();
    }
  });
}


/* ==========================================================
   7. NOTICE STRIP (latest notice with arrows)
   Nothing moves by itself. It changes only when you click.
   ========================================================== */
var stripNotices = allNotices.slice(0, 10); // the 10 latest
var stripIndex = 0;

function showStripNotice(index) {
  var total = stripNotices.length;
  stripIndex = (index + total) % total; // wraps around at both ends

  var notice = stripNotices[stripIndex];
  var link = $("#stripLink");

  link.textContent = notice.title;
  link.title = notice.title;

  if (notice.url) {
    link.href = notice.url;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.href = "#notices";
    link.removeAttribute("target");
  }

  $("#stripCount").textContent = toBangla(stripIndex + 1) + " / " + toBangla(total);
  replayAnimation(link, "swap");
}

function setupNoticeStrip() {
  showStripNotice(0);

  $("#stripPrev").addEventListener("click", function () {
    showStripNotice(stripIndex - 1);
  });

  $("#stripNext").addEventListener("click", function () {
    showStripNotice(stripIndex + 1);
  });

  // A notice with no file: show a message instead of jumping around
  $("#stripLink").addEventListener("click", function (event) {
    if (!stripNotices[stripIndex].url) {
      event.preventDefault();
      showMissingFileMessage();
    }
  });
}


/* ==========================================================
   8. PHOTO SLIDER AND BIG PHOTO VIEWER
   ========================================================== */
var slides = [];
var dots = [];
var currentSlide = 0;

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach(function (slide, i) {
    slide.classList.toggle("is-active", i === currentSlide);
  });

  dots.forEach(function (dot, i) {
    dot.classList.toggle("is-active", i === currentSlide);
    dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
  });

  $("#sliderCount").textContent = toBangla(currentSlide + 1) + " / " + toBangla(slides.length);
}

function buildSliderDots() {
  var dotsBox = $("#sliderDots");

  slides.forEach(function (slide, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", "ছবি " + toBangla(i + 1));
    dot.addEventListener("click", function () {
      goToSlide(i);
    });
    dotsBox.appendChild(dot);
    dots.push(dot);
  });
}

function setupSlider() {
  var slider = $("#heroSlider");
  slides = $$(".slide", slider);

  buildSliderDots();
  goToSlide(0);

  $("#sliderPrev").addEventListener("click", function () {
    goToSlide(currentSlide - 1);
  });

  $("#sliderNext").addEventListener("click", function () {
    goToSlide(currentSlide + 1);
  });

  // Swipe on a phone: drag left or right.
  // A short tap (no drag) opens the big photo.
  var startX = null;

  slider.addEventListener("pointerdown", function (event) {
    if (event.target.closest("button")) {
      return; // ignore clicks on the arrows and dots
    }
    startX = event.clientX;
  });

  slider.addEventListener("pointerup", function (event) {
    if (startX === null) {
      return;
    }
    var distance = event.clientX - startX;
    startX = null;

    if (Math.abs(distance) > 40) {
      goToSlide(currentSlide + (distance < 0 ? 1 : -1));
    } else {
      openLightbox(currentSlide);
    }
  });

  slider.addEventListener("pointercancel", function () {
    startX = null;
  });

  // Keyboard: arrows change photo, Enter opens the big photo
  slider.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      goToSlide(currentSlide - 1);
    } else if (event.key === "ArrowRight") {
      goToSlide(currentSlide + 1);
    } else if (event.key === "Enter" && event.target === slider) {
      openLightbox(currentSlide);
    }
  });
}

/* ---- Big photo viewer (lightbox) ---- */
var lastFocusedElement = null;

function showLightboxPhoto(index) {
  var lightboxImg = $("#lightboxImg");
  var total = slides.length;
  var photoIndex = (index + total) % total;
  var sourceImg = $("img", slides[photoIndex]);

  lightboxImg.src = sourceImg.src;
  lightboxImg.alt = sourceImg.alt;
  $("#lightboxCount").textContent = sourceImg.alt + " (" + toBangla(photoIndex + 1) + " / " + toBangla(total) + ")";
  replayAnimation(lightboxImg, "pop");

  // Keep the small slider on the same photo
  goToSlide(photoIndex);
}

function openLightbox(index) {
  var lightbox = $("#lightbox");
  lastFocusedElement = document.activeElement;

  showLightboxPhoto(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $("#lightboxClose").focus();
}

function closeLightbox() {
  var lightbox = $("#lightbox");
  if (!lightbox.classList.contains("is-open")) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  if (!document.body.classList.contains("nav-open")) {
    document.body.classList.remove("no-scroll");
  }

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function setupLightbox() {
  $("#lightboxClose").addEventListener("click", closeLightbox);

  $("#lightboxPrev").addEventListener("click", function () {
    showLightboxPhoto(currentSlide - 1);
  });

  $("#lightboxNext").addEventListener("click", function () {
    showLightboxPhoto(currentSlide + 1);
  });

  // Click on the dark area (not on the photo) closes it
  $("#lightbox").addEventListener("click", function (event) {
    if (event.target === $("#lightbox")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!$("#lightbox").classList.contains("is-open")) {
      return;
    }
    if (event.key === "ArrowLeft") {
      showLightboxPhoto(currentSlide - 1);
    } else if (event.key === "ArrowRight") {
      showLightboxPhoto(currentSlide + 1);
    }
  });
}


/* ==========================================================
   9. NOTICE CENTER
   ========================================================== */

/* ---- 9a. Building one notice row ----
   badgeHtml : the little date box on the left (or empty text)
   metaHtml  : extra line under the title (for example a tag)
   delay     : milliseconds to wait before it slides in
   Titles come from our own data.js file, and we add them with
   textContent, which is the safe way to put text on a page. */
function createNoticeRow(notice, badgeHtml, metaHtml, delay) {
  var listItem = document.createElement("li");
  listItem.className = "notice-item enter";
  listItem.style.animationDelay = delay + "ms";

  // A notice with a file is a link. A notice without one is a button.
  var row;
  if (notice.url) {
    row = document.createElement("a");
    row.href = notice.url;
    row.target = "_blank";
    row.rel = "noopener";
  } else {
    row = document.createElement("button");
    row.type = "button";
    row.addEventListener("click", showMissingFileMessage);
  }
  row.className = "notice-link";

  row.innerHTML =
    badgeHtml +
    '<span class="notice-body"><span class="notice-title"></span>' + metaHtml + "</span>" +
    '<i class="' + getFileIcon(notice.url) + ' notice-file" aria-hidden="true"></i>';

  $(".notice-title", row).textContent = notice.title;

  listItem.appendChild(row);
  return listItem;
}

/* ---- 9b. Switch between "by level" and "all notices" ---- */
function switchNoticeView(viewName) {
  var levelView = $("#levelView");
  var allView = $("#allView");

  levelView.hidden = viewName !== "level";
  allView.hidden = viewName !== "all";

  replayAnimation(viewName === "level" ? levelView : allView, "swap");

  $$(".segment").forEach(function (button) {
    var isActive = button.getAttribute("data-view") === viewName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

/* ---- 9c. Notices by level (tabs) ---- */
function renderLevelNotices(levelKey) {
  var list = $("#levelList");
  var notices = levelNotices[levelKey];

  list.innerHTML = "";
  $("#levelEmpty").hidden = notices.length !== 0;

  notices.forEach(function (notice, index) {
    var badge =
      '<span class="date-badge">' +
      "<b>" + toBangla(notice.day) + "</b>" +
      "<small>" + BN_MONTHS_SHORT[notice.month - 1] + "</small>" +
      "<small>" + toBangla(notice.year) + "</small>" +
      "</span>";

    list.appendChild(createNoticeRow(notice, badge, "", index * 60));
  });
}

function setupLevelTabs() {
  var tabs = $$("#levelTabs .tab");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (otherTab) {
        var isThis = otherTab === tab;
        otherTab.classList.toggle("is-active", isThis);
        otherTab.setAttribute("aria-selected", isThis ? "true" : "false");
      });
      renderLevelNotices(tab.getAttribute("data-level"));
    });
  });

  renderLevelNotices("dakhil");
}

/* ---- 9d. All notices: search, filter, load more ----
   Each notice gets a category by looking for key words in its
   title. The ORDER matters: the first match wins. */
var categories = [
  { key: "all",        label: "সব",           words: [] },
  { key: "result",     label: "ফলাফল",        words: ["ফলাফল"] },
  { key: "form",       label: "ফরম ফিলাপ",    words: ["ফরম ফিলাপ", "ফলম ফিলাপ"] },
  { key: "fee",        label: "ফি",           words: ["সেশন ফি", "ফি পরিশোধ"] },
  { key: "exam",       label: "পরীক্ষা",      words: ["নির্বাচনী পরীক্ষা", "মৌখিক", "ভাইভা", "সময়সূচী"] },
  { key: "admission",  label: "ভর্তি",        words: ["ভর্তি"] },
  { key: "job",        label: "নিয়োগ",       words: ["নিয়োগ"] },
  { key: "assignment", label: "এসাইনমেন্ট",   words: ["এসাইনমেন্ট", "থিসিস"] },
  { key: "other",      label: "অন্যান্য",     words: [] }
];

var PAGE_SIZE = 12;          // how many notices to show at first
var activeCategory = "all";
var visibleCount = PAGE_SIZE;
var searchText = "";

// Find the category key for one title
function detectCategory(title) {
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    for (var j = 0; j < category.words.length; j++) {
      if (title.indexOf(category.words[j]) !== -1) {
        return category.key;
      }
    }
  }
  return "other";
}

function getCategoryLabel(key) {
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].key === key) {
      return categories[i].label;
    }
  }
  return "";
}

// Prepare every notice once: add its category and a search-friendly title
function prepareAllNotices() {
  allNotices.forEach(function (notice) {
    notice.category = detectCategory(notice.title);
    notice.searchTitle = toBangla(notice.title); // so "2023" also matches "২০২৩"
  });
}

// Return only the notices that match the category and the search box
function getFilteredNotices() {
  var query = toBangla(searchText.trim());

  return allNotices.filter(function (notice) {
    var categoryMatches = activeCategory === "all" || notice.category === activeCategory;
    var searchMatches = query === "" || notice.searchTitle.indexOf(query) !== -1;
    return categoryMatches && searchMatches;
  });
}

// Count how many notices are in a category (used on the chips)
function countCategory(key) {
  if (key === "all") {
    return allNotices.length;
  }
  return allNotices.filter(function (notice) {
    return notice.category === key;
  }).length;
}

function renderAllNotices(appendOnly) {
  var list = $("#allList");
  var filtered = getFilteredNotices();
  var shownCount = Math.min(visibleCount, filtered.length);

  // "appendOnly" is true when the "load more" button was pressed:
  // we keep the rows already there and add only the new ones.
  var startIndex = appendOnly ? list.children.length : 0;
  if (!appendOnly) {
    list.innerHTML = "";
  }

  for (var i = startIndex; i < shownCount; i++) {
    var notice = filtered[i];
    var tag = '<span class="tag">' + getCategoryLabel(notice.category) + "</span>";
    list.appendChild(createNoticeRow(notice, "", tag, (i - startIndex) * 35));
  }

  // Result text, empty message, and the load more button
  $("#resultCount").textContent = toBangla(filtered.length) + "টি বিজ্ঞপ্তি পাওয়া গেছে";
  $("#allEmpty").hidden = filtered.length !== 0;

  var remaining = filtered.length - shownCount;
  $("#loadMore").hidden = remaining <= 0;
  $("#loadMore").textContent = "আরও দেখুন (" + toBangla(remaining) + "টি বাকি)";
}

function renderCategoryChips() {
  var box = $("#categoryChips");
  box.innerHTML = "";

  categories.forEach(function (category) {
    var count = countCategory(category.key);
    if (count === 0) {
      return; // do not show empty categories
    }

    var chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (category.key === activeCategory ? " is-active" : "");
    chip.setAttribute("aria-pressed", category.key === activeCategory ? "true" : "false");
    chip.innerHTML = category.label + " <small>" + toBangla(count) + "</small>";

    chip.addEventListener("click", function () {
      activeCategory = category.key;
      visibleCount = PAGE_SIZE;
      renderCategoryChips();
      renderAllNotices(false);
    });

    box.appendChild(chip);
  });
}

function setupAllNotices() {
  prepareAllNotices();
  renderCategoryChips();
  renderAllNotices(false);

  var searchInput = $("#noticeSearch");
  var clearButton = $("#searchClear");

  // Search as you type
  searchInput.addEventListener("input", function () {
    searchText = searchInput.value;
    clearButton.hidden = searchText === "";
    visibleCount = PAGE_SIZE;
    renderAllNotices(false);
  });

  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    searchText = "";
    clearButton.hidden = true;
    visibleCount = PAGE_SIZE;
    renderAllNotices(false);
    searchInput.focus();
  });

  // "Clear search" button inside the empty message: reset everything
  $("#resetFilters").addEventListener("click", function () {
    searchInput.value = "";
    searchText = "";
    clearButton.hidden = true;
    activeCategory = "all";
    visibleCount = PAGE_SIZE;
    renderCategoryChips();
    renderAllNotices(false);
  });

  $("#loadMore").addEventListener("click", function () {
    visibleCount = visibleCount + PAGE_SIZE;
    renderAllNotices(true);
  });
}

function setupNoticeCenter() {
  // The two big buttons at the top: "by level" and "all notices"
  $$(".segment").forEach(function (button) {
    button.addEventListener("click", function () {
      switchNoticeView(button.getAttribute("data-view"));
    });
  });

  // Button inside the "no notices in this level" message
  $("#goToAll").addEventListener("click", function () {
    switchNoticeView("all");
  });

  setupLevelTabs();
  setupAllNotices();
}


/* ==========================================================
   10. CALENDAR
   The week starts on Saturday, as in Bangladesh.
   Days that have a notice get a small green dot.
   ========================================================== */
var today = new Date();
var calYear = today.getFullYear();
var calMonth = today.getMonth();      // 0 = January ... 11 = December
var selectedDateKey = "";             // like "2026-11-1"
var noticesByDate = {};               // filled by buildNoticeDateMap()

// Make a key such as "2026-11-1" for a date
function makeDateKey(year, month, day) {
  return year + "-" + month + "-" + day;
}

// Go through the level notices and remember which dates have notices
function buildNoticeDateMap() {
  for (var levelKey in levelNotices) {
    levelNotices[levelKey].forEach(function (notice) {
      var key = makeDateKey(notice.year, notice.month, notice.day);
      if (!noticesByDate[key]) {
        noticesByDate[key] = [];
      }
      noticesByDate[key].push({
        title: notice.title,
        url: notice.url,
        level: levelNames[levelKey]
      });
    });
  }
}

// The text box under the calendar
function showCalendarDetail(year, month, day) {
  var box = $("#calDetail");
  var key = makeDateKey(year, month, day);
  var notices = noticesByDate[key];

  var dateLabel = toBangla(day) + " " + BN_MONTHS[month - 1] + " " + toBangla(year);
  box.innerHTML = "<strong></strong>";
  $("strong", box).textContent = dateLabel;

  if (!notices) {
    box.appendChild(document.createTextNode("এই দিনে কোনো বিজ্ঞপ্তি নেই।"));
  } else {
    notices.forEach(function (notice) {
      var link = document.createElement("a");
      link.textContent = notice.level + ": " + notice.title;
      if (notice.url) {
        link.href = notice.url;
        link.target = "_blank";
        link.rel = "noopener";
      } else {
        link.href = "#notices";
        link.addEventListener("click", function (event) {
          event.preventDefault();
          showMissingFileMessage();
        });
      }
      box.appendChild(link);
    });
  }

  replayAnimation(box, "swap");
}

function showCalendarHint() {
  $("#calDetail").textContent = "যেকোনো তারিখে ক্লিক করলে সেই দিনের বিজ্ঞপ্তি এখানে দেখা যাবে।";
}

function selectCalendarDay(day) {
  selectedDateKey = makeDateKey(calYear, calMonth + 1, day);
  renderCalendar(false);
  showCalendarDetail(calYear, calMonth + 1, day);
}

// animate = true only when the month changes (not on every day click)
function renderCalendar(animate) {
  var grid = $("#calGrid");
  grid.innerHTML = "";

  $("#calTitle").textContent = BN_MONTHS[calMonth] + " " + toBangla(calYear);

  // Which weekday is the 1st? JavaScript: Sunday = 0 ... Saturday = 6.
  // Our week starts on Saturday, so we shift by one.
  var firstWeekday = new Date(calYear, calMonth, 1).getDay();
  var emptyCells = (firstWeekday + 1) % 7;
  var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  // Empty boxes before the 1st
  for (var i = 0; i < emptyCells; i++) {
    grid.appendChild(document.createElement("span"));
  }

  // One button for each day
  for (var day = 1; day <= daysInMonth; day++) {
    (function (dayNumber) {
      var key = makeDateKey(calYear, calMonth + 1, dayNumber);
      var column = (emptyCells + dayNumber - 1) % 7; // 0 = Saturday ... 6 = Friday

      var button = document.createElement("button");
      button.type = "button";
      button.className = "cal-day";
      button.textContent = toBangla(dayNumber);

      if (column === 6) {
        button.classList.add("is-friday");
      }
      if (dayNumber === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()) {
        button.classList.add("is-today");
      }
      if (noticesByDate[key]) {
        button.classList.add("has-notice");
      }
      if (key === selectedDateKey) {
        button.classList.add("is-selected");
      }

      var label = toBangla(dayNumber) + " " + BN_MONTHS[calMonth] + " " + toBangla(calYear);
      if (noticesByDate[key]) {
        label = label + ", বিজ্ঞপ্তি আছে";
      }
      button.setAttribute("aria-label", label);

      button.addEventListener("click", function () {
        selectCalendarDay(dayNumber);
      });

      grid.appendChild(button);
    })(day);
  }

  if (animate) {
    replayAnimation(grid, "swap");
  }
}

function changeCalendarMonth(step) {
  calMonth = calMonth + step;

  if (calMonth < 0) {
    calMonth = 11;
    calYear = calYear - 1;
  } else if (calMonth > 11) {
    calMonth = 0;
    calYear = calYear + 1;
  }

  selectedDateKey = "";
  renderCalendar(true);
  showCalendarHint();
}

function setupCalendar() {
  buildNoticeDateMap();
  renderCalendar(false);
  showCalendarHint();

  $("#calPrev").addEventListener("click", function () {
    changeCalendarMonth(-1);
  });

  $("#calNext").addEventListener("click", function () {
    changeCalendarMonth(1);
  });

  $("#calToday").addEventListener("click", function () {
    calYear = today.getFullYear();
    calMonth = today.getMonth();
    selectCalendarDay(today.getDate());
  });
}


/* ==========================================================
   11. HISTORY AND TIMELINE
   ========================================================== */

// "Read the full history" button
function setupHistoryToggle() {
  var button = $("#historyToggle");
  var area = $("#historyMore");

  button.addEventListener("click", function () {
    var willOpen = !area.classList.contains("is-open");

    area.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", willOpen ? "true" : "false");
    $("#historyToggleText").textContent = willOpen ? "সংক্ষেপে দেখুন" : "পুরো ইতিহাস পড়ুন";
  });
}

// Timeline: build it from the milestones list in data.js
function setupTimeline() {
  var list = $("#timeline");

  milestones.forEach(function (milestone, index) {
    var item = document.createElement("li");
    item.className = "timeline-item";

    item.innerHTML =
      '<button class="timeline-btn" type="button" aria-expanded="false">' +
        '<span class="timeline-year"></span>' +
        '<span class="timeline-title"></span>' +
        '<i class="fa-solid fa-chevron-down caret" aria-hidden="true"></i>' +
      "</button>" +
      '<div class="timeline-body"><div class="timeline-body-inner"><p></p></div></div>';

    $(".timeline-year", item).textContent = milestone.year;
    $(".timeline-title", item).textContent = milestone.title;
    $("p", item).textContent = milestone.text;

    $(".timeline-btn", item).addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      // Close every item, then open this one (unless it was already open)
      $$(".timeline-item", list).forEach(function (other) {
        other.classList.remove("is-open");
        $(".timeline-btn", other).setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        $(".timeline-btn", item).setAttribute("aria-expanded", "true");
      }
    });

    list.appendChild(item);

    // Open the first step at the start
    if (index === 0) {
      item.classList.add("is-open");
      $(".timeline-btn", item).setAttribute("aria-expanded", "true");
    }
  });
}


/* ==========================================================
   12. COPY EMAIL BUTTON
   ========================================================== */
function copyTextOldWay(text) {
  // Fallback for old browsers: use a hidden text box
  var box = document.createElement("textarea");
  box.value = text;
  box.style.position = "fixed";
  box.style.opacity = "0";
  document.body.appendChild(box);
  box.select();

  var worked = false;
  try {
    worked = document.execCommand("copy");
  } catch (error) {
    worked = false;
  }
  document.body.removeChild(box);
  return worked;
}

function setupCopyButtons() {
  $$("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var text = button.getAttribute("data-copy");

      function showSuccess() {
        showToast("কপি হয়েছে: " + text, "fa-solid fa-circle-check");
      }

      function showFailure() {
        showToast("কপি করা যায়নি। নিজে নির্বাচন করে কপি করুন।", "fa-solid fa-circle-info");
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showSuccess, function () {
          if (copyTextOldWay(text)) {
            showSuccess();
          } else {
            showFailure();
          }
        });
      } else if (copyTextOldWay(text)) {
        showSuccess();
      } else {
        showFailure();
      }
    });
  });
}


/* ==========================================================
   13. REVEAL ON SCROLL
   Elements with the class "reveal" ease into place the first
   time they scroll into view.
   ========================================================== */
function setupReveal() {
  var items = $$(".reveal");

  // Very old browsers: just show everything
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      item.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only once
      }
    });
  }, { threshold: 0.1 });

  items.forEach(function (item) {
    observer.observe(item);
  });
}


/* ==========================================================
   14. START EVERYTHING
   ========================================================== */

// Hide the broken-image icon if a picture can not load
function setupImageFallback() {
  $$("img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
      img.classList.add("img-failed");
    }
    img.addEventListener("error", function () {
      img.classList.add("img-failed");
    });
  });
}

// Escape key closes the menu, dropdowns and the photo viewer
function setupEscapeKey() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllDropdowns();
      closeMenu();
      closeLightbox();
    }
  });
}

function init() {
  setupThemeToggle();
  setupClock();
  setupScrollEffects();
  setupDropdowns();
  setupMobileMenu();
  setupNoticeStrip();
  setupSlider();
  setupLightbox();
  setupNoticeCenter();
  setupCalendar();
  setupHistoryToggle();
  setupTimeline();
  setupCopyButtons();
  setupReveal();
  setupImageFallback();
  setupEscapeKey();
}

document.addEventListener("DOMContentLoaded", init);
