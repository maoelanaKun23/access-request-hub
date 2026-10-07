/**
 * Export PDF semua QR Code siswa.
 */
export function exportPdfAllQR(
  students: { id: string; name: string; nis: string; kelas: string }[],
  qrPayloadFn: (s: { id: string; name: string; nis: string; kelas: string }) => string
) {
  if (students.length === 0) return;

  const w = window.open("", "_blank", "width=800,height=1000");
  if (!w) {
    alert("Pop-up diblokir browser. Izinkan pop-up untuk fitur ini.");
    return;
  }

  const cardsJSON = JSON.stringify(
    students.map((s) => ({
      name: s.name,
      nis: s.nis,
      kelas: s.kelas,
      payload: qrPayloadFn(s),
    }))
  );

  const now = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  w.document.write(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>QR Code Semua Siswa — SDN Warakas 01</title>
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"><\/script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',Arial,sans-serif;background:#fff;padding:24px;color:#0F172A}
.toolbar{display:flex;justify-content:center;gap:10px;margin-bottom:24px}
.toolbar button{font-family:'Inter',sans-serif;font-size:13px;font-weight:600;padding:10px 24px;border-radius:9px;cursor:pointer;border:none;transition:opacity .15s}
.btn-print{background:#2563EB;color:#fff}
.btn-print:hover{opacity:.9}
.btn-close{background:#F1F5F9;color:#475569;border:1px solid #E2E8F0}
.header{text-align:center;border-bottom:2.5px solid #0F172A;padding-bottom:16px;margin-bottom:24px}
.header h1{font-size:17px;font-weight:700;letter-spacing:.3px}
.header .addr{font-size:11px;color:#64748B;margin-top:4px}
.header .meta{font-size:10px;color:#94A3B8;margin-top:8px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.card{border:1.5px solid #E2E8F0;border-radius:12px;padding:14px 10px;text-align:center;break-inside:avoid;display:flex;flex-direction:column;align-items:center;gap:6px}
.card canvas{display:block}
.card .name{font-size:11px;font-weight:700;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.card .nis{font-size:9px;color:#64748B}
.card .kelas{font-size:9px;font-weight:700;background:#F5F3FF;color:#6D28D9;padding:2px 10px;border-radius:5px;display:inline-block}
.footer{text-align:center;margin-top:24px;padding-top:14px;border-top:1px solid #E2E8F0;font-size:10px;color:#94A3B8}
@media print{
  body{padding:12px}
  .toolbar{display:none}
  .grid{gap:8px}
  .card{padding:10px 8px;border-width:1px}
}
@media (max-width:600px){.grid{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>

<div class="toolbar">
  <button class="btn-print" onclick="window.print()">Print / Save PDF</button>
  <button class="btn-close" onclick="window.close()">Tutup</button>
</div>

<div class="header">
  <h1>SEKOLAH DASAR NEGERI WARAKAS 01</h1>
  <p class="addr">Jl. Warakas Raya No. 1, Tanjung Priok, Jakarta Utara</p>
  <p class="meta">QR Code Absensi Siswa — Dicetak: ${now} — Total: ${students.length} siswa</p>
</div>

<div class="grid" id="qr-grid"></div>

<div class="footer">
  Dokumen ini digenerate oleh Sistem Absensi SDN Warakas 01 — ${now}
</div>

<script>
(function(){
  var students = ${cardsJSON};
  var grid = document.getElementById('qr-grid');

  students.forEach(function(s){
    // -- card container --
    var card = document.createElement('div');
    card.className = 'card';

    // -- QR canvas --
    var qr = qrcode(0, 'H');
    qr.addData(s.payload);
    qr.make();

    var canvas = document.createElement('canvas');
    var size = 120;
    var moduleCount = qr.getModuleCount();
    var cellSize = Math.floor(size / moduleCount);
    var actualSize = cellSize * moduleCount;
    canvas.width = actualSize;
    canvas.height = actualSize;
    canvas.style.width = actualSize + 'px';
    canvas.style.height = actualSize + 'px';

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, actualSize, actualSize);
    ctx.fillStyle = '#0F172A';
    for (var row = 0; row < moduleCount; row++) {
      for (var col = 0; col < moduleCount; col++) {
        if (qr.isDark(row, col)) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }
    card.appendChild(canvas);

    // -- name --
    var nameEl = document.createElement('div');
    nameEl.className = 'name';
    nameEl.textContent = s.name;
    card.appendChild(nameEl);

    // -- nis --
    var nisEl = document.createElement('div');
    nisEl.className = 'nis';
    nisEl.textContent = 'NIS: ' + s.nis;
    card.appendChild(nisEl);

    // -- kelas --
    var kelasEl = document.createElement('span');
    kelasEl.className = 'kelas';
    kelasEl.textContent = 'Kelas ' + s.kelas;
    card.appendChild(kelasEl);

    grid.appendChild(card);
  });
})();
<\/script>
</body>
</html>`);
  w.document.close();
}