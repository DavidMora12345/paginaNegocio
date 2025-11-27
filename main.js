document.addEventListener("DOMContentLoaded", function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function scrollToTarget(target) {
    var el = document.querySelector(target);
    if (!el) return;
    var header = document.querySelector("header");
    var offset = (header ? header.offsetHeight : 60) + 8;
    var top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  document.querySelectorAll("[data-scroll]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var target = el.getAttribute("data-scroll");
      if (target) scrollToTarget(target);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (el) {
    el.addEventListener("click", function (e) {
      var href = el.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      scrollToTarget(href);
    });
  });

  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.style.display === "block";
      navMenu.style.display = open ? "none" : "block";
      navToggle.textContent = open ? "☰" : "✕";
    });

    navMenu.querySelectorAll("[data-scroll]").forEach(function (item) {
      item.addEventListener("click", function () {
        navMenu.style.display = "none";
        navToggle.textContent = "☰";
      });
    });
  }

  var form = document.getElementById("contactForm");
  var statusEl = document.getElementById("formStatus");

  if (form && statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = form.nombre.value.trim();
      var email = form.email.value.trim();

      if (!nombre || !email) {
        statusEl.textContent = "Nombre y correo son obligatorios.";
        statusEl.style.color = "#ff3b30";
        return;
      }

      statusEl.textContent = "Gracias, tu mensaje fue registrado.";
      statusEl.style.color = "#34c759";
      form.reset();

      setTimeout(function () {
        statusEl.textContent = "Te responderé por correo.";
        statusEl.style.color = "";
      }, 5000);
    });
  }

  /* ORB QUE SIGUE EL CURSOR (simple, sin historias raras) */
  var orb = document.querySelector(".cursor-orb");

  if (orb) {
    window.addEventListener("mousemove", function (e) {
      orb.style.opacity = "1";
      orb.style.top = e.clientY + "px";
      orb.style.left = e.clientX + "px";
    });

    window.addEventListener("mouseleave", function () {
      orb.style.opacity = "0";
    });
  }
});
