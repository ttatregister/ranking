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
let eventColumns = []; // รายการแข่งขันทั้งหมดในชีทปัจจุบัน

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

// ค่าพิเศษใน dropdown
const PLACEHOLDER = "__PLACEHOLDER__";
const ALL_EVENTS = "__ALL_EVENTS__";

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

function getEventMode() {
  // return: "none" | "all" | "one"
  const v = eventSelect.value;
  if (!v || v === PLACEHOLDER) return { mode: "none", key: "" };
  if (v === ALL_EVENTS) return { mode: "all", key: "" };
  return { mode: "one", key: v };
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

  // เตรียมรายการแข่งขันทั้งหมดจากชีทนี้
  eventColumns = allColumns.filter(c => isEventCol(c));

  buildEventDropdown();

  // ค่าเริ่มต้น: ไม่เลือก (แสดงเฉพาะ Total Point)
  eventSelect.value = PLACEHOLDER;

  applyFilters();

  setStatus(`โหลดแล้ว: ${sheetName} (${rawRows.length.toLocaleString()} แถว)`);
}

// ===== Build dropdown (single select + all events option) =====
function buildEventDropdown() {
  eventSelect.multiple = false;
  eventSelect.size = 0;

  eventSelect.innerHTML = "";

  // 1) placeholder
  const placeholder = document.createElement("option");
  placeholder.value = PLACEHOLDER;
  placeholder.textContent = "— ไม่เลือก (แสดงเฉพาะ Total Point) —";
  eventSelect.appendChild(placeholder);

  // 2) all events
  const allOpt = document.createElement("option");
  allOpt.value = ALL_EVENTS;
  allOpt.textContent = "เลือกทุกรายการแข่งขัน";
  eventSelect.appendChild(allOpt);

  // 3) each event
  for (const c of eventColumns) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    eventSelect.appendChild(opt);
  }
}

// ===== Visible columns =====
function updateVisibleColumns() {
  const { mode, key } = getEventMode();
  const base = BASE_COLS.filter(c => allColumns.includes(c));

  if (mode === "none") {
    visibleColumns = base;
    return;
  }

  const withoutTotal = base.filter(c => c !== "Total Point");
  const total = base.includes("Total Point") ? ["Total Point"] : [];

  if (mode === "all") {
    visibleColumns = [...withoutTotal, ...eventColumns, ...total];
    return;
  }

  // mode === "one"
  visibleColumns = [...withoutTotal, key, ...total];
}

// ===== Filters + Render =====
function applyFilters() {
  updateVisibleColumns();
  renderHeader(visibleColumns);

  const q = normalize(qInput.value);
  const { mode, key } = getEventMode();
  const onlyPos = eventOnlyPositive.checked;

  const filtered = rawRows.filter(r => {
    // search
    if (q) {
      const hay = normalize([r["Name"], r["Team"], r["Code"]].join(" "));
      if (!hay.includes(q)) return false;
    }

    // only positive for selected
    if (onlyPos && mode !== "none") {
      if (mode === "one") {
        const val = Number(r[key] ?? 0);
        if (!(val > 0)) return false;
      } else if (mode === "all") {
        // ถ้าเลือก "ทุกการแข่งขัน" และติ๊ก only positive:
        // เงื่อนไข = ต้องมีคะแนน >0 อย่างน้อย 1 รายการ
        let ok = false;
        for (const e of eventColumns) {
          const val = Number(r[e] ?? 0);
          if (val > 0) { ok = true; break; }
        }
        if (!ok) return false;
      }
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
    // 0.00 ให้เป็นค่าว่าง
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
eventSelect.addEventListener("change", applyFilters);
eventOnlyPositive.addEventListener("change", applyFilters);

// ===== Start =====
initSheets().catch(err => {
  setStatus(`เกิดข้อผิดพลาด: ${err.message}`);
});