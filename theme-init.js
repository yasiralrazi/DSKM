/* ==========================================================
   theme-init.js
   This tiny file runs BEFORE the page is drawn (it is loaded
   in the <head>). Its only job is to set the saved theme
   (light or dark) so the page never flashes the wrong colour.
   ========================================================== */

// Tell CSS that JavaScript is available.
// (The scroll-reveal animation only hides things when this is set.)
document.documentElement.classList.add("js");

// Find the theme: saved choice first, otherwise the device setting.
var savedTheme = null;
try {
  savedTheme = localStorage.getItem("dskm-theme");
} catch (error) {
  // Storage can be blocked in private mode. That is fine.
}

if (savedTheme !== "light" && savedTheme !== "dark") {
  var deviceIsDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  savedTheme = deviceIsDark ? "dark" : "light";
}

document.documentElement.setAttribute("data-theme", savedTheme);
