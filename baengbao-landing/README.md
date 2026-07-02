# แบ่งเบา — Landing (baengbao.com)

เว็บโปรโมตของแบ่งเบา (บอทอยู่อีก repo/บริการ ที่ baengbao.app)

## ไฟล์
- server.js — Express static + /admin
- public/index.html — หน้า landing (i18n TH-EN + dark mode ในตัว)
- public/logo.png, og.png, line-qr.png, privacy.html, terms.html

## /admin — เปลี่ยนโลโก้เว็บ
- ตั้ง env `ADMIN_KEY` บน Railway ก่อน (ไม่ตั้ง = ปิดใช้งาน)
- เปิด baengbao.com/admin → ใส่คีย์ → เลือกรูป (PNG/JPEG/WebP ≤2MB, แนะนำจัตุรัส 512×512) → อัปโหลด & ใช้เลย
- โลโก้เสิร์ฟแบบ no-cache เห็นรูปใหม่ทันที
- ⚠️ ระบบไฟล์ Railway เป็นแบบชั่วคราว: รูปที่อัปโหลด**หายเมื่อ redeploy** — ถ้าต้องการถาวร ให้เอาไฟล์เดียวกันแทนที่ public/logo.png ใน GitHub ด้วย
