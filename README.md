# 🖊️ signwa - iPad Signature PWA

**signwa** คือระบบเซ็นชื่อออนไลน์ระดับมืออาชีพที่ออกแบบมาเพื่อ iPad โดยเฉพาะ พัฒนาด้วย **React (TSX)**, **TanStack Query** และเทคโนโลยี **PWA** เพื่อให้ใช้งานได้ลื่นไหลเหมือนแอป Native และติดตั้งลงเครื่องได้ทันที

---

## 🚀 ฟีเจอร์ของ signwa (Main Features)
- **TypeScript (TSX):** โครงสร้างโค้ดที่ปลอดภัยและจัดการง่าย
- **PWA Standalone:** ติดตั้งลงหน้าจอ Home Screen ของ iPad ได้ แสดงผลเต็มจอ (No Browser UI)
- **High-Precision Ink:** รองรับ Apple Pencil และการสัมผัสด้วยนิ้วมืออย่างแม่นยำ
- **Data Synchronization:** ใช้ TanStack Query จัดการสถานะการบันทึกข้อมูลและระบบ Retry
- **Optimized for iPad:** ล็อคการเลื่อนหน้าจอ (Scroll) ขณะเซ็น เพื่อประสบการณ์การเขียนที่ดีที่สุด

---

## 📂 โครงสร้างโปรเจกต์ (Folder Tree)

