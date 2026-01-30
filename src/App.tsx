import { useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

function SignwaApp() {
  const sigPad = useRef<SignatureCanvas | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstall(false);
        setDeferredPrompt(null);
      }
    }
  };

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
      {showInstall && (
        <button className="btn-install" onClick={handleInstallClick} style={{marginBottom: 16}}>
          ติดตั้งแอปลงเครื่อง (Install App)
        </button>
      )}
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