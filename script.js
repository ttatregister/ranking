// ===== Elements =====
const sheetSelect = document.getElementById("sheetSelect");
const qInput = document.getElementById("q");
const eventSelect = document.getElementById("eventSelect");
const eventOnlyPositive = document.getElementById("eventOnlyPositive");
const statusEl = document.getElementById("status");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

// ===== State =====
let rawRows = [];
let allColumns = [];
let visibleColumns = [];

// กันไม่ให้โชว์รายการแข่งขันตั้งแต่แรก
let userActivatedEvents = false;

// คอลัมน์หลักที่แสดงเสมอ
const BASE_COLS = [
  "Rank",
  "Rank (Prev)",
  "Code",
  "Name",
  "Birth Year",
  "Team",
  "Age",
  "Total Point",
];

// คอลัมน์ที่ต้องชิดซ้าย
const LEFT_ALIGN_COLS = new Set(["Name", "Team"]);

// ===== Helpers =====
function normalize(v) {
  return String(v ?? "").toLowerCase().trim();
}

function isBaseCol(col) {
  return BASE_COLS.includes(col);
}

function isEventCol(col) {
  const n = String(col ?? "").trim();
  if (!n) return false;
  if (isBaseCol(n)) return false;
  return true;
}

function getSelectedEvents() {
  return Array.from(eventSelect.selectedOptions)
    .map(o => o.value)
    .filter(v => v && v !== "__PLACEHOLDER__");
}

function clearEventSelection() {
  for (const opt of eventSelect.options) opt.selected = false;
  const ph = eventSelect.querySelector('option[value="__PLACEHOLDER__"]');
  if (ph) ph.selected = true;
}

function setStatus(msg) {
  statusEl.textContent = msg;
}

// ===== Init from manifest =====
async function initSheets() {
  setStatus("กำลังโหลดรายการประเภท...");
  const res = await fetch("./data/manifest.json", { cache: "no-store" });
  if (!res.ok) throw new Error("โหลด data/manifest.json ไม่สำเร็จ");

  const m = await res.json();
  const sheets = m.sheets || [];

  sheetSelect.innerHTML = "";
  for (const name of sheets) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sheetSelect.appendChild(opt);
  }

  if (!sheets.length) {
    setStatus("ไม่พบชีทใน manifest.json");
    return;
  }

  await loadSheet(sheets[0]);
}

// ===== Load one sheet =====
async function loadSheet(sheetName) {
  setStatus(`กำลังโหลด ${sheetName}...`);
  tbody.innerHTML = "";
  thead.innerHTML = "";

  const res = await fetch(`./data/${sheetName}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`โหลด data/${sheetName}.json ไม่สำเร็จ`);

  rawRows = await res.json();
  allColumns = rawRows.length ? Object.keys(rawRows[0]) : [];

  buildEventDropdown(allColumns);

  // ค่าเริ่มต้น: ไม่โชว์รายการแข่งขัน
  userActivatedEvents = false;
  clearEventSelection();

  applyFilters();

  setStatus(`โหลดแล้ว: ${sheetName} (${rawRows.length.toLocaleString()} แถว)`);
}

// ===== Event dropdown (multiple + placeholder) =====
function buildEventDropdown(cols) {
  // เลือกได้หลายรายการ
  eventSelect.multiple = true;
  eventSelect.size = 8;

  eventSelect.innerHTML = "";

  // placeholder (เป็นตัวเลือกเริ่มต้น)
  const placeholder = document.createElement("option");
  placeholder.value = "__PLACEHOLDER__";
  placeholder.textContent = "— ไม่เลือก (แสดงเฉพาะ Total Point) —";
  placeholder.selected = true;
  eventSelect.appendChild(placeholder);

  const eventCols = cols.filter(c => isEventCol(c));
  for (const c of eventCols) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    opt.selected = false;
    eventSelect.appendChild(opt);
  }
}

// ===== Visible columns =====
function updateVisibleColumns() {
  const selectedEvents = getSelectedEvents();
  const base = BASE_COLS.filter(c => allColumns.includes(c));

  // ถ้ายังไม่มี user action หรือยังไม่เลือก event จริง => แสดง base เท่านั้น
  if (!userActivatedEvents || selectedEvents.length === 0) {
    visibleColumns = base;
    return;
  }

  const withoutTotal = base.filter(c => c !== "Total Point");
  const total = base.includes("Total Point") ? ["Total Point"] : [];
  const events = selectedEvents.filter(e => allColumns.includes(e));

  visibleColumns = [...withoutTotal, ...events, ...total];
}

// ===== Filters + Render =====
function applyFilters() {
  updateVisibleColumns();
  renderHeader(visibleColumns);

  const q = normalize(qInput.value);
  const selectedEvents = getSelectedEvents();
  const onlyPos = eventOnlyPositive.checked;

  const filtered = rawRows.filter(r => {
    if (q) {
      const hay = normalize([r["Name"], r["Team"], r["Code"]].join(" "));
      if (!hay.includes(q)) return false;
    }

    if (userActivatedEvents && selectedEvents.length && onlyPos) {
      let ok = false;
      for (const e of selectedEvents) {
        const val = Number(r[e] ?? 0);
        if (val > 0) { ok = true; break; }
      }
      if (!ok) return false;
    }

    return true;
  });

  renderBody(filtered, visibleColumns);
  setStatus(`แสดงผล: ${filtered.length.toLocaleString()} แถว`);
}

// ===== Header =====
function renderHeader(cols) {
  const tr = document.createElement("tr");
  for (const c of cols) {
    const th = document.createElement("th");
    th.textContent = c;
    if (LEFT_ALIGN_COLS.has(c)) th.classList.add("left-col");
    tr.appendChild(th);
  }
  thead.innerHTML = "";
  thead.appendChild(tr);
}

// ===== Cell formatting =====
function formatCell(col, v) {
  if (v === null || v === undefined || v === "") return "";

  if (col === "Rank" || col === "Rank (Prev)") {
    const num = Number(v);
    return Number.isFinite(num) ? String(Math.round(num)) : String(v);
  }

  if (col === "Total Point") {
    const num = Number(v);
    return Number.isFinite(num) ? num.toFixed(2) : String(v);
  }

  if (isEventCol(col)) {
    const num = Number(v);
    if (!Number.isFinite(num)) return String(v);
    if (Math.abs(num) < 1e-9) return "";
    return num.toFixed(2);
  }

  return String(v);
}

// ===== Body =====
function renderBody(rows, cols) {
  tbody.innerHTML = "";
  const frag = document.createDocumentFragment();

  for (const r of rows) {
    const tr = document.createElement("tr");
    for (const c of cols) {
      const td = document.createElement("td");
      td.textContent = formatCell(c, r[c]);
      if (LEFT_ALIGN_COLS.has(c)) td.classList.add("left-col");
      tr.appendChild(td);
    }
    frag.appendChild(tr);
  }

  tbody.appendChild(frag);
}

// ===== Events =====
sheetSelect.addEventListener("change", () => loadSheet(sheetSelect.value));
qInput.addEventListener("input", applyFilters);

eventSelect.addEventListener("change", () => {
  userActivatedEvents = true;
  const ph = eventSelect.querySelector('option[value="__PLACEHOLDER__"]');
  if (ph) ph.selected = false; // ผู้ใช้เลือกอย่างอื่นแล้ว ปลด placeholder
  applyFilters();
});

eventOnlyPositive.addEventListener("change", applyFilters);

// ===== Start =====
initSheets().catch(err => {
  setStatus(`เกิดข้อผิดพลาด: ${err.message}`);
});