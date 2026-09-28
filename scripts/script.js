/* ==========================================================================
   Mediprim S.A. — script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Menú móvil ---- */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var logo = document.querySelector('#medipremLogo');

  function animateLogo() {
    if (!logo) return;

    logo.classList.remove('animate');

    // Fuerza el reinicio de la animación antes de volver a agregar la clase.
    void logo.getBoundingClientRect().width;

    logo.classList.add('animate');
  }

  window.addEventListener('load', animateLogo, { once: true });

  if (logo) {
    logo.addEventListener('mouseenter', animateLogo);
  }

  /* ---- Año en el footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---- ¿Está abierto ahora? (horario de Berazategui, AR) ---- */
  var openBadge = document.getElementById('openBadge');
  var hoursList = document.getElementById('hoursList');

  function checkOpenNow() {
    if (!openBadge || !hoursList) return;

    var now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
    var day = now.getDay(); // 0 = domingo ... 6 = sábado
    var hour = now.getHours() + now.getMinutes() / 60;

    var isWeekday = day >= 1 && day <= 5;
    var isSaturday = day === 6;

    var open = (isWeekday && hour >= 8 && hour < 17) || (isSaturday && hour >= 8 && hour < 12);

    openBadge.hidden = false;
    openBadge.textContent = open ? 'Abierto ahora' : 'Cerrado en este momento';
    openBadge.classList.toggle('is-open', open);
    openBadge.classList.toggle('is-closed', !open);

    hoursList.querySelectorAll('li').forEach(function (li) {
      var days = (li.getAttribute('data-days') || '').split(',').map(Number);
      if (days.indexOf(day) !== -1) {
        li.setAttribute('data-today', '');
      } else {
        li.removeAttribute('data-today');
      }
    });
  }

  checkOpenNow();
});

/* Current Year, Last Midified */
const year = document.querySelector("#currentYear");
year.textContent = new Date().getFullYear();
// I use both forms to remember — the long way and the short way
document.getElementById("lastModified").innerHTML = document.lastModified;