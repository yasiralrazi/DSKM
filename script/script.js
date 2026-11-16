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
    5. Scroll effects (back to top, sticky shadow)
    6. Menu: dropdowns and the phone drawer
    7. Notice strip (latest notice with arrows)
    8. Photo slider and big photo viewer
    9. Notice center: tabs, search, filter, load more
   10. Calendar
   11. History and timeline
   12. Copy email button
   13. Reveal on scroll
   14. Extra features: stats counter, text size, form search, shortcut
   15. Start everything
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

// Some visitors ask their device for less motion.
// For them, nothing moves by itself (no autoplay).
var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

// Hijri (Islamic) date, worked out by the browser itself.
// It is calculated, so it can differ by one day from the
// moon sighting in Bangladesh.
var lastHijriDay = -1;

function getHijriText(date) {
  try {
    var parts = new Intl.DateTimeFormat("bn-BD-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).formatToParts(date);

    var day = "";
    var month = "";
    var year = "";
    parts.forEach(function (part) {
      if (part.type === "day") { day = part.value; }
      if (part.type === "month") { month = part.value; }
      if (part.type === "year") { year = part.value; }
    });

    if (day === "" || month === "" || year === "") {
      return "";
    }
    return day + " " + month + " " + year + " হিজরি";
  } catch (error) {
    return ""; // the browser does not support it
  }
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

  // The Hijri date only changes once a day
  if (now.getDate() !== lastHijriDay) {
    lastHijriDay = now.getDate();
    var hijriText = getHijriText(now);
    $("#hijriDate").textContent = hijriText;
    $(".top-hijri").hidden = hijriText === "";
  }
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

  // 1) Shadow under the sticky menu bar
  $("#mainNav").classList.toggle("is-scrolled", scrolled > 140);

  // 2) Back-to-top button
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
var STRIP_TIME = 5000;                       // change notice every 5 seconds
var stripNotices = allNotices.slice(0, 10);  // the 10 latest
var stripIndex = 0;
var stripTimer = null;
var stripHovered = false;

// (Re)start the timer. It does nothing while the mouse is on the strip,
// while the tab is hidden, or if the visitor asked for less motion.
function startStripTimer() {
  clearInterval(stripTimer);
  stripTimer = null;

  if (reduceMotion || stripHovered || document.hidden) {
    return;
  }

  stripTimer = setInterval(function () {
    showStripNotice(stripIndex + 1);
  }, STRIP_TIME);
}

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

  // Every change (by timer or by click) gives a fresh 5 seconds
  startStripTimer();
}

function setupNoticeStrip() {
  showStripNotice(0);

  $("#stripPrev").addEventListener("click", function () {
    showStripNotice(stripIndex - 1);
  });

  $("#stripNext").addEventListener("click", function () {
    showStripNotice(stripIndex + 1);
  });

  // Pause while the mouse is over the strip, so you can read and click.
  // (Only for a real mouse. On a phone a tap should not freeze it.)
  var strip = $(".notice-strip");

  strip.addEventListener("pointerenter", function (event) {
    if (event.pointerType === "mouse") {
      stripHovered = true;
      startStripTimer();
    }
  });

  strip.addEventListener("pointerleave", function (event) {
    if (event.pointerType === "mouse") {
      stripHovered = false;
      startStripTimer();
    }
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
var SLIDE_TIME = 5000;            // photo changes every 5 seconds
var slides = [];
var dots = [];
var currentSlide = 0;
var slideTimer = null;
var userPausedSlider = false;     // true after the visitor presses the pause button
var sliderHovered = false;        // true while a mouse is over the slider

function isLightboxOpen() {
  return $("#lightbox").classList.contains("is-open");
}

// Decide if the slider should be running, and (re)start or stop the timer.
// We call this whenever something changes: new photo, hover, pause button,
// tab hidden, big photo viewer opened or closed.
function updateAutoplay() {
  var slider = $("#heroSlider");

  clearInterval(slideTimer);
  slideTimer = null;

  var shouldRun = !reduceMotion && !userPausedSlider && !sliderHovered &&
                  !document.hidden && !isLightboxOpen();

  slider.classList.toggle("is-paused", !shouldRun);

  if (shouldRun) {
    slideTimer = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, SLIDE_TIME);
  }
}

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

  // Every photo change (by timer, arrows, dots or swipe) gives a fresh 5 seconds
  updateAutoplay();
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

  // Pause / play button
  $("#sliderPlay").addEventListener("click", function () {
    userPausedSlider = !userPausedSlider;

    $("i", this).className = userPausedSlider ? "fa-solid fa-play" : "fa-solid fa-pause";
    this.setAttribute("aria-label", userPausedSlider ? "স্লাইড চালু করুন" : "স্লাইড থামান");

    updateAutoplay();
  });

  // Pause while a mouse is over the slider (not for touch screens)
  slider.addEventListener("pointerenter", function (event) {
    if (event.pointerType === "mouse") {
      sliderHovered = true;
      updateAutoplay();
    }
  });

  slider.addEventListener("pointerleave", function (event) {
    if (event.pointerType === "mouse") {
      sliderHovered = false;
      updateAutoplay();
    }
  });

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
  updateAutoplay(); // pause the slider behind the big photo
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
  updateAutoplay(); // slider can run again
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

/* ---- 9.0 The auto-scrolling notice board ----
   createAutoScroller(box) makes a scrolling box move down by
   itself, slowly. When it reaches the bottom it waits a moment
   and glides back to the top.

   It stops while:
   - a mouse is over the box (so you can read and click)
   - you scroll or touch it (it waits a few seconds)
   - the box is not on the screen, or the browser tab is hidden
   - the visitor asked for less motion

   It also highlights the notice in the middle of the box
   (the "is-focus" class), so the highlight travels along. */
var AUTO_SCROLL_SPEED = 26; // pixels per second

var levelScroller = null;
var allScroller = null;

function createAutoScroller(box) {
  var position = 0;        // our own exact position (can have decimals)
  var lastTime = null;
  var pausedUntil = 0;     // time (ms) until which we wait
  var hovering = false;
  var onScreen = true;
  var needReset = false;

  // Highlight the notice that is in the middle band of the box
  var focusObserver = null;
  if ("IntersectionObserver" in window) {
    focusObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-focus", entry.isIntersecting);
      });
    }, { root: box, rootMargin: "-46% 0px -46% 0px", threshold: 0 });

    // Know if the box is visible on the screen
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
    }).observe(box);
  }

  // Wait for a while (used when the visitor does something)
  function pause(milliseconds) {
    pausedUntil = performance.now() + milliseconds;
  }

  // Call this after the list inside the box is drawn again
  function watch(list, resetScroll) {
    if (resetScroll) {
      box.scrollTop = 0;
      position = 0;
      needReset = false;
    }
    if (focusObserver) {
      focusObserver.disconnect();
      $$(".notice-item", list).forEach(function (item) {
        item.classList.remove("is-focus");
        focusObserver.observe(item);
      });
    }
  }

  // This runs on every frame (about 60 times a second)
  function step(time) {
    requestAnimationFrame(step);

    if (lastTime === null) {
      lastTime = time;
      return;
    }
    var seconds = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    var maxScroll = box.scrollHeight - box.clientHeight;
    var mustWait = reduceMotion || hovering || !onScreen || document.hidden ||
                   time < pausedUntil || maxScroll <= 2;

    if (mustWait) {
      position = box.scrollTop; // stay in sync with where the box really is
      return;
    }

    // Someone else moved the box (keyboard, scrollbar, a link):
    // follow them and wait a few seconds before moving again.
    if (Math.abs(box.scrollTop - position) > 3) {
      position = box.scrollTop;
      pausedUntil = time + 4000;
      return;
    }

    // Reached the bottom before: glide back to the top
    if (needReset) {
      needReset = false;
      box.scrollTo({ top: 0, behavior: "smooth" });
      pausedUntil = time + 1400;
      return;
    }

    position = position + AUTO_SCROLL_SPEED * seconds;

    if (position >= maxScroll) {
      position = maxScroll;
      needReset = true;
      pausedUntil = time + 1800; // rest at the bottom for a moment
    }
    box.scrollTop = position;
  }

  // Mouse over the box = stop. Mouse leaves = go on.
  box.addEventListener("pointerenter", function (event) {
    if (event.pointerType === "mouse") {
      hovering = true;
    }
  });
  box.addEventListener("pointerleave", function (event) {
    if (event.pointerType === "mouse") {
      hovering = false;
    }
  });

  // Wheel, finger or click: wait a few seconds before moving again
  box.addEventListener("wheel", function () { pause(4000); }, { passive: true });
  box.addEventListener("touchstart", function () { pause(5000); }, { passive: true });
  box.addEventListener("pointerdown", function () { pause(5000); });

  requestAnimationFrame(step);

  return { pause: pause, watch: watch };
}

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

