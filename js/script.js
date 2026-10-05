(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  function toggleMenu(open) {
    var willOpen = typeof open === "boolean" ? open : !siteNav.classList.contains("open");
    siteNav.classList.toggle("open", willOpen);
    navToggle.classList.toggle("active", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute("aria-label", willOpen ? "关闭菜单" : "打开菜单");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      toggleMenu();
    });

    siteNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggleMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 620) {
        toggleMenu(false);
      }
    });
  }

  // Product image: tap to switch between main and detail
  var mediaEls = document.querySelectorAll(".media");
  mediaEls.forEach(function (media) {
    media.addEventListener("click", function () {
      media.classList.toggle("show-detail");
    });
  });

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Contact form (demo only)
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var contact = form.elements.contact.value.trim();

      if (!name || !contact) {
        note.textContent = "请先填写称呼和联系方式。";
        return;
      }

      note.textContent = "感谢咨询！我会尽快通过微信或电话联系你。";
      form.reset();
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
