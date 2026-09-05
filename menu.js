/* ============================================
   KAMRA Cafe & Eatery — menu.js
   Place this file at: menu.js (root of project)
   ============================================ */

(function () {
  'use strict';

  /* ── Category switching ── */
  const catBtns  = document.querySelectorAll('.cat-btn');
  const sections = document.querySelectorAll('.menu-section');

  function showSection(targetId) {
    sections.forEach(function (sec) {
      if (sec.id === targetId) {
        sec.classList.remove('hidden');
        /* Trigger entry animation */
        sec.classList.remove('visible');
        void sec.offsetWidth; /* reflow */
        sec.classList.add('visible');
      } else {
        sec.classList.add('hidden');
        sec.classList.remove('visible');
      }
    });
  }

  function setActiveBtn(targetId) {
    catBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.target === targetId);
    });
  }

  function scrollNavToActiveBtn(targetId) {
    var activeBtn = document.querySelector('.cat-btn[data-target="' + targetId + '"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.target;
      setActiveBtn(target);
      showSection(target);
      scrollNavToActiveBtn(target);
    });
  });

  /* ── Initialise first section ── */
  var firstTarget = catBtns[0] ? catBtns[0].dataset.target : null;
  if (firstTarget) {
    showSection(firstTarget);
    setActiveBtn(firstTarget);
  }

  /* ── Chat button placeholder (existing chatbot hooks into this) ── */
  var chatBtn = document.getElementById('chatbutton');
  if (chatBtn && typeof window.openKamraChat === 'function') {
    chatBtn.addEventListener('click', window.openKamraChat);
  }

})();
