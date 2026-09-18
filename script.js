// ---------- Mobile nav toggle ----------
(function () {
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  const iconMenu = document.getElementById("iconMenu");
  const iconClose = document.getElementById("iconClose");

  if (!toggle || !mobile) return;

  function setOpen(open) {
    mobile.classList.toggle("open", open);
    iconMenu.style.display = open ? "none" : "block";
    iconClose.style.display = open ? "block" : "none";
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    setOpen(!mobile.classList.contains("open"));
  });

  mobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });
})();

// ---------- Scroll reveal ----------
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (typeof IntersectionObserver === "undefined") {
    items.forEach((el) => el.classList.add("is-shown"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-shown");
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => io.observe(el));

  // stagger delays within grids that hold multiple reveal siblings
  document
    .querySelectorAll(
      ".servicos-grid, .metodo-grid, .comparativo-grid, .depoimentos-grid, .provas-grid, .demo-stats"
    )
    .forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        if (child.classList.contains("reveal")) {
          child.dataset.delay = i * 100;
        }
      });
    });
})();

// ---------- "Site dentro do site": contadores animados do painel Orbit ----------
(function () {
  const values = document.querySelectorAll(".demo-stat-value[data-count-to]");
  if (!values.length) return;

  function format(n, fmt) {
    if (fmt === "brl") {
      return (
        "R$ " +
        n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      );
    }
    if (fmt === "pct") {
      return n.toFixed(1).replace(".", ",") + "%";
    }
    return Math.round(n).toLocaleString("pt-BR");
  }

  function animate(el) {
    const target = parseFloat(el.dataset.countTo);
    const fmt = el.dataset.format || "int";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(target * eased, fmt);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (typeof IntersectionObserver === "undefined") {
    values.forEach(animate);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  values.forEach((el) => io.observe(el));
})();

// ---------- Footer year ----------
(function () {
  const el = document.getElementById("footerYear");
  if (!el) return;
  const year = new Date().getFullYear();
  el.textContent = `© ${year} Results.AG — Todos os direitos reservados`;
})();
