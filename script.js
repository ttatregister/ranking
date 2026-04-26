const SHEETS = {
  MS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=33605528&single=true&output=csv",
  WS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1118440186&single=true&output=csv",
  B19: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=198923694&single=true&output=csv",
  G19: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=749509364&single=true&output=csv",
  B17: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=601623159&single=true&output=csv",
  G17: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=506360973&single=true&output=csv",
  B15: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=2033147845&single=true&output=csv",
  G15: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1964581241&single=true&output=csv",
  B13: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=649616779&single=true&output=csv",
  G13: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=525912164&single=true&output=csv",
  B11: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=177182289&single=true&output=csv",
  G11: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1637581626&single=true&output=csv",
  B9: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1200752545&single=true&output=csv",
  G9: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=426016255&single=true&output=csv",
  B7: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=507008118&single=true&output=csv",
  G7: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=2069949537&single=true&output=csv",
  M40: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=180123009&single=true&output=csv",
  W40: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1803779250&single=true&output=csv",
  M50: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=849058364&single=true&output=csv",
  W50: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1472959168&single=true&output=csv",
  M60: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1550029371&single=true&output=csv",
  W60: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1533556664&single=true&output=csv",
  M65: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=639023729&single=true&output=csv",
  W65: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1253786588&single=true&output=csv",
  M70: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1038551311&single=true&output=csv",
  W70: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=943714494&single=true&output=csv",
  M75: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=238579574&single=true&output=csv",
  W75: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1730190311&single=true&output=csv",
  M80: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=2053402342&single=true&output=csv",
  W80: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGmO3Zvpl5IW_tGxa4z7C3eIRCAPd3FNU0zYVs9W3r6bLSSm2pid_EVZfxJaMHug/pub?gid=1157243703&single=true&output=csv"
};

const sheetSelect = document.getElementById("sheetSelect");
const qInput = document.getElementById("q");
const eventSelect = document.getElementById("eventSelect");
const eventOnlyPositive = document.getElementById("eventOnlyPositive");
const statusEl = document.getElementById("status");
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

let rawRows = [];
let allColumns = [];
let visibleColumns = [];
let eventColumns = [];

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

const LEFT_ALIGN_COLS = new Set(["Name", "Team"]);
const PLACEHOLDER = "__PLACEHOLDER__";
const ALL_EVENTS = "__ALL_EVENTS__";

function normalize(v) {
  return String(v ?? "").toLowerCase().trim();
}

function cleanText(v) {
  return String(v ?? "").replace(/\r/g, "").trim();
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function csvToObjects(csvText) {
  const rows = parseCSV(csvText).filter(r => r.some(c => cleanText(c) !== ""));
  const headers = rows[0].map(h => cleanText(h));
  const dataRows = rows.slice(1);

  return dataRows.map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      if (h) obj[h] = cleanText(row[i]);
    });
    return obj;
  });
}

function isBaseCol(col) {
  return BASE_COLS.includes(col);
}

function isEventCol(col) {
  const n = cleanText(col);
  if (!n) return false;
  if (isBaseCol(n)) return false;
  return true;
}

function getEventMode() {
  const v = eventSelect.value;

  if (!v || v === PLACEHOLDER) {
    return { mode: "none", key: "" };
  }

  if (v === ALL_EVENTS) {
    return { mode: "all", key: "" };
  }

  return { mode: "one", key: v };
}

function setStatus(msg) {
  statusEl.textContent = msg;
}

async function initSheets() {
  sheetSelect.innerHTML = "";

  for (const name of Object.keys(SHEETS)) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sheetSelect.appendChild(opt);
  }

  await loadSheet(Object.keys(SHEETS)[0]);
}

async function loadSheet(sheetName) {
  setStatus(`กำลังโหลด ${sheetName}...`);
  tbody.innerHTML = "";
  thead.innerHTML = "";

  const url = SHEETS[sheetName] + `&t=${Date.now()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`โหลดข้อมูล ${sheetName} ไม่สำเร็จ`);
  }

  const csvText = await res.text();
  rawRows = csvToObjects(csvText);

  allColumns = rawRows.length ? Object.keys(rawRows[0]) : [];
  eventColumns = allColumns.filter(c => isEventCol(c));

  buildEventDropdown();
  eventSelect.value = PLACEHOLDER;

  applyFilters();

  setStatus(`โหลดแล้ว: ${sheetName} (${rawRows.length.toLocaleString()} แถว)`);
}

function buildEventDropdown() {
  eventSelect.multiple = false;
  eventSelect.size = 0;
  eventSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = PLACEHOLDER;
  placeholder.textContent = "— ไม่เลือก แสดงเฉพาะ Total Point —";
  eventSelect.appendChild(placeholder);

  const allOpt = document.createElement("option");
  allOpt.value = ALL_EVENTS;
  allOpt.textContent = "เลือกทุกรายการแข่งขัน";
  eventSelect.appendChild(allOpt);

  for (const c of eventColumns) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    eventSelect.appendChild(opt);
  }
}

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

  visibleColumns = [...withoutTotal, key, ...total];
}

function applyFilters() {
  updateVisibleColumns();
  renderHeader(visibleColumns);

  const q = normalize(qInput.value);
  const { mode, key } = getEventMode();
  const onlyPos = eventOnlyPositive.checked;

  const filtered = rawRows.filter(r => {
    if (q) {
      const hay = normalize([r["Name"], r["Team"], r["Code"]].join(" "));
      if (!hay.includes(q)) return false;
    }

    if (onlyPos && mode !== "none") {
      if (mode === "one") {
        const val = Number(r[key] || 0);
        if (!(val > 0)) return false;
      }

      if (mode === "all") {
        let ok = false;

        for (const e of eventColumns) {
          const val = Number(r[e] || 0);
          if (val > 0) {
            ok = true;
            break;
          }
        }

        if (!ok) return false;
      }
    }

    return true;
  });

  renderBody(filtered, visibleColumns);
  setStatus(`แสดงผล: ${filtered.length.toLocaleString()} แถว`);
}

function renderHeader(cols) {
  const tr = document.createElement("tr");

  for (const c of cols) {
    const th = document.createElement("th");
    th.textContent = c;

    if (LEFT_ALIGN_COLS.has(c)) {
      th.classList.add("left-col");
    }

    tr.appendChild(th);
  }

  thead.innerHTML = "";
  thead.appendChild(tr);
}

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

function renderBody(rows, cols) {
  tbody.innerHTML = "";
  const frag = document.createDocumentFragment();

  for (const r of rows) {
    const tr = document.createElement("tr");

    for (const c of cols) {
      const td = document.createElement("td");
      td.textContent = formatCell(c, r[c]);

      if (LEFT_ALIGN_COLS.has(c)) {
        td.classList.add("left-col");
      }

      tr.appendChild(td);
    }

    frag.appendChild(tr);
  }

  tbody.appendChild(frag);
}

sheetSelect.addEventListener("change", () => {
  loadSheet(sheetSelect.value);
});

qInput.addEventListener("input", applyFilters);
eventSelect.addEventListener("change", applyFilters);
eventOnlyPositive.addEventListener("change", applyFilters);

initSheets().catch(err => {
  setStatus(`เกิดข้อผิดพลาด: ${err.message}`);
});