/* ==========================================================
   data.js
   All the content that changes often lives here, so you can
   edit notices without touching the main code (script.js).
   ========================================================== */


/* ----------------------------------------------------------
   1) Level names (used by the notice board tabs and calendar)
   ---------------------------------------------------------- */
var levelNames = {
  dakhil: "দাখিল",
  alim: "আলিম",
  fazil: "ফাযিল",
  kamil: "কামিল",
  fazilhonours: "ফাজিল অনার্স",
  kamilmasters: "কামিল মাস্টার্স"
};


/* ----------------------------------------------------------
   2) Notices shown in the "level" tabs
   day / month (1-12) / year, title, url (null = no file yet)
   Newest notice first.
   ---------------------------------------------------------- */
var levelNotices = {
  dakhil: [
    { day: 1, month: 11, year: 2026, title: "দাখিল পরীক্ষা ২০২৭ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1793513621.pdf" },
    { day: 30, month: 12, year: 2025, title: "দাখিল পরীক্ষা ২০২৬ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1767083373.pdf" },
    { day: 25, month: 12, year: 2025, title: "আতফাল থেকে সানি পুন:ভর্তি পরীক্ষার বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1766649779.pdf" },
    { day: 14, month: 12, year: 2025, title: "রাবে(৪র্থ) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1765719603.pdf" },
    { day: 14, month: 12, year: 2025, title: "সালিছ(৩য়) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1765719545.pdf" }
  ],
  alim: [
    { day: 17, month: 9, year: 2026, title: "২০২৬-২০২৭ শিক্ষাবর্ষে আলিম শ্রেণিতে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1789626418.pdf" },
    { day: 30, month: 8, year: 2026, title: "২০২৬-২০২৭ শিক্ষাবর্ষে আলিম জামাতের ভর্তিচ্ছু শিক্ষার্থী ও অভিভাকদের জন্য জরুরী নির্দেশনা", url: "https://dskm.ac.bd/assets/fileupload/1788065535.jpg" },
    { day: 26, month: 2, year: 2025, title: "আলিম পরীক্ষা ২০২৫ এর ফলম ফিলাপের বিজ্ঞপ্তি।", url: null },
    { day: 24, month: 7, year: 2024, title: "** জরুরী** আলিম ১ম বর্ষে শিক্ষার্থী ভর্তির সময় ০৫-০৮-২৪ পর্যন্ত বৃদ্ধি প্রসঙ্গে(সংশোধিত)", url: "https://dskm.ac.bd/assets/fileupload/1722505724.png" },
    { day: 20, month: 5, year: 2024, title: "আলিম ২০২৪-২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1716174311.pdf" }
  ],
  fazil: [
    { day: 1, month: 11, year: 2026, title: "ফাযিল (পাস) ২০২৬-২০২৭ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1793513572.pdf" },
    { day: 13, month: 6, year: 2026, title: "ফাযিল (পাস) পরীক্ষা ২০২৫ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1781326796.pdf" },
    { day: 18, month: 5, year: 2026, title: "ফাযিল অনার্স পরীক্ষা ২০২৫ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1779073489.pdf" },
    { day: 13, month: 4, year: 2026, title: "ফাযিল (অনার্স) ২০২৫-২০২৬ শিক্ষাবর্ষের ১ম বর্ষে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1776053826.pdf" },
    { day: 30, month: 1, year: 2026, title: "ফাযিল (পাস) ২য় ও ৩য় বর্ষের সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1769783091.pdf" }
  ],
  kamil: [
    { day: 30, month: 9, year: 2026, title: "কামিল ১ম (২০২৪-২০২৫ শিক্ষাবর্ষ) ও ২য় (২০২৩-২০২৪ শিক্ষাবর্ষ) পর্বে সকল বিভাগের ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1790742619.pdf" },
    { day: 2, month: 2, year: 2026, title: "কামিল (মাস্টার্স)পরীক্ষা ২০২৪ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1770009306.pdf" },
    { day: 30, month: 1, year: 2026, title: "কামিল ২০২৪-২০২৫ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1769783154.pdf" },
    { day: 1, month: 1, year: 1970, title: "কামিল ২০২৩-২০২৪ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1748078466.pdf" },
    { day: 1, month: 1, year: 1970, title: "কামিল (মাস্টার্স) ২০২২-২০২৩ শিক্ষাবর্ষ, পরীক্ষা ২০২৩ এর ফরম ফিলাপের বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1748078259.pdf" }
  ],
  fazilhonours: [
  ],
  kamilmasters: [
  ]
};