// A notice from the last 30 days gets a "নতুন" (new) badge
function isRecentNotice(notice) {
  var noticeDate = new Date(notice.year, notice.month - 1, notice.day);
  var days = (new Date() - noticeDate) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 30;
}

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

    var newBadge = isRecentNotice(notice) ? '<span class="new-badge">নতুন</span>' : "";

    list.appendChild(createNoticeRow(notice, badge, newBadge, index * 60));
  });

  levelScroller.watch(list, true);
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

  allScroller.watch(list, !appendOnly);

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
      allScroller.pause(6000);
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
    allScroller.pause(6000); // do not scroll away while the visitor types
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
  // Make both lists scroll by themselves
  levelScroller = createAutoScroller($("#levelScroll"));
  allScroller = createAutoScroller($("#allScroll"));

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
   The week starts on Sunday.
   Friday and Saturday are weekly holidays (shown in red).
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

  // getDay(): Sunday = 0 ... Friday = 5, Saturday = 6
  var weekday = new Date(year, month - 1, day).getDay();
  var isHoliday = weekday === 5 || weekday === 6;

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

  if (isHoliday) {
    var note = document.createElement("span");
    note.className = "holiday-note";
    note.textContent = BN_WEEKDAYS[weekday] + " সাপ্তাহিক ছুটির দিন।";
    box.appendChild(note);
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
  // Our week also starts on Sunday, so no shifting is needed.
  var emptyCells = new Date(calYear, calMonth, 1).getDay();
  var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  // Empty boxes before the 1st
  for (var i = 0; i < emptyCells; i++) {
    grid.appendChild(document.createElement("span"));
  }

  // One button for each day
  for (var day = 1; day <= daysInMonth; day++) {
    (function (dayNumber) {
      var key = makeDateKey(calYear, calMonth + 1, dayNumber);
      var column = (emptyCells + dayNumber - 1) % 7; // 0 = Sunday ... 5 = Friday, 6 = Saturday

      var button = document.createElement("button");
      button.type = "button";
      button.className = "cal-day";
      button.textContent = toBangla(dayNumber);

      if (column === 5 || column === 6) {
        button.classList.add("is-holiday");
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
      if (column === 5 || column === 6) {
        label = label + ", সাপ্তাহিক ছুটি";
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
   14. EXTRA FEATURES
   ========================================================== */

/* ---- Stats band: numbers count up once when they appear ---- */
function countUp(element) {
  var target = Number(element.getAttribute("data-target"));

  if (reduceMotion) {
    element.textContent = toBangla(target);
    return;
  }

  var duration = 1400; // milliseconds
  var startTime = null;

  function frame(time) {
    if (startTime === null) {
      startTime = time;
    }
    var progress = Math.min((time - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3); // fast at first, slow at the end

    element.textContent = toBangla(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

function setupStats() {
  // These two numbers are worked out, not typed
  $("#statYears").setAttribute("data-target", String(new Date().getFullYear() - 1990));
  $("#statNotices").setAttribute("data-target", String(allNotices.length));

  var numbers = $$(".stat-number");

  if (!("IntersectionObserver" in window)) {
    numbers.forEach(function (number) {
      number.textContent = toBangla(number.getAttribute("data-target"));
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target); // only once
      }
    });
  }, { threshold: 0.6 });

  numbers.forEach(function (number) {
    observer.observe(number);
  });
}

/* ---- Text size buttons (অ- and অ+) ----
   The page uses rem units, so changing the root size
   makes all the text bigger or smaller. */
var FONT_SIZES = [90, 100, 112, 125]; // percent
var fontIndex = 1;                     // 100% is the normal size

function applyFontSize(showMessage) {
  document.documentElement.style.fontSize = FONT_SIZES[fontIndex] + "%";

  $("#fontDown").disabled = fontIndex === 0;
  $("#fontUp").disabled = fontIndex === FONT_SIZES.length - 1;

  try {
    localStorage.setItem("dskm-font-index", String(fontIndex));
  } catch (error) {
    // Saving can fail in private mode. That is fine.
  }

  if (showMessage) {
    showToast("লেখার আকার: " + toBangla(FONT_SIZES[fontIndex]) + "%", "fa-solid fa-text-height");
  }
}

function setupFontSize() {
  try {
    var saved = parseInt(localStorage.getItem("dskm-font-index"), 10);
    if (saved >= 0 && saved < FONT_SIZES.length) {
      fontIndex = saved;
    }
  } catch (error) {
    // ignore
  }
  applyFontSize(false);

  $("#fontDown").addEventListener("click", function () {
    if (fontIndex > 0) {
      fontIndex = fontIndex - 1;
      applyFontSize(true);
    }
  });

  $("#fontUp").addEventListener("click", function () {
    if (fontIndex < FONT_SIZES.length - 1) {
      fontIndex = fontIndex + 1;
      applyFontSize(true);
    }
  });
}

/* ---- Search box for the form downloads ---- */
function setupFormSearch() {
  var input = $("#formSearch");
  var items = $$(".file-list li");

  input.addEventListener("input", function () {
    var query = input.value.trim();
    var shown = 0;

    items.forEach(function (item) {
      var matches = query === "" || item.textContent.indexOf(query) !== -1;
      item.hidden = !matches;
      if (matches) {
        shown = shown + 1;
      }
    });

    $("#formEmpty").hidden = shown !== 0;
  });
}

/* ---- Keyboard shortcut: press "/" to search the notices ---- */
function setupSearchShortcut() {
  document.addEventListener("keydown", function (event) {
    var tag = event.target.tagName;
    var isTyping = tag === "INPUT" || tag === "TEXTAREA" || event.target.isContentEditable;

    if (event.key === "/" && !isTyping && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      switchNoticeView("all");
      $("#notices").scrollIntoView({ behavior: "smooth" });
      $("#noticeSearch").focus({ preventScroll: true });
    }
  });
}


/* ==========================================================
   15. START EVERYTHING
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

// When you switch to another browser tab, pause the autoplay.
// When you come back, it starts again.
function setupVisibilityPause() {
  document.addEventListener("visibilitychange", function () {
    updateAutoplay();
    startStripTimer();
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
  setupVisibilityPause();
  setupStats();
  setupFontSize();
  setupFormSearch();
  setupSearchShortcut();
}

document.addEventListener("DOMContentLoaded", init);
