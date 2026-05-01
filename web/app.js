// ── AUTH GUARD ──
function authGuard() {
  if (!localStorage.getItem("login")) window.location.href = "index.html";
}

// ── LOGOUT ──
function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

// ── TOAST ──
function showToast(msg, type = "info", duration = 2800) {
  let t = document.getElementById("_toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "_toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = "toast " + type;
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => t.classList.remove("show"), duration);
}

// ── MODAL ──
function showModal(title, msg, onOk, onCancel) {
  let overlay = document.getElementById("_modal");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "_modal";
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <h3 id="_modal_title"></h3>
        <p id="_modal_msg"></p>
        <div class="btn-row">
          <button class="btn-secondary" id="_modal_cancel">Tidak</button>
          <button class="btn-primary" id="_modal_ok">Ya</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
  }
  document.getElementById("_modal_title").textContent = title;
  document.getElementById("_modal_msg").textContent = msg;
  overlay.classList.add("active");

  const ok     = document.getElementById("_modal_ok");
  const cancel = document.getElementById("_modal_cancel");

  const close = () => overlay.classList.remove("active");

  ok.onclick = () => { close(); if (onOk) onOk(); };
  cancel.onclick = () => { close(); if (onCancel) onCancel(); };
}

// ── SIDEBAR HAMBURGER ──
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const sidebar   = document.querySelector(".sidebar");
  const soverlay  = document.querySelector(".sidebar-overlay");
  if (!hamburger) return;
  hamburger.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    soverlay.classList.toggle("active");
  });
  soverlay.addEventListener("click", function () {
    sidebar.classList.remove("open");
    soverlay.classList.remove("active");
  });
  sidebar.querySelectorAll("a").forEach(function (l) {
    l.addEventListener("click", function () {
      sidebar.classList.remove("open");
      soverlay.classList.remove("active");
    });
  });
});