/* ----------------------------------------------------------
   3) Every notice (used by the "All notices" search view and
   the top notice strip). Newest notice first.
   url: null means the file was not uploaded yet.
   ---------------------------------------------------------- */
var allNotices = [
  { title: "ফাযিল (পাস) ২০২৬-২০২৭ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1793513572.pdf" },
  { title: "দাখিল পরীক্ষা ২০২৭ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1793513621.pdf" },
  { title: "কামিল ১ম (২০২৪-২০২৫ শিক্ষাবর্ষ) ও ২য় (২০২৩-২০২৪ শিক্ষাবর্ষ) পর্বে সকল বিভাগের ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1790742619.pdf" },
  { title: "২০২৬-২০২৭ শিক্ষাবর্ষে আলিম শ্রেণিতে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1789626418.pdf" },
  { title: "২০২৬-২০২৭ শিক্ষাবর্ষে আলিম জামাতের ভর্তিচ্ছু শিক্ষার্থী ও অভিভাকদের জন্য জরুরী নির্দেশনা", url: "https://dskm.ac.bd/assets/fileupload/1788065535.jpg" },
  { title: "ফাযিল (পাস) পরীক্ষা ২০২৫ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1781326796.pdf" },
  { title: "ফাযিল অনার্স পরীক্ষা ২০২৫ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1779073489.pdf" },
  { title: "ফাযিল (অনার্স) ২০২৫-২০২৬ শিক্ষাবর্ষের ১ম বর্ষে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1776053826.pdf" },
  { title: "কামিল (মাস্টার্স)পরীক্ষা ২০২৪ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1770009306.pdf" },
  { title: "কামিল ২০২৪-২০২৫ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1769783154.pdf" },
  { title: "ফাযিল (পাস) ২য় ও ৩য় বর্ষের সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1769783091.pdf" },
  { title: "ফাজিল অনার্স ভর্তি বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1767439060.pdf" },
  { title: "দাখিল পরীক্ষা ২০২৬ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1767083373.pdf" },
  { title: "আতফাল থেকে সানি পুন:ভর্তি পরীক্ষার বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1766649779.pdf" },
  { title: "রাবে(৪র্থ) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1765719603.pdf" },
  { title: "সালিছ(৩য়) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1765719545.pdf" },
  { title: "সানি(২য়) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1765719524.pdf" },
  { title: "আউয়াল (১ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1765719501.pdf" },
  { title: "আতফাল (শিশু) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1765719477.pdf" },
  { title: "সামেন (৮ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - (অনাবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765631908.pdf" },
  { title: "সামেন (৮ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - (আবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765628407.pdf" },
  { title: "সাবে (৭ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - (আবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765626160.pdf" },
  { title: "সাবে (৭ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - (অনাবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765626122.pdf" },
  { title: "সাদেস (৬ষ্ঠ) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - (অনাবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765625705.pdf" },
  { title: "সাদেস (৬ষ্ঠ) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - (আবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765625686.pdf" },
  { title: "তাসে (৯ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - ব্যবসায় শিক্ষা (আবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765615485.pdf" },
  { title: "তাসে (৯ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - ব্যবসায় শিক্ষা (অনাবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765615462.pdf" },
  { title: "তাসে (৯ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - বিজ্ঞান (অনাবাসিক-অপেক্ষমান)", url: "https://dskm.ac.bd/assets/fileupload/1765615392.pdf" },
  { title: "তাসে (৯ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - বিজ্ঞান (অনাবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765615192.pdf" },
  { title: "তাসে (৯ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - বিজ্ঞান (আবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765614779.pdf" },
  { title: "তাসে (৯ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - সাধারন (আবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765614580.pdf" },
  { title: "তাসে (৯ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ - সাধারন (অনাবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765614552.pdf" },
  { title: "খামেস (৫ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ (অনাবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765613736.pdf" },
  { title: "খামেস (৫ম) জামাত ভর্তি পরীক্ষার ফলাফল-২০২৬ (আবাসিক)", url: "https://dskm.ac.bd/assets/fileupload/1765613714.pdf" },
  { title: "ভর্তি নির্দেশিকা ২০২৬", url: "https://dskm.ac.bd/assets/fileupload/1762403649.pdf" },
  { title: "ফাযিল (পাস) ১ম, ২য় ও ৩য় বর্ষ  পরীক্ষা ২০২৪ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1755323061.pdf" },
  { title: "ফাযিল (অনার্স) ২০২৪-২০২৫ শিক্ষাবর্ষের ১ম বর্ষে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1753088262.pdf" },
  { title: "হাফেজ নিয়োগ বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1748868129.png" },
  { title: "কামিল ২০২৩-২০২৪ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1748078466.pdf" },
  { title: "ফাযিল (পাস) ২য় ও ৩য় বর্ষের সেশন ফি পরিশোধের বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1748078393.pdf" },
  { title: "কামিল (মাস্টার্স) ২০২২-২০২৩ শিক্ষাবর্ষ, পরীক্ষা ২০২৩ এর ফরম ফিলাপের বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1748078259.pdf" },
  { title: "ফাযিল (পাস) ২০২৩-২০২৪ শিক্ষাবর্ষের নির্বাচনী পরীক্ষা ২০২৫ এর সময়সূচী|", url: "https://dskm.ac.bd/assets/fileupload/1744270977.pdf" },
  { title: "২০২৪-২০২৫ শিক্ষাবর্ষের ফাযিল ১ম বর্ষের শ্রেণি কার্যক্রম শুরু হচ্ছে।", url: "https://dskm.ac.bd/assets/fileupload/1744171049.pdf" },
  { title: "আলিম পরীক্ষা ২০২৫ এর ফলম ফিলাপের বিজ্ঞপ্তি।", url: null },
  { title: "কামিল পরীক্ষা ২০২৩ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: null },
  { title: "ফাযিল অনার্স ১ম, ২য়, ৩য় ও ৪র্থ বর্ষের ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1737264632.pdf" },
  { title: "কামিল (মাস্টার্স) ২০২২-২০২৩ শিক্ষাবর্ষের ভর্তির বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1736139372.pdf" },
  { title: "ফাযিল অনার্স ২য়, ৩য় ও ৪র্থ বর্ষের সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1736139331.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: তাসে (৯ম বিজ্ঞান) অপেক্ষমান", url: "https://dskm.ac.bd/assets/fileupload/1735464939.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: তাসে (৯ম বিজ্ঞান) মেধাতালিকা", url: "https://dskm.ac.bd/assets/fileupload/1735464961.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: তাসে (৯ম সাধারন) অপেক্ষমান", url: "https://dskm.ac.bd/assets/fileupload/1735462778.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: তাসে (৯ম সাধারন) মেধাতালিকা", url: "https://dskm.ac.bd/assets/fileupload/1735462737.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: সামেন (৮ম শ্রেণি)-অপেক্ষমান", url: "https://dskm.ac.bd/assets/fileupload/1735462187.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: সামেন (৮ম শ্রেণি) মেধাতালিকা", url: "https://dskm.ac.bd/assets/fileupload/1735462155.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: সাবে (৭ম শ্রেণি) মেধাতালিকা", url: "https://dskm.ac.bd/assets/fileupload/1735462108.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: সাদেস (৬ষ্ঠ শ্রেণি)-অপেক্ষমান", url: "https://dskm.ac.bd/assets/fileupload/1735462047.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: সাদেস (৬ষ্ঠ শ্রেণি) মেধাতালিকা", url: "https://dskm.ac.bd/assets/fileupload/1735461946.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: রাবে (চতুর্থ শ্রেণি)", url: null },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: সালিস (তৃতীয় শ্রেণি)", url: "https://dskm.ac.bd/assets/fileupload/1735459429.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: সানি (দ্বিতীয় শ্রেণি)", url: "https://dskm.ac.bd/assets/fileupload/1735459404.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: আউয়াল (প্রথম শ্রেণি)", url: "https://dskm.ac.bd/assets/fileupload/1735459363.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল ২০২৫: আতফাল (শিশু শ্রেণি)", url: "https://dskm.ac.bd/assets/fileupload/1735459337.pdf" },
  { title: "আল-কুরআন এন্ড ইসলামিক স্টাডিজ বিভাগ ও আল-হাদিস এন্ড ইসলামিক বিভাগ ৪র্থ বর্ষ ২০১৯-২০২০ নির্বাচিত থিসিস শিরোনাম ২০২৫", url: "https://dskm.ac.bd/assets/fileupload/1732518533.pdf" },
  { title: "এসাইনমেন্ট শিরোনম পরীক্ষা ২০২৪ আরবি ভাষা ও সাহিত্য, ১ম বর্ষ ২০২২-২০২৩", url: "https://dskm.ac.bd/assets/fileupload/1732518204.pdf" },
  { title: "এসাইনমেন্ট শিরোনাম পরীক্ষা- ২০২৪ ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ, ১ম বর্ষ ২০২২-২০২৩", url: "https://dskm.ac.bd/assets/fileupload/1732518139.pdf" },
  { title: "এসাইনমেন্ট শিরোনাম পরীক্ষা- ২০২৪ দাওয়াহ এন্ড ইসলামিক স্টাডিজ, ১ম বর্ষ ২০২২-২০২৩", url: "https://dskm.ac.bd/assets/fileupload/1732517975.pdf" },
  { title: "ফাযিল অনার্স এর ইনকোর্স পরীক্ষার এসাইনমেন্ট আল-হাদীস এন্ড ইসলামিক স্টাডিজ", url: "https://dskm.ac.bd/assets/fileupload/1732517821.pdf" },
  { title: "ফাযিল অনার্স এর ইনকোর্স পরীক্ষার এসাইনমেন্ট আল কুরআন এন্ড ইসলামিক স্টাডিজ", url: "https://dskm.ac.bd/assets/fileupload/1732517711.pdf" },
  { title: "দাখিল পরীক্ষা ২০২৫ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: null },
  { title: "২০২৫ সালের খামেস থেকে আশের পর্যন্ত সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: null },
  { title: "২০২৫ সালের আউয়াল থেকে রাবে পর্যন্ত সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: null },
  { title: "২০২৫ সালের ভর্তি বিজ্ঞপ্তি।", url: null },
  { title: "মুহিউসসুন্নাহ বৃত্তি পরীক্ষার -২০২৪ এর আসনবিন্যাস (ছাত্র)", url: "https://dskm.ac.bd/assets/fileupload/1731084757.pdf" },
  { title: "ফাযিল (পাস) ২০২৪-২০২৫ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1730536430.pdf" },
  { title: "অনার্স ২য়, ৩য় ও ৪র্থ বর্ষের শ্রেনি কার্যক্রমের বিশেষ নোটিশ", url: "https://dskm.ac.bd/assets/fileupload/1723648475.png" },
  { title: "** জরুরী** আলিম ১ম বর্ষে শিক্ষার্থী ভর্তির সময় ০৫-০৮-২৪ পর্যন্ত বৃদ্ধি প্রসঙ্গে(সংশোধিত)", url: "https://dskm.ac.bd/assets/fileupload/1722505724.png" },
  { title: "ফাযিল (অনার্স) ২০২৩-২০২৪ শিক্ষাবর্ষের ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1716174449.pdf" },
  { title: "আলিম ২০২৪-২০২৫ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1716174311.pdf" },
  { title: "কামিল (মাস্টার্স) ২০২১-২০২২ শিক্ষাবর্ষ, পরীক্ষা ২০২২ এর ফরম ফিলাপের বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1715782941.pdf" },
  { title: "কামিল পরীক্ষা ২০২২ এর মৌখিক পরীক্ষার বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1715504067.pdf" },
  { title: "এসাইনমেন্ট কামিল পরীক্ষা 2022", url: "https://dskm.ac.bd/assets/fileupload/1713879200.pdf" },
  { title: "আলিম পরীক্ষ-২০২৪ এর ফরম ফিলাপের বিজ্ঞপ্তি(সংশোধিত)", url: "https://dskm.ac.bd/assets/fileupload/1713708648.pdf" },
  { title: "আলিম ২০২২-২০২৩ শিক্ষাবর্ষের ২য় বর্ষের ফরম ফিলাপের বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1711256713.pdf" },
  { title: "লিল্লাহ ফান্ডে সাহায্যের আবেদন", url: "https://dskm.ac.bd/assets/fileupload/1710500669.jpg" },
  { title: "কামিল ১ম ও ২য় পর্বের নির্বাচনী পরীক্ষার বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1708754019.pdf" },
  { title: "কামিল ২০২০-২০২১ ও ২০২১-২০২২ শিক্ষাবর্ষের পরীক্ষা ২০২২ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1708753887.pdf" },
  { title: "মাদরাসার ই-মেইল আইডি পরিবর্তন সংক্রান্ত", url: "https://dskm.ac.bd/assets/fileupload/1708327250.jpg" },
  { title: "ফাযিল অনার্স ১ম, ২য়, ৩য় ও ৪র্থ বর্ষের ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1706166660.pdf" },
  { title: "২০২০-২০২১ শিক্ষাবর্ষে কামিল ২য় পর্বের সকল বিভাগের সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1706166570.pdf" },
  { title: "হিসাব সহকারীর জন্য জনবল নিয়োগ বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1706110629.pdf" },
  { title: "ফাযিল অনার্স আল-কুরআন এন্ড ইসলামিক স্টাডিজ বিভাগ ৪র্থ বর্ষ  এর নির্বাচনী পরীক্ষা-2023 এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702551971.pdf" },
  { title: "ফাযিল অনার্স আল-হাদিস এন্ড ইসলামিক স্টাডিজ বিভাগ ৪র্থ বর্ষ  এর নির্বাচনী পরীক্ষা-2023 এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702551955.pdf" },
  { title: "ফাযিল অনার্স আল-কুরআন এন্ড ইসলামিক স্টাডিজ বিভাগ ৩য় বর্ষ  এর নির্বাচনী পরীক্ষা-2023 এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702551928.pdf" },
  { title: "ফাযিল অনার্স আল-হাদিস এন্ড ইসলামিক স্টাডিজ বিভাগ ৩য় বর্ষ  এর নির্বাচনী পরীক্ষা-2023 এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702551911.pdf" },
  { title: "ফাযিল অনার্স আল-কুরআন এন্ড ইসলামিক স্টাডিজ বিভাগ ২য় বর্ষ  এর নির্বাচনী পরীক্ষা-2023 এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702551865.pdf" },
  { title: "ফাযিল অনার্স আল-হাদিস এন্ড ইসলামিক স্টাডিজ বিভাগ ২য় বর্ষ  এর নির্বাচনী পরীক্ষা-2023 এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702551844.pdf" },
  { title: "ফাযিল অনার্স (আল হাদিস) ৪র্থ বর্ষের নির্বাচনী পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702545295.pdf" },
  { title: "ফাযিল অনার্স (আল হাদিস) ৩য় বর্ষের নির্বাচনী পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702545283.pdf" },
  { title: "ফাযিল অনার্স (আল হাদিস) ২য় বর্ষের নির্বাচনী পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702545271.pdf" },
  { title: "ফাযিল অনার্স (আল কুরআন) ৪র্থ বর্ষের নির্বাচনী পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702545249.pdf" },
  { title: "ফাযিল অনার্স (আল কুরআন) ৩য় বর্ষের নির্বাচনী পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702545235.pdf" },
  { title: "ফাযিল অনার্স (আল কুরআন) ২য় বর্ষের নির্বাচনী পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1702545220.pdf" },
  { title: "মুহিউসসুন্নাহ বৃত্তি পরীক্ষার ফলাফল -২০২৩", url: "https://dskm.ac.bd/assets/fileupload/1702526229.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল-২০২৪ খামেস (৫ম ) জামাত", url: "https://dskm.ac.bd/assets/fileupload/1702379939.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল-২০২৪ তাসে (৯ম ) জামাত", url: "https://dskm.ac.bd/assets/fileupload/1702370329.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল-২০২৪ সামেন (৮ম ) জামাত", url: "https://dskm.ac.bd/assets/fileupload/1702374059.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল-২০২৪ খামেস (৫ম) জামায়াত", url: "https://dskm.ac.bd/assets/fileupload/1702365959.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল-২০২৪ সাদেস (৬ষ্ঠ) জামায়াত", url: "https://dskm.ac.bd/assets/fileupload/1702364133.pdf" },
  { title: "ভর্তি পরীক্ষার ফলাফল-২০২৪ সাবে (৭ম ) জামাত", url: "https://dskm.ac.bd/assets/fileupload/1702362624.pdf" },
  { title: "সীমিত সংখ্যক আসনে আতফাল(শিশু) জামাত থেকে রাবে(৪র্থ) জামাতে পূনঃ ভর্তি বিজ্ঞপ্তি-২০২৪", url: "https://dskm.ac.bd/assets/fileupload/1702302494.pdf" },
  { title: "সাবে (বা) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701667167.pdf" },
  { title: "সাবে (আলিফ) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701667154.pdf" },
  { title: "সাদেস (বা) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701661324.pdf" },
  { title: "সাদেস (আলিফ) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701661307.pdf" },
  { title: "খামেস (আলিফ) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701661227.pdf" },
  { title: "সামেন (আলিফ) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701661091.pdf" },
  { title: "সামেন (বা) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701661067.pdf" },
  { title: "সামেন (দাল) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701661032.pdf" },
  { title: "তাসে বিজ্ঞান (বা) বার্ষিক পরীক্ষা ২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701597634.pdf" },
  { title: "সামেন (জীম) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701590674.pdf" },
  { title: "তাসে বিজ্ঞান (আলিফ) বার্ষিক পরীক্ষা ২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701589565.pdf" },
  { title: "তাসে বিজ্ঞান (জীম) বার্ষিক পরীক্ষা ২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701589234.pdf" },
  { title: "খামেস (বা) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701585120.pdf" },
  { title: "তাসে সাধারণ (জীম) বার্ষিক পরীক্ষা ২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701583767.pdf" },
  { title: "তাসে সাধারণ (বা) বার্ষিক পরীক্ষা ২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701582757.pdf" },
  { title: "সাদেস (বা) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701582660.pdf" },
  { title: "খামেস (আলিফ) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701580377.pdf" },
  { title: "সাদেস (আলিফ) বার্ষিক পরীক্ষা-২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701580352.pdf" },
  { title: "তাসে সাধারণ আলিফ বার্ষিক পরীক্ষা ২০২৩ এর ফলাফল", url: "https://dskm.ac.bd/assets/fileupload/1701578168.pdf" },
  { title: "২০২৩-২০২৪ শিক্ষাবর্ষে ফাযিল (পাস) ১ম বর্ষের ভর্তি বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1701181390.pdf" },
  { title: "কামিল (মাস্টার্স) ২০২১-২০২২ শিক্ষাবর্ষের ভর্তির বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1701181195.pdf" },
  { title: "ফাযিল অনার্স ২য়, ৩য় ও ৪র্থ বর্ষের সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1701180889.pdf" },
  { title: "২০২০৪ শিক্ষাবর্ষের সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1701154392.pdf" },
  { title: "কামিল স্নাতক(সম্মান) আল-কুরআন এন্ড ইসলামিক ষ্টাডিজ এবং আল হাদিস এন্ড ইসলামিক ষ্টাডিজ বিভাগ এর ২য়, ৩য় এবং ৪র্থ বর্ষের নির্বাচনী পরীক্ষা-২০২৩ এর নোটিশ", url: "https://dskm.ac.bd/assets/fileupload/1701151656.jpg" },
  { title: "এসাইনমেন্ট শিরোনাম (আরবি)", url: "https://dskm.ac.bd/assets/fileupload/1701151400.pdf" },
  { title: "এসাইনমেন্ট শিরোনাম (অনার্স-দাওয়াহ এন্ড ইসলামিক স্টাডিজ)", url: "https://dskm.ac.bd/assets/fileupload/1701151352.pdf" },
  { title: "এসাইনমেন্ট শিরোনাম (অনার্স- ইসলামের ইতিহাস এন্ড ইসলামিক স্টাডিজ)", url: "https://dskm.ac.bd/assets/fileupload/1701151334.pdf" },
  { title: "এসাইনমেন্ট শিরোনাম (অনার্স-আল হাদিস এন্ড ইসলামিক স্টাডিজ)", url: "https://dskm.ac.bd/assets/fileupload/1701151308.pdf" },
  { title: "এসাইনমেন্ট শিরোনাম (অনার্স-আলকুরআন এন্ড ইসলামিক স্টাডিজ)", url: "https://dskm.ac.bd/assets/fileupload/1701151272.pdf" },
  { title: "২০২৩ সালে ষষ্ঠ শ্রেণির রেজিস্ট্রেশনের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1699420686.pdf" },
  { title: "২০২৪ সালের ভর্তি নির্দেশিকা", url: "https://dskm.ac.bd/assets/fileupload/1698835103.pdf" },
  { title: "দাখিল পরীক্ষা ২০২৪ এর ফরম ফিলাপের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1698307473.pdf" },
  { title: "আতফাল থেকে তাসে পর্যন্ত বার্ষিক পরীক্ষা ২০২৩ এর ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1698224234.pdf" },
  { title: "২০২১-২০২২ শিক্ষাবর্ষ কামিল (হাদিস, তাফসির, ফিকহ ও আদব) বিভাগের ১ম পর্বে ভর্তি বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1698126195.pdf" },
  { title: "২০২০-২০২১ ও ২০১৯-২০২০ শিক্ষাবর্ষ ফাযিল (পাস) ২য় ও ৩য় বর্ষের সেশন ফি পরিশোধের বিজ্ঞপ্তি।", url: "https://dskm.ac.bd/assets/fileupload/1698125815.pdf" },
  { title: "কামিল পরীক্ষা ২০২১ এর ১ম ও ২য় পর্বের সকল ডিপার্টমেন্টের ভাইভা আগামী ২৬/১০/২০২৩ তারিখে গ্রহণ করা হবে।", url: "https://dskm.ac.bd/assets/fileupload/1698124601.pdf" },
  { title: "আলিম ২০২২-২০২৩ শিক্ষাবর্ষের ২য় বর্ষের ফরম ফিলাপের বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1696749335.pdf" },
  { title: "জরুরী বিজ্ঞপ্তি", url: null },
  { title: "নিয়োগ বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1695279601.jpg" },
  { title: "২০২৩-২০২৪ শিক্ষাবর্ষ আলিম ১ম বর্ষ শিক্ষার্থীদের ফাউন্ডেশন কোর্স", url: "https://dskm.ac.bd/assets/fileupload/1694326360.jpg" },
  { title: "আলিম ২০২৩-২০২৪ ঈসায়ী শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি", url: "https://dskm.ac.bd/assets/fileupload/1693976396.jpg" }
];


/* ----------------------------------------------------------
   4) Timeline: how the madrasah grew, step by step.
   Taken from the history text on the original website.
   ---------------------------------------------------------- */
var milestones = [
  {
    year: "১৯৮৯",
    title: "ভিত্তি স্থাপন",
    text: "১৯৮৯ সনের সেপ্টেম্বরে ফুরফুরা শরীফের পীর হযরত মাওলানা আব্দুল কাহহার সিদ্দীকী আল কুরাইশী র. মাদরাসার ভিত্তি স্থাপন করেন। ‘দারুল ফেরদাউস’ নামের পরিবর্তে তিনি এর নাম রাখেন ‘দারুননাজাত’।"
  },
  {
    year: "১৯৯০",
    title: "ইবতেদায়ী স্তরে পাঠদান শুরু",
    text: "১৯৯০ সনের জানুয়ারিতে হুসাইনিয়া জামে মাসজিদের মক্তবটি এখানে আনা হয় এবং মাদরাসার একাডেমিক কার্যক্রম শুরু হয়। দুই বছর ইবতেদায়ী স্তর চলে।"
  },
  {
    year: "১৯৯২",
    title: "দাখিল স্তর",
    text: "বর্তমান অধ্যক্ষ ১৯৯১ সালের ১৬ ডিসেম্বর ইবতেদায়ী প্রধান হিসেবে যোগ দেন। ১৯৯২ সনে দশম শ্রেণিতে একজন, নবম শ্রেণিতে একজন, অষ্টম শ্রেণিতে তিনজন ও সপ্তম শ্রেণিতে ছয়জন ছাত্র নিয়ে দাখিল স্তরের কার্যক্রম শুরু হয়।"
  },
  {
    year: "১৯৯৪",
    title: "আলিম পর্যায়",
    text: "মাদরাসাটি আলিম পর্যায়ে উন্নীত হয়।"
  },
  {
    year: "১৯৯৬",
    title: "ফাযিল পর্যায়",
    text: "মাদরাসাটি ফাযিল পর্যায়ে উন্নীত হয়।"
  },
  {
    year: "২০০৪",
    title: "কামিল পর্যায় ও হাদিস বিভাগ",
    text: "মাদরাসাটি কামিল পর্যায়ে উন্নীত হয় এবং একই বছর কামিল (স্নাতকোত্তর) হাদিস বিভাগ চালু হয়।"
  },
  {
    year: "২০১০",
    title: "ফাযিল অনার্স",
    text: "আল কুরআন এন্ড ইসলামিক স্টাডিজ এবং আল হাদিস এন্ড ইসলামিক স্টাডিজ — এই দুটি বিষয়ে অনার্স কোর্স চালু হয়।"
  },
  {
    year: "২০১৬",
    title: "কামিল ফিকহ বিভাগ",
    text: "কামিল (স্নাতকোত্তর) ফিকহ বিভাগ চালু হয়।"
  },
  {
    year: "২০১৭",
    title: "কামিল মাস্টার্স",
    text: "কামিল (স্নাতকোত্তর) মাস্টার্স চালু হয়।"
  },
  {
    year: "২০১৮",
    title: "কামিল তাফসির বিভাগ",
    text: "সর্বশেষ কামিল (স্নাতকোত্তর) তাফসির বিভাগ চালু হয়।"
  }
];