```text
signwa/
├── public/
│   ├── icons/               # ไอคอนแอป signwa (192x192, 512x512)
│   └── manifest.webmanifest  # การตั้งค่า PWA (Name: signwa, Standalone)
├── src/
│   ├── api/                 # ฟังก์ชันสำหรับส่งข้อมูล (Axios/Fetch)
│   │   └── signatureApi.ts
│   ├── components/          # UI Components เช่น SignaturePad
│   ├── hooks/               # Custom Hooks (useSaveSignature.ts)
│   ├── App.tsx              # จุดรวม Logic และ React Query Provider
│   ├── App.css              # สไตล์สำหรับ iPad (No-scroll & Mobile Friendly)
│   ├── main.tsx             # Entry Point และการลงทะเบียน Service Worker
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts           # ตั้งค่า Vite + PWA Plugin (TypeScript)
├── package.json             # Scripts สำหรับ build และ deploy
└── README.md


## install
# 1. สร้างโปรเจกต์ด้วย Vite (เลือก TypeScript)
npm create vite@latest signwa -- --template react-ts
cd signwa

# 2. ติดตั้ง Library หลัก
npm install react-signature-canvas @tanstack/react-query

# 3. ติดตั้ง Library สำหรับ PWA และการ Deploy
npm install -D vite-plugin-pwa gh-pages

# 4. ติดตั้ง Type Definitions
npm install -D @types/react-signature-canvas

## sample app.tsx
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

function SignwaApp() {
  const sigPad = useRef<SignatureCanvas | null>(null);
  
  const mutation = useMutation<void, Error, string>({
    mutationFn: async (base64Data: string) => {
      // ตัวอย่าง: ส่งข้อมูลลายเซ็นไปที่ Backend
      console.log("signwa: Saving...", base64Data);
      return new Promise((resolve) => setTimeout(resolve, 1500));
    },
    onSuccess: () => {
      alert('signwa: บันทึกลายเซ็นสำเร็จ!');
      sigPad.current?.clear();
    },
    onError: (error) => alert(`Error: ${error.message}`)
  });

  const handleSave = () => {
    if (sigPad.current) {
      if (sigPad.current.isEmpty()) return alert("กรุณาเซ็นชื่อก่อนครับ");
      const data = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
      mutation.mutate(data);
    }
  };

  return (
    <div className="container">
      <h1>signwa</h1>
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

## App.css

.sigCanvas {
  width: 100%;
  height: 450px;
  background-color: #fff;
  touch-action: none; /* ป้องกันหน้าจอเลื่อนขณะใช้ปากกาหรือนิ้วเซ็น */
}

.canvas-wrapper {
  border: 2px solid #007aff;
  border-radius: 15px;
  overflow: hidden;
  margin: 25px 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
}

h1 { color: #007aff; font-family: sans-serif; }

button {
  padding: 15px 35px;
  font-size: 1.1rem;
  border-radius: 12px;
  margin: 10px;
  border: none;
  font-weight: bold;
}

.btn-save { background-color: #007aff; color: white; }
.btn-clear { background-color: #f2f2f7; color: #333; }


## config  vite.config.ts
base: '/signwa/'


---

## 💡 ข้อคิดและมุมมองจากโปรเจกต์ (Project Insights)

### ✨ ข้อดีของระบบ (Pros)
* **Cost Effective:** ประหยัดค่าใช้จ่ายได้มหาศาล เพราะไม่ต้องเสียค่าเช่าระบบเซ็นชื่อรายเดือน และไม่ต้องเสียค่าธรรมเนียม App Store ($99/ปี) เพราะใช้ GitHub Pages และ PWA
* **Seamless Experience:** การใช้ PWA ทำให้ผู้ใช้รู้สึกเหมือนใช้แอป Native จริงๆ บน iPad (ไม่มีแถบ URL มาเกะกะสายตา)
* **Data Reliability:** การนำ **TanStack Query** มาใช้ ช่วยให้ระบบมีการจัดการสถานะข้อมูลที่ดี (เช่น ถ้าเน็ตกระตุกขณะส่ง ระบบสามารถ Retry เองได้)
* **Zero Install:** ผู้ใช้ไม่ต้องโหลดแอปจาก Store แค่สแกน QR Code หรือเข้า URL ก็เริ่มเซ็นได้ทันที

### ⚠️ ข้อควรระวัง (Precautions & Limitations)
* **Legal Validity:** ลายเซ็นดิจิทัลที่เซ็นบนหน้าเว็บนี้ อาจต้องมีระบบอื่นเสริม (เช่น การเก็บ IP Address, Timestamp หรือการส่ง OTP) เพื่อให้มีผลทางกฎหมายที่สมบูรณ์ตาม พ.ร.บ. ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์
* **Data Privacy (PDPA):** เนื่องจากเป็นการเก็บลายเซ็น (ข้อมูลส่วนบุคคล) ควรระวังเรื่องการส่งข้อมูลผ่าน HTTP ปกติ แนะนำให้ใช้ HTTPS (ซึ่ง GitHub Pages มีให้) และต้องมีนโยบายความเป็นส่วนตัวที่ชัดเจน
* **Local Storage Limit:** PWA แม้จะทำงาน Offline ได้ แต่ Browser มีโควตาจำกัดในการเก็บข้อมูล หากมีข้อมูลค้างส่งเยอะเกินไปอาจหายได้
* **iOS Safari Versions:** แม้ PWA จะทำงานได้ดี แต่ Safari ใน iOS รุ่นเก่ามากๆ อาจจะแสดงผล Full Screen ไม่สมบูรณ์เท่ารุ่นปัจจุบัน

### 🧠 ข้อคิดสำหรับการพัฒนาต่อ (Future Thoughts)
* **Apple Pencil Pressure:** ในอนาคตสามารถพัฒนาให้รับแรงกด (Pressure) จากปากกา เพื่อให้เส้นหนักเบาดูเป็นธรรมชาติมากขึ้น
* **Vector Export:** ปัจจุบันบันทึกเป็น PNG (Bitmap) หากต้องการความคมชัดสูงสุดเมื่อขยายขนาด อาจลองศึกษาการ Export เป็นไฟล์ SVG (Vector)
* **PDF Integration:** ระบบจะสมบูรณ์มากหากเซ็นเสร็จแล้วนำไปวางทับบนไฟล์ PDF (Digital Signing) ได้ทันที
