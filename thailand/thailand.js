(function () {
  var picker = document.querySelector("[data-stay-picker]");
  if (picker) {
    var buttons = picker.querySelectorAll("[data-stay]");
    var panels = document.querySelectorAll("[data-stay-panel]");
    function show(id) {
      buttons.forEach(function (btn) {
        var on = btn.getAttribute("data-stay") === id;
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
      panels.forEach(function (panel) {
        var on = panel.getAttribute("data-stay-panel") === id;
        panel.hidden = !on;
        if (on) {
          panel.classList.remove("reveal");
          panel.classList.add("is-in");
        }
      });
    }
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        show(btn.getAttribute("data-stay"));
      });
    });
    var initial = picker.getAttribute("data-initial") || (buttons[0] && buttons[0].getAttribute("data-stay"));
    if (initial) show(initial);
  }

  document.querySelectorAll("[data-checklist]").forEach(function (list) {
    var key = "tp-th-checklist-" + list.getAttribute("data-checklist");
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(key) || "{}") || {};
    } catch (e) {
      saved = {};
    }
    list.querySelectorAll("input[type='checkbox'][data-key]").forEach(function (box) {
      var id = box.getAttribute("data-key");
      box.checked = !!saved[id];
      box.addEventListener("change", function () {
        saved[id] = box.checked;
        try {
          localStorage.setItem(key, JSON.stringify(saved));
        } catch (err) { /* private mode */ }
      });
    });
  });

  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.print();
    });
  });

  var nav = document.querySelector(".nav-details");
  var menu = document.getElementById("primary-menu");
  if (menu) {
    menu.addEventListener("click", function (e) {
      if (!e.target.closest("a") || !nav) return;
      if (window.matchMedia("(max-width: 1023px)").matches) {
        setTimeout(function () { nav.open = false; }, 0);
      }
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || !nav) return;
    var guides = document.querySelector(".guides-details");
    if (guides && guides.open) {
      guides.open = false;
      return;
    }
    if (nav.open && window.matchMedia("(max-width: 1023px)").matches) nav.open = false;
  });

  // Close Guides dropdown / mobile menu on outside click; keep aria-expanded in sync
  document.querySelectorAll(".nav-details, .guides-details").forEach(function (d) {
    var sum = d.querySelector(":scope > summary");
    if (!sum) return;
    var sync = function () { sum.setAttribute("aria-expanded", d.open ? "true" : "false"); };
    sync();
    d.addEventListener("toggle", sync);
  });
  document.addEventListener("click", function (e) {
    var guides = document.querySelector(".guides-details");
    if (guides && guides.open && !guides.contains(e.target)) guides.open = false;
    if (nav && nav.open && !nav.contains(e.target)) nav.open = false;
  });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    document.querySelectorAll("a.btn, button.btn").forEach(function (btn) {
      if (btn.querySelector(".btn-roll") || btn.children.length) return;
      var label = btn.textContent;
      var roll = document.createElement("span");
      roll.className = "btn-roll";
      var top = document.createElement("span");
      top.textContent = label;
      var bot = document.createElement("span");
      bot.textContent = label;
      bot.setAttribute("aria-hidden", "true");
      roll.append(top, bot);
      btn.textContent = "";
      btn.appendChild(roll);
    });

    if ("IntersectionObserver" in window) {
      var nodes = document.querySelectorAll(
        "main > .section, .vpn-wrap > .policy-section, .vpn-wrap > .vpn-cta, .vpn-wrap > .disclaimer-box, .vpn-wrap > .sources, .vpn-intro + .tools-grid"
      );
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      nodes.forEach(function (node) {
        if (node.hidden || node.closest("[hidden]")) return;
        var rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          node.classList.add("is-in");
        } else {
          node.classList.add("reveal");
          io.observe(node);
        }
      });
    }
  }
})();
