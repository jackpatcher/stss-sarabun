# 🛠️ setup.md: Complete All-in-One Guide for "signwa"

ไฟล์นี้รวมทุกอย่างตั้งแต่การติดตั้ง การตั้งค่า PWA โค้ด TSX และขั้นตอนการ Deploy สำหรับแอปเซ็นชื่อบน iPad

---



## 1. การสร้างโปรเจกต์และติดตั้ง Dependencies (Installation)

### สร้างโปรเจกต์ใหม่ชื่อ `signwa` (ใช้ในโฟลเดอร์ว่างเท่านั้น)
```bash
npm create vite@latest signwa -- --template react-ts
cd signwa
```

### หรือถ้ามีโฟลเดอร์ signwa อยู่แล้ว ให้ข้ามขั้นตอนสร้างโปรเจกต์ แล้วติดตั้ง dependencies ดังนี้
```bash
# ติดตั้ง Dependencies สำหรับระบบเซ็นชื่อและจัดการข้อมูล
npm install react-signature-canvas @tanstack/react-query

# ติดตั้ง Dev Dependencies สำหรับ PWA และการ Deploy ขึ้น GitHub
npm install -D vite-plugin-pwa gh-pages @types/react-signature-canvas
```

> **หมายเหตุ:** หากใช้คำสั่งสร้างโปรเจกต์ใหม่ (npm create vite@latest ...) จะสร้างโฟลเดอร์และไฟล์ใหม่ทั้งหมดในชื่อ signwa กรุณาใช้ในโฟลเดอร์ว่างเท่านั้น


## 2. การตั้งค่า Vite & PWA (`vite.config.ts`)
คัดลอกโค้ดนี้ไปวางในไฟล์ `vite.config.ts` เพื่อเปิดโหมดแอปบน iPad:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'signwa - Signature App',
        short_name: 'signwa',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#007aff',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  base: '/signwa/' 
})
```


## 3. โค้ดแอปพลิเคชัน (`src/App.tsx`)
คัดลอกไปวางที่ `src/App.tsx` เพื่อสร้างระบบเซ็นชื่อพร้อม React Query:

```tsx
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

function SignwaApp() {
  const sigPad = useRef<SignatureCanvas | null>(null);
  
  const mutation = useMutation<void, Error, string>({
    mutationFn: async (base64Data: string) => {
      console.log("signwa saving:", base64Data);
      return new Promise((resolve) => setTimeout(resolve, 1500));
    },
    onSuccess: () => { 
      alert('signwa: บันทึกลายเซ็นเรียบร้อย!'); 
      sigPad.current?.clear(); 
    },
    onError: (err) => alert(`Error: ${err.message}`)
  });

  const handleSave = () => {
    if (sigPad.current?.isEmpty()) return alert("กรุณาเซ็นชื่อก่อนครับ");
    const data = sigPad.current?.getTrimmedCanvas().toDataURL('image/png');
    if (data) mutation.mutate(data);
  };

  return (
    <div className="container">
      <h1 className="logo-text">signwa</h1>
      <div className="canvas-wrapper">
        <SignatureCanvas 
          ref={(ref) => { sigPad.current = ref; }} 
          canvasProps={{ className: 'sigCanvas' }} 
        />
      </div>
      <div className="controls">
        <button className="btn-clear" onClick={() => sigPad.current?.clear()}>ล้างหน้าจอ</button>
        <button className="btn-save" onClick={handleSave} disabled={mutation.isPending}>
          {mutation.isPending ? 'กำลังบันทึก...' : 'บันทึกลายเซ็น'}
        </button>
      </div>
    </div>
  );
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignwaApp />
    </QueryClientProvider>
  );
}
```

## 4. สไตล์ชีทสำหรับ iPad (`src/App.css`)
คัดลอกไปวางที่ `src/App.css` เพื่อล็อคหน้าจอไม่ให้เลื่อนขณะเซ็น:

```css
:root { --primary: #007aff; }
body { margin: 0; background-color: #f2f2f7; font-family: -apple-system, sans-serif; overflow: hidden; }
.container { max-width: 800px; margin: 0 auto; padding: 40px 20px; text-align: center; }
.logo-text { color: var(--primary); font-size: 2.5rem; margin-bottom: 30px; font-weight: bold; }
.canvas-wrapper { 
  background: white; border-radius: 20px; overflow: hidden; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 30px; 
}
.sigCanvas { width: 100%; height: 450px; touch-action: none; cursor: crosshair; }
button { padding: 18px 40px; font-size: 1.1rem; border-radius: 14px; border: none; font-weight: 600; margin: 0 10px; transition: 0.2s; cursor: pointer; }
.btn-save { background-color: var(--primary); color: white; }
.btn-clear { background-color: #e5e5ea; color: #333; }
button:disabled { background-color: #d1d1d6; }
```

## 5. การตั้งค่า iOS และ Deployment (`index.html` & `package.json`)
เพิ่ม Meta Tag ใน `<head>` ของ `index.html`:

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="signwa">
<link rel="apple-touch-icon" href="/signwa/icons/icon-192.png">
```

เพิ่มคำสั่งใน `scripts` ของ `package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

## 6. ขั้นตอนสุดท้าย: การนำขึ้นออนไลน์ (Deploy)
รันคำสั่งเหล่านี้เพื่อส่งแอปไปที่ GitHub Pages:

```bash
git init
git add .
git commit -m "deploy signwa app"
git remote add origin https://github.com/YOUR_USERNAME/signwa.git
git push -u origin main
npm run deploy
```

---

💡 **ข้อคิดและข้อควรระวัง**
- **ข้อดี:** ประหยัดค่าใช้จ่ายมหาศาล, ใช้งาน Offline ได้, ประสบการณ์ Full Screen บน iPad
- **ข้อควรระวัง:** ระวังเรื่องความปลอดภัยของข้อมูล (PDPA) เมื่อเก็บลายเซ็น
- **เทคนิค:** บน iPad ให้กด Share > Add to Home Screen เพื่อรันโหมดแอปไร้ขอบ