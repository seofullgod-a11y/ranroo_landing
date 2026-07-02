const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const PUB = path.join(__dirname, 'public');
const LOGO = path.join(PUB, 'logo.png');

// โลโก้: ปิด cache เพื่อให้เห็นรูปใหม่ทันทีหลังอัปโหลด
app.get('/logo.png', (_req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(LOGO);
});

// ===== /admin — เปลี่ยนโลโก้ (ต้องตั้ง ADMIN_KEY ใน env) =====
function adminKeyOk(req) {
  const key = process.env.ADMIN_KEY;
  return key && (req.get('x-admin-key') === key || req.query.key === key);
}
app.get('/admin', (_req, res) => res.sendFile(path.join(PUB, 'admin.html')));
app.get('/admin/api/check', (req, res) => {
  if (!process.env.ADMIN_KEY) return res.status(404).json({ error: 'ตั้ง ADMIN_KEY ใน env ก่อนครับ' });
  if (!adminKeyOk(req)) return res.status(403).json({ error: 'คีย์ไม่ถูกต้อง' });
  res.json({ ok: true });
});
// อัปโหลดโลโก้ใหม่ (PNG/JPEG/WebP ≤ 2MB) — เขียนทับ public/logo.png
app.post('/admin/api/logo',
  express.raw({ type: ['image/png', 'image/jpeg', 'image/webp'], limit: '2mb' }),
  (req, res) => {
    if (!process.env.ADMIN_KEY) return res.status(404).json({ error: 'ตั้ง ADMIN_KEY ใน env ก่อนครับ' });
    if (!adminKeyOk(req)) return res.status(403).json({ error: 'คีย์ไม่ถูกต้อง' });
    const buf = req.body;
    if (!buf || !buf.length) return res.status(400).json({ error: 'ไม่พบไฟล์รูป (PNG/JPEG/WebP)' });
    try {
      fs.writeFileSync(LOGO, buf);
      res.json({ ok: true, size: buf.length });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

app.use(express.static(PUB, { extensions: ['html'] }));

app.get('*', (_req, res) => {
  res.sendFile(path.join(PUB, 'index.html'));
});

app.listen(PORT, () => console.log(`แบ่งเบา landing running on :${PORT}`));
