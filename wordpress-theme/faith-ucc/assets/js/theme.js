/* Faith UCC — motion and live details. No dependencies. */
(function () {
  'use strict';

  var CFG = window.FAITH || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  root.classList.remove('no-js');

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Church-time dates ---------- */

  // Wall-clock "now" in the church's timezone.
  function churchNow() {
    var parts = {};
    try {
      new Intl.DateTimeFormat('en-US', {
        timeZone: CFG.tz || 'America/Chicago', year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hourCycle: 'h23', weekday: 'short'
      }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    } catch (e) {
      var d = new Date();
      return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate(), mins: d.getHours() * 60 + d.getMinutes(), wd: d.getDay() };
    }
    return {
      y: +parts.year, m: +parts.month - 1, d: +parts.day,
      mins: (+parts.hour % 24) * 60 + +parts.minute,
      wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday)
    };
  }

  function utcDate(y, m, d) { return new Date(Date.UTC(y, m, d)); }
  function ymd(date) { return date.toISOString().slice(0, 10); }
  function parseYmd(s) { var a = s.split('-'); return utcDate(+a[0], +a[1] - 1, +a[2]); }
  function addDays(date, n) { return new Date(date.getTime() + n * 86400000); }

  // rule token: "weekly:0", "nth:0:3", "last:6"
  function matches(token, date) {
    var p = token.split(':');
    var wd = +p[1];
    if (date.getUTCDay() !== wd) return false;
    if (p[0] === 'weekly') return true;
    if (p[0] === 'last') return addDays(date, 7).getUTCMonth() !== date.getUTCMonth();
    return Math.ceil(date.getUTCDate() / 7) === +p[2];
  }

  function nextOccurrence(token, from) {
    for (var i = 0; i < 62; i++) {
      var d = addDays(from, i);
      if (matches(token, d)) return d;
    }
    return from;
  }

  function fmt(date, opts) {
    opts.timeZone = 'UTC';
    return new Intl.DateTimeFormat('en-US', opts).format(date);
  }

  var now = churchNow();
  var today = utcDate(now.y, now.m, now.d);

  /* ---------- Sunday status ---------- */

  function renderSundayStatus() {
    now = churchNow();
    today = utcDate(now.y, now.m, now.d);
    var start = +CFG.worshipStart || 600;
    var end = +CFG.worshipEnd || 680;
    var isSunday = now.wd === 0;
    var live = isSunday && now.mins >= start && now.mins < end;
    var soon = isSunday && now.mins >= start - 45 && now.mins < start;

    $$('[data-sunday-status]').forEach(function (el) {
      var compact = el.hasAttribute('data-compact');
      if ((live || soon) && CFG.zoomUrl) {
        var label = live ? 'Worship is live now. Join on Zoom' : 'Worship starts in ' + (start - now.mins) + ' min. Join on Zoom';
        el.innerHTML = '';
        var a = document.createElement('a');
        a.className = 'ss-live';
        a.href = CFG.zoomUrl;
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = '<span class="live-dot" aria-hidden="true"></span><span class="link-underline"></span>';
        a.lastChild.textContent = label;
        el.appendChild(a);
        return;
      }
      var from = isSunday && now.mins >= end ? addDays(today, 1) : today;
      var next = nextOccurrence('weekly:0', from);
      var isToday = ymd(next) === ymd(today);
      var communion = CFG.showCommunion && matches('nth:0:1', next);
      var day = isToday ? 'Today' : 'This Sunday';
      var html = '<span class="ss-day"></span>';
      if (!compact && !isToday) html += '<span class="ss-meta ss-date"></span>';
      html += '<span class="ss-meta ss-time"></span>';
      if (communion && !compact) html += '<span class="ss-communion">· Communion Sunday</span>';
      el.innerHTML = html;
      $('.ss-day', el).textContent = day;
      if ($('.ss-date', el)) $('.ss-date', el).textContent = '· ' + fmt(next, { month: 'short', day: 'numeric' });
      $('.ss-time', el).textContent = (CFG.worshipLabel || '10 a.m.') + (compact ? '' : ' · In person & on Zoom');
    });
  }

  /* ---------- Keep cached date lists current ---------- */

  function refreshDateLists() {
    $$('[data-date-list]').forEach(function (list) {
      var limit = +list.getAttribute('data-limit') || 99;
      var rows = $$('[data-date]', list);
      rows.forEach(function (row) {
        var rule = row.getAttribute('data-rule');
        var date = rule ? nextOccurrence(rule, today) : parseYmd(row.getAttribute('data-date'));
        row.setAttribute('data-date', ymd(date));
        row.classList.toggle('is-past', date < today);
        var day = $('[data-fmt="day"]', row);
        var mon = $('[data-fmt="mon"]', row);
        if (rule && day) day.textContent = fmt(date, { day: 'numeric' });
        if (rule && mon) mon.textContent = fmt(date, { month: 'short' }) + ' ' + fmt(date, { weekday: 'short' });
        var short = $('[data-fmt="short"]', row);
        if (rule && short) short.textContent = fmt(date, { weekday: 'short', month: 'short', day: 'numeric' });
      });
      rows.sort(function (a, b) { return a.getAttribute('data-date') < b.getAttribute('data-date') ? -1 : 1; });
      var shown = 0;
      rows.forEach(function (row) {
        list.appendChild(row);
        var past = row.classList.contains('is-past');
        row.classList.toggle('is-extra', !past && shown >= limit);
        if (!past) shown++;
      });
    });

    // "Next: Sat, Nov 29" on gathering cards.
    $$('[data-next][data-rule]').forEach(function (el) {
      var d = nextOccurrence(el.getAttribute('data-rule'), today);
      var span = $('[data-fmt="short"]', el);
      if (span) span.textContent = fmt(d, { weekday: 'short', month: 'short', day: 'numeric' });
    });
  }

  /* ---------- Scroll reveals ---------- */

  function initReveals() {
    var els = $$('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    // Anything already on screen (or just below it) shows right away; the rest as it scrolls in.
    var vh = window.innerHeight;
    var rest = els.filter(function (el) {
      if (el.getBoundingClientRect().top < vh * 1.05) { el.classList.add('is-in'); return false; }
      return true;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px 12% 0px', threshold: 0 });
    rest.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Header: hide on scroll down, show on scroll up ---------- */

  function initHeader() {
    var header = $('[data-header]');
    if (!header) return;
    var announce = $('.announce');
    var lastY = window.scrollY;
    var ticking = false;
    var adminBar = document.getElementById('wpadminbar');
    function setAnnounce() {
      if (announce) root.style.setProperty('--announce-h', announce.offsetHeight + 'px');
    }
    function placeHeader() {
      // Sit below the announcement bar (and the admin bar, when logged in) until it scrolls away.
      var barTop = adminBar && getComputedStyle(adminBar).position === 'fixed' ? adminBar.offsetHeight : 0;
      var top = announce ? Math.max(barTop, announce.getBoundingClientRect().bottom) : barTop;
      header.style.top = top + 'px';
    }
    function update() {
      var y = window.scrollY;
      placeHeader();
      var threshold = announce ? announce.offsetHeight : 12;
      header.classList.toggle('is-scrolled', y > threshold);
      if (!root.classList.contains('menu-locked')) {
        if (y > 240 && y > lastY + 4) header.classList.add('is-hidden');
        else if (y < lastY - 4 || y < 240) header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    }
    setAnnounce();
    update();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', setAnnounce);
  }

  /* ---------- Full-screen menu ---------- */

  function initMenu() {
    var menu = $('[data-menu]');
    if (!menu) return;
    var openers = $$('[data-menu-open]');
    var closer = $('[data-menu-close]', menu);
    var lastFocus = null;

    function setOpen(open, focusEl) {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
      root.classList.toggle('menu-locked', open);
      openers.forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
      if (open) {
        lastFocus = document.activeElement;
        setTimeout(function () { (focusEl || closer) && (focusEl || closer).focus(); }, 60);
      } else if (lastFocus && lastFocus.focus) {
        lastFocus.focus();
      }
    }

    openers.forEach(function (b) { b.addEventListener('click', function () { setOpen(true); }); });
    var searchInput = $('[data-search-input]', menu);
    $$('[data-search-open]').forEach(function (b) {
      b.addEventListener('click', function () { setOpen(true, searchInput); });
    });
    if (closer) closer.addEventListener('click', function () { setOpen(false); });

    document.addEventListener('keydown', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'Tab') {
        var f = $$('a[href], button, input', menu);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Same-page anchor links close the menu; other links navigate (with a view transition).
    $$('[data-menu-link]', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        var url = new URL(a.href, location.href);
        if (url.pathname === location.pathname && url.hash) setOpen(false);
      });
      function preview() {
        var idx = a.getAttribute('data-preview');
        $$('[data-preview-img]', menu).forEach(function (img) {
          img.classList.toggle('is-active', img.getAttribute('data-preview-img') === idx);
        });
      }
      a.addEventListener('mouseenter', preview);
      a.addEventListener('focus', preview);
    });

    // Restored from the back/forward cache with the menu open: close it.
    window.addEventListener('pageshow', function () { if (menu.classList.contains('is-open')) setOpen(false); });
  }

  /* ---------- Accordions (FAQ, partners) ---------- */

  function initAccordions() {
    $$('[data-acc]').forEach(function (acc) {
      var btn = $('.acc-btn', acc);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var open = acc.getAttribute('data-open') !== 'true';
        var group = acc.closest('[data-partners]');
        if (group && !open) return; // partners: one always open
        if (group) {
          $$('[data-acc]', group).forEach(function (other) {
            other.setAttribute('data-open', 'false');
            $('.acc-btn', other).setAttribute('aria-expanded', 'false');
          });
        }
        acc.setAttribute('data-open', open ? 'true' : 'false');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (group) swapPartnerImage(group, acc);
      });
      if (acc.closest('[data-partners]') && window.matchMedia('(hover: hover)').matches) {
        btn.addEventListener('mouseenter', function () { if (acc.getAttribute('data-open') !== 'true') btn.click(); });
      }
    });
  }

  function swapPartnerImage(group, acc) {
    var fig = $('.partner-figure', group);
    if (!fig) return;
    var img = $('img', fig);
    if (!img.getAttribute('data-default')) img.setAttribute('data-default', img.src);
    var src = acc.getAttribute('data-img') || img.getAttribute('data-default');
    if (img.src === src) return;
    fig.classList.add('is-swapping');
    setTimeout(function () {
      img.src = src;
      img.onload = function () { fig.classList.remove('is-swapping'); };
      setTimeout(function () { fig.classList.remove('is-swapping'); }, 600);
    }, 250);
  }

  /* ---------- History timeline ---------- */

  function initTimeline() {
    var tl = $('[data-timeline]');
    if (!tl) return;
    var track = $('[data-tl-track]', tl);
    var bar = $('[data-tl-bar]', tl);
    var chips = $$('[data-filter]', tl);

    function progress() {
      var max = track.scrollWidth - track.clientWidth;
      var p = max > 0 ? track.scrollLeft / max : 1;
      bar.style.width = Math.max(p, 0.06) * 100 + '%';
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        var n = 0;
        $$('.tl-card', track).forEach(function (card) {
          var show = f === 'all' || card.getAttribute('data-tag') === f;
          card.classList.toggle('is-hidden', !show);
          card.classList.remove('is-entering');
          if (show) {
            card.style.setProperty('--n', n++);
            void card.offsetWidth; // restart animation
            if (!reduceMotion) card.classList.add('is-entering');
          }
        });
        track.scrollTo({ left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        progress();
      });
    });

    function nudge(dir) {
      track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.8, 720), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    var prev = $('[data-tl-prev]', tl), next = $('[data-tl-next]', tl);
    if (prev) prev.addEventListener('click', function () { nudge(-1); });
    if (next) next.addEventListener('click', function () { nudge(1); });
    track.addEventListener('scroll', progress, { passive: true });
    window.addEventListener('resize', progress);

    progress();
  }

  /* ---------- Go ---------- */

  renderSundayStatus();
  /* ---------- Headline word rotator ---------- */

  function initRotators() {
    $$('[data-rotator]').forEach(function (rot) {
      var words = $$('.rot-word', rot);
      if (words.length < 2 || reduceMotion) return;
      var i = 0;
      function step() {
        if (document.hidden) return;
        var cur = words[i];
        i = (i + 1) % words.length;
        cur.classList.remove('is-on');
        cur.classList.add('is-out');
        words[i].classList.remove('is-out');
        words[i].classList.add('is-on');
        setTimeout(function () { cur.classList.remove('is-out'); }, 600);
      }
      // Start once the headline has risen in.
      setTimeout(function () { setInterval(step, 2600); }, 1400);
    });
  }

  /* ---------- Coming-up strip ---------- */

  function initStrips() {
    $$('[data-strip]').forEach(function (strip) {
      var track = $('[data-strip-track]', strip);
      var section = strip.closest('section') || document;
      var prev = $('[data-strip-prev]', section);
      var next = $('[data-strip-next]', section);
      if (!track) return;
      function cardStep() {
        var card = $('.ev-card:not(.is-past):not(.is-extra)', track);
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
      }
      function update() {
        var max = track.scrollWidth - track.clientWidth - 2;
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= max;
        strip.classList.toggle('is-scrollable', max > 2);
      }
      function go(dir) {
        track.scrollBy({ left: dir * cardStep(), behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  }

  /* ---------- Click-to-play YouTube (nothing loads from YouTube until pressed) ---------- */

  function initVideos() {
    $$('[data-yt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-yt');
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
        f.title = btn.getAttribute('aria-label') || 'Video';
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        f.className = 'watch-iframe';
        var box = document.createElement('div');
        box.className = 'watch-frame photo is-playing';
        box.appendChild(f);
        btn.replaceWith(box);
        f.focus();
      });
    });
  }

  refreshDateLists();
  initRotators();
  initStrips();
  initVideos();
  initReveals();
  initHeader();
  initMenu();
  initAccordions();
  initTimeline();
  setInterval(renderSundayStatus, 30000);
})();
