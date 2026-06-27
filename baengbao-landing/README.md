# แบ่งเบา — Landing Page

หน้า landing page สำหรับแอปบัญชีร้านอาหารที่จดผ่านไลน์ (ธีมขาว-ฟ้า)
แนวเดียวกับ ruayjud.com — พิมพ์ในไลน์/ถ่ายบิลให้ AI อ่าน, ดึงยอด Grab/LineMan/Shopee อัตโนมัติ, รู้กำไรต่อจาน, สรุปกำไร-ขาดทุนพร้อมกราฟ

## โครงสร้าง

```
baengbao-landing/
├── public/
│   └── index.html      ← หน้าเว็บทั้งหมด (HTML + CSS + JS ในไฟล์เดียว)
├── server.js           ← static server เล็ก ๆ (Express)
├── package.json
└── README.md
```

หน้าเว็บเป็นไฟล์เดียวจบ ไม่มี build step ไม่มี dependency ฝั่ง frontend
ฟอนต์โหลดจาก Google Fonts (Kanit + IBM Plex Sans Thai), ไอคอนเป็น inline SVG สไตล์ Tabler

## รันในเครื่อง

```bash
npm install
npm start
# เปิด http://localhost:3000
```

หรือถ้าไม่อยากลง Node เลย เปิด `public/index.html` ในเบราว์เซอร์ตรง ๆ ก็ได้

## Deploy ขึ้น Railway

1. push โค้ดขึ้น GitHub repo
2. ใน Railway: New Project → Deploy from GitHub repo → เลือก repo นี้
3. Railway อ่าน `package.json` แล้วรัน `npm start` ให้เอง (ไม่ต้องตั้ง `railway.json`)
4. ตั้ง Root Directory เป็น `/` (default)

## Deploy ขึ้น GitHub Pages (ทางเลือก ไม่ต้องใช้ Node)

1. ย้าย `public/index.html` ไปไว้ที่ root แล้วเปลี่ยนชื่อเป็น `index.html`
2. Settings → Pages → Source: branch `main`, folder `/root`

## ปรับแต่งง่าย ๆ

| อยากเปลี่ยน | ไปที่ |
|---|---|
| ชื่อแบรนด์ "แบ่งเบา" | ค้นหา `แบ่งเบา` ใน `index.html` |
| สีหลัก (ฟ้า) | ตัวแปร `--blue`, `--blue-deep` ในบล็อก `:root` ด้านบนของ CSS |
| ลิงก์ปุ่ม "แอดไลน์" | `href="#cta"` / `href="#"` ที่ปุ่มเขียว เปลี่ยนเป็น LINE OA URL จริง |
| ตัวเลขเริ่มต้นของเครื่องคิดกำไร | ค่า `value` ของ `<input type="range">` ในส่วน `#calc` |
| แชทตัวอย่างใน Hero | array `script` ในแท็ก `<script>` ท้ายไฟล์ |

## หมายเหตุ

ตัวเลข ฟีเจอร์ และข้อความเป็น demo สำหรับหน้า marketing — ยังไม่มี backend จริง
ส่วน "ดึงยอดเดลิเวอรี่อัตโนมัติ" ระบุไว้ว่าเป็นฟีเจอร์เฉพาะคนตามที่ตั้งใจ
