(function () {
  'use strict';

  // Fill in this one object when the problem video is ready.
  const videoConfig = {
    videoSrc: '',
    posterSrc: '',
    captionsSrc: '',
    title: 'A customer experiences an incorrect fraud decline'
  };

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  document.documentElement.classList.add('js-enabled');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 52.51rem)').addEventListener('change', closeMenu);

  if (videoConfig.videoSrc) {
    const slot = document.getElementById('video-slot');
    if (!videoConfig.captionsSrc) {
      slot.querySelector('.video-placeholder span:last-child').textContent = 'Add the captions file in home.js to enable this video.';
      return;
    }
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', videoConfig.title);
    if (videoConfig.posterSrc) video.poster = videoConfig.posterSrc;
    const source = document.createElement('source');
    source.src = videoConfig.videoSrc;
    source.type = 'video/mp4';
    const track = document.createElement('track');
    track.kind = 'captions';
    track.src = videoConfig.captionsSrc;
    track.srclang = 'en';
    track.label = 'English';
    track.default = true;
    video.append(source, track);
    slot.replaceChildren(video);
    slot.removeAttribute('aria-label');
  }
})();
