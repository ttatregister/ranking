// ---- Elements (ต้องมี id ตรงกับ index.html) ----
const sheetSelect = document.getElementById("sheetSelect");
const qInput = document.getElementById("q");
const eventSelect = document.getElementById("eventSelect");
const eventOnlyPositive = document.getElementById("eventOnlyPositive");
const statusEl = document.getElementById("status");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

// ---- Data state ----
let rawRows = [];
let columns = [];

// คอลัมน์หลัก (ไม่ใช่รายการแข่งขัน)
const FIXED_COLS = new Set([
  "Rank",
  "Rank (Prev)",
  "Code",
  "Name",
  "Birth Year",
  "Team",
  "Age",
  "Total Point",
]);

function isEventCol(colName) {
  const n = String(colName ?? "").trim();
  if (!n) return false;            // ไม่เอาหัวคอลัมน์ว่าง
  if (FIXED_COLS.has(n)) return false;
  return true;                     // ที่เหลือถือเป็นรายการแข่งขัน
}

function normalize(v) {
  return String(v ?? "").toLowerCase().trim();
}

// ---- Init ----
async function initSheets() {
  statusEl.textContent = "กำลังโหลดรายชื่อชีท...";
  const res = await fetch("./data/manifest.json", { cache: "no-store" });
  if (!res.ok) throw new Error("โหลด data/manifest.json ไม่สำเร็จ");

  const manifest = await res.json();
  const sheets = manifest.sheets || [];

  sheetSelect.innerHTML = "";
  for (const s of sheets) {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    sheetSelect.appendChild(opt);
  }

  if (!sheets.length) {
    statusEl.textContent = "ไม่พบชีทใน manifest.json";
    return;
  }

  await loadSheet(sheets[0]);
}

// ---- Load sheet ----
async function loadSheet(sheetName) {
  statusEl.textContent = `กำลังโหลด ${sheetName}...`;
  thead.innerHTML = "";
  tbody.innerHTML = "";

  const res = await fetch(`./data/${sheetName}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`โหลด data/${sheetName}.json ไม่สำเร็จ`);

  rawRows = await res.json();
  columns = rawRows.length ? Object.keys(rawRows[0]) : [];

  renderHeader(columns);
  buildEventDropdown(columns);
  applyFilters();

  statusEl.textContent = `โหลดแล้ว: ${sheetName} (${rawRows.length.toLocaleString()} แถว)`;
}

// ---- Header ----
function renderHeader(cols) {
  const tr = document.createElement("tr");
  for (const c of cols) {
    const th = document.createElement("th");
    th.textContent = c;
    tr.appendChild(th);
  }
  thead.appendChild(tr);
}

// ---- Event dropdown ----
function buildEventDropdown(cols) {
  const keep = eventSelect.value;
  eventSelect.innerHTML = `<option value="">— ไม่กรอง —</option>`;

  const eventCols = cols.filter(c => isEventCol(c));
  for (const c of eventCols) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    eventSelect.appendChild(opt);
  }

  if ([...eventSelect.options].some(o => o.value === keep)) {
    eventSelect.value = keep;
  }
}

// ---- Filters ----
function applyFilters() {
  const q = normalize(qInput.value);
  const ev = eventSelect.value;
  const onlyPos = eventOnlyPositive.checked;

  const filtered = rawRows.filter(r => {
    // search
    if (q) {
      const hay = normalize(columns.map(c => r[c]).join(" "));
      if (!hay.includes(q)) return false;
    }

    // event filter
    if (ev) {
      const val = Number(r[ev] ?? 0);
      if (onlyPos && !(val > 0)) return false;
    }

    return true;
  });

  renderBody(filtered);
}

// ---- Formatting rules ----
function formatCell(col, v) {
  if (v === null || v === undefined || v === "") return "";

  // Rank columns => integer
  if (col === "Rank" || col === "Rank (Prev)") {
    const num = Number(v);
    return Number.isFinite(num) ? String(Math.round(num)) : String(v);
  }

  // Total Point => always 2 decimals
  if (col === "Total Point") {
    const num = Number(v);
    return Number.isFinite(num) ? num.toFixed(2) : String(v);
  }

  // Event points => 2 decimals, but if 0 => blank
  if (isEventCol(col)) {
    const num = Number(v);
    if (!Number.isFinite(num)) return String(v);
    if (Math.abs(num) < 1e-9) return "";     // 0.00 => blank
    return num.toFixed(2);
  }

  // Other columns => text
  return String(v);
}

// ---- Render body ----
function renderBody(rows) {
  tbody.innerHTML = "";
  const frag = document.createDocumentFragment();

  for (const r of rows) {
    const tr = document.createElement("tr");
    for (const c of columns) {
      const td = document.createElement("td");
      td.textContent = formatCell(c, r[c]);
      tr.appendChild(td);
    }
    frag.appendChild(tr);
  }

  tbody.appendChild(frag);
}

// ---- Events ----
sheetSelect.addEventListener("change", () => loadSheet(sheetSelect.value));
qInput.addEventListener("input", applyFilters);
eventSelect.addEventListener("change", applyFilters);
eventOnlyPositive.addEventListener("change", applyFilters);

// ---- Start ----
initSheets().catch(err => {
  statusEl.textContent = `เกิดข้อผิดพลาด: ${err.message}`;
});
