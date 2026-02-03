
import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useMutation } from '@tanstack/react-query';
import '../App.css';

export default function Signature() {
  const sigPad = useRef<SignatureCanvas | null>(null);

    const [mouseButtonDown, setMouseButtonDown] = useState(false);

  const mutation = useMutation<void, Error, string>({
    mutationFn: async (base64Data: string) => {
      // mock save
      console.log('Saving signature data:', base64Data);
      return new Promise((resolve) => setTimeout(resolve, 1200));
    },
    onSuccess: () => {
      alert('บันทึกลายเซ็นเรียบร้อย!');
      sigPad.current?.clear();
    },
    onError: (err) => alert(`Error: ${err.message}`)
  });

  const handleSave = () => {
    if (sigPad.current?.isEmpty()) return alert('กรุณาเซ็นชื่อก่อนครับ');
    const data = sigPad.current?.getTrimmedCanvas().toDataURL('image/png');
    if (data) mutation.mutate(data);
  };

  return (
    <div className="signature-dashboard">
      <div className="signature-card">
        <div className="signature-card-header">
          <h2 className="signature-title">Signature</h2>
        </div>
        <div className="signature-card-body">
          <SignatureCanvas
            ref={(ref) => { sigPad.current = ref; }}
            canvasProps={{
              className: 'sigCanvas',
              style: {
                background: '#fff',
                borderRadius: '16px',
                border: '2px solid #e2e8f0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                touchAction: 'none',
                width: '100%',
                height: '220px',
                display: 'block',
              },
              onPointerDown: () => setMouseButtonDown(true),
              onPointerUp: () => setMouseButtonDown(false),
              onPointerMove: (e) => {
                if (!mouseButtonDown) {
                  e.preventDefault();
                  return false;
                }
              },
            }}
          />
        </div>
        <div className="signature-card-footer">
          <button className="btn-clear" onClick={() => sigPad.current?.clear()}>ล้างหน้าจอ</button>
          <button className="btn-save" onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? 'กำลังบันทึก...' : 'บันทึกลายเซ็น'}
          </button>
        </div>
      </div>
    </div>
  );
}
