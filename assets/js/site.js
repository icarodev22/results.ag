/* Results.AG — interações do site (menu, abertura, carrossel, formulário, barra do WhatsApp) */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var WA = 'https://wa.me/5581992777571?text=';

  /* ---------- abertura (só na home, uma vez por visita) ---------- */
  function initIntro() {
    var btn = document.getElementById('rg-intro');
    if (!btn) return;
    if (!root.classList.contains('rg-intro-on') || typeof window.RGIntro !== 'function') {
      root.classList.remove('rg-intro-on');
      btn.remove();
      return;
    }
    btn.hidden = false;
    var ended = false;
    function reveal() { root.classList.remove('rg-intro-on'); }
    function done() {
      if (ended) return; ended = true;
      reveal();
      try { sessionStorage.setItem('rsIntro', '1'); } catch (e) {}
      if (btn.parentNode) btn.parentNode.removeChild(btn);
    }
    setTimeout(done, 8000);
    window.RGIntro(btn, { reveal: reveal, done: done });
  }

  /* ---------- menu do celular ---------- */
  function initMenu() {
    var burger = document.querySelector('.burger');
    var menu = document.getElementById('menu');
    var scrim = document.querySelector('.menu-scrim');
    if (!burger || !menu) return;
    function set(open) {
      menu.hidden = !open;
      if (scrim) scrim.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    burger.addEventListener('click', function (e) { e.stopPropagation(); set(menu.hidden); });
    if (scrim) scrim.addEventListener('click', function () { set(false); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { set(false); burger.focus(); } });
  }

  /* ---------- barra fixa do WhatsApp (celular) ---------- */
  function initDock() {
    var dock = document.querySelector('.dock');
    if (!dock) return;
    var ticking = false;
    function check() {
      ticking = false;
      var de = document.scrollingElement || document.documentElement;
      var y = window.scrollY || de.scrollTop || 0;
      var left = de.scrollHeight - y - window.innerHeight;
      dock.classList.toggle('is-on', y > 520 && left > 1100);
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(check); } }, { passive: true });
    check();
  }

  /* ---------- formulário de orçamento → WhatsApp ---------- */
  function initForm() {
    var form = document.getElementById('orcamento');
    if (!form) return;
    var nome = form.querySelector('input[name="nome"]');
    var msg = form.querySelector('textarea[name="mensagem"]');
    var err = form.querySelector('.field-err');
    function showErr(on) {
      if (err) err.hidden = !on;
      if (nome) { nome.classList.toggle('is-err', on); nome.setAttribute('aria-invalid', on ? 'true' : 'false'); }
    }
    if (nome) nome.addEventListener('input', function () { if (nome.value.trim()) showErr(false); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = nome ? nome.value.trim() : '';
      if (!n) { showErr(true); if (nome) nome.focus(); return; }
      var tipoEl = form.querySelector('input[name="tipo"]:checked');
      var text = 'Olá! Quero criar meu site com a Results.AG.\n\nNome: ' + n + '\nPreciso de: ' + (tipoEl ? tipoEl.value : 'Site institucional');
      if (msg && msg.value.trim()) text += '\nSobre o projeto: ' + msg.value.trim();
      window.open(WA + encodeURIComponent(text), '_blank', 'noopener');
    });
    document.querySelectorAll('[data-tipo]').forEach(function (a) {
      a.addEventListener('click', function () {
        var v = a.getAttribute('data-tipo');
        var r = form.querySelector('input[name="tipo"][value="' + v + '"]');
        if (r) r.checked = true;
      });
    });
  }

  /* ---------- vídeos das prévias (página Projetos) ---------- */
  function initVideos() {
    document.querySelectorAll('.shot video').forEach(function (v) {
      if (reduce) { v.removeAttribute('autoplay'); try { v.pause(); } catch (e) {} v.remove(); return; }
      v.muted = true;
      var p = v.play && v.play(); if (p && p.catch) p.catch(function () {});
    });
  }

  /* ---------- carrossel circular 3D ---------- */
  function initCarousel() {
    var stage = document.getElementById('cc-stage'), ring = document.getElementById('cc-ring');
    if (!stage || !ring) return;
    var PROJ = [
      { name: 'TicketX', seg: 'Eventos e venda de ingressos', desc: 'Agenda de festas com filtro por categoria, link direto para a compra de cada evento e entrada para o Grupo VIP com descontos exclusivos.', url: 'https://ticketxco.com.br/' },
      { name: 'XandBap', seg: 'Artista · DJ de arrochadeira e funk', desc: 'Site artístico com a identidade do DJ: vídeos de show, lançamentos em destaque e botão direto para contratação.', url: 'https://xandbap.com.br/' },
      { name: 'Veluna DJ', seg: 'Artista · DJ em Recife, PE', desc: '“Uma nova energia para o seu evento.” Site do DJ com sobre, trajetória e contratação, apresentando Funk, Anos 2000, Brasilidade, Bregafunk e House.', url: 'https://velunadj.com.br/' }
    ];
    var cards = Array.prototype.slice.call(ring.querySelectorAll('.cc-card'));
    cards.forEach(function (el) {
      el._shade = el.querySelector('.cc-shade'); el._img = el.querySelector('img');
      if (el._img) el._img.addEventListener('error', function () { el._img.style.display = 'none'; });
    });
    var elN = document.getElementById('cc-n'), elName = document.getElementById('cc-name'), elSeg = document.getElementById('cc-seg'), elDesc = document.getElementById('cc-desc'), elUrl = document.getElementById('cc-url');
    var dots = Array.prototype.slice.call(document.querySelectorAll('.car-dot[data-i]'));
    var btnPause = document.getElementById('cc-pause');
    var A = 0, R = 560, target = null, v = 0, hover = false, kbd = false, drag = null, justDragged = false;
    var paused = reduce, visible = true, rafId = 0, lastInteract = 0, front = 0;

    function norm(a) { return ((a % 360) + 540) % 360 - 180; }
    function measure() {
      var w = ring.offsetWidth || 600;
      R = Math.round((w / 2) / Math.tan(Math.PI / 6) + w * 0.06);
      stage.style.setProperty('--R', R + 'px');
      apply();
    }
    function setFront(f) {
      front = f;
      var p = PROJ[f];
      if (elN) elN.textContent = '0' + (f + 1) + ' / 03';
      if (elName) elName.textContent = p.name;
      if (elSeg) elSeg.textContent = p.seg;
      if (elDesc) elDesc.textContent = p.desc;
      if (elUrl) elUrl.href = p.url;
      dots.forEach(function (d, i) { d.classList.toggle('is-on', i === f); d.setAttribute('aria-current', i === f ? 'true' : 'false'); });
    }
    function apply() {
      ring.style.transform = 'translateZ(' + (-R) + 'px) rotateY(' + A.toFixed(3) + 'deg)';
      for (var k = 0; k < cards.length; k++) {
        var el = cards[k];
        var rel = norm(A + k * 60), rad = rel * Math.PI / 180, c = Math.cos(rad), s = Math.sin(rad);
        el.style.transform = 'scale(' + (1 - 0.15 * (1 - c) / 2).toFixed(4) + ')';
        if (el._shade) el._shade.style.opacity = Math.min(0.85, 0.45 * (1 - c) * 1.25).toFixed(3);
        if (el._img) el._img.style.transform = 'translateX(' + (-s * 6).toFixed(2) + '%)';
        var f = Math.abs(rel) < 30 ? '1' : '0';
        if (el.dataset.front !== f) el.dataset.front = f;
      }
      var fr = ((Math.round(-A / 60) % 6) + 6) % 6 % 3;
      if (fr !== front) setFront(fr);
    }
    function step(dt, now) {
      if (drag && drag.moved) { v = 0; }
      else if (target != null) {
        A = reduce ? target : A + (target - A) * Math.min(1, dt * 5);
        if (Math.abs(target - A) < 0.02) { A = target; target = null; }
        v = 0;
      } else {
        var drift = !paused && !hover && !kbd && !reduce && (now - lastInteract) > 3500;
        v += ((drift ? 8 : 0) - v) * Math.min(1, dt * 1.4);
        A += v * dt;
        if (!drift && Math.abs(v) < 0.5) { var sA = Math.round(A / 60) * 60; if (Math.abs(sA - A) > 0.02) target = sA; }
      }
      apply();
    }
    function start() {
      if (rafId) return;
      var last = performance.now();
      function loop(now) {
        rafId = 0;
        var dt = Math.min(0.05, (now - last) / 1000); last = now;
        step(dt, now);
        if (visible && !document.hidden) rafId = requestAnimationFrame(loop);
      }
      rafId = requestAnimationFrame(loop);
    }
    function go(t) { target = t; lastInteract = performance.now(); start(); }
    function base() { return target != null ? target : Math.round(A / 60) * 60; }

    cards.forEach(function (el) {
      var k = parseInt(el.getAttribute('data-k'), 10) || 0;
      el.addEventListener('click', function () { if (justDragged) return; go(A + norm(-k * 60 - A)); });
    });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        var d1 = norm(-i * 60 - A), d2 = norm(-(i + 3) * 60 - A);
        go(A + (Math.abs(d1) <= Math.abs(d2) ? d1 : d2));
      });
    });
    var prev = document.getElementById('cc-prev'), next = document.getElementById('cc-next');
    if (prev) prev.addEventListener('click', function () { go(base() + 60); });
    if (next) next.addEventListener('click', function () { go(base() - 60); });
    function syncPause() {
      if (!btnPause) return;
      btnPause.classList.toggle('is-paused', paused);
      btnPause.setAttribute('aria-label', paused ? 'Retomar rotação automática' : 'Pausar rotação automática');
    }
    if (btnPause) btnPause.addEventListener('click', function () { paused = !paused; lastInteract = 0; syncPause(); start(); });
    syncPause();

    stage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(base() - 60); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(base() + 60); }
    });
    stage.addEventListener('focus', function () { kbd = true; });
    stage.addEventListener('blur', function () { kbd = false; });
    stage.addEventListener('mouseenter', function () { hover = true; });
    stage.addEventListener('mouseleave', function () { hover = false; lastInteract = performance.now() - 2500; start(); });
    stage.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, id: e.pointerId, A0: A, moved: false };
    });
    stage.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (!drag.moved) {
        if (Math.abs(dx) < 7) return;
        if (Math.abs(e.clientY - drag.y) > Math.abs(dx)) { drag = null; return; }
        drag.moved = true; target = null;
        try { stage.setPointerCapture(drag.id); } catch (x) {}
        stage.classList.add('is-drag');
      }
      A = drag.A0 + dx * (120 / (ring.offsetWidth || 600));
      lastInteract = performance.now();
      start();
    });
    function up() {
      var d = drag; drag = null;
      if (!d || !d.moved) return;
      justDragged = true; setTimeout(function () { justDragged = false; }, 80);
      stage.classList.remove('is-drag');
      go(Math.round(A / 60) * 60);
    }
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });

    measure();
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        visible = !!(entries[0] && entries[0].isIntersecting);
        if (visible) {
          if (!stage.classList.contains('is-in')) { stage.classList.add('is-in'); lastInteract = performance.now() - 1500; }
          start();
        }
      }, { threshold: 0.12 });
      io.observe(stage);
    } else { stage.classList.add('is-in'); start(); }
  }

  function boot() {
    initIntro();
    initMenu();
    initDock();
    initForm();
    initVideos();
    initCarousel();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
