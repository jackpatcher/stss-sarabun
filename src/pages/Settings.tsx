import { ThemeSelector } from '../components/theme';

export default function Settings() {
  return (
    <div className="content-card">
      <h2>Settings</h2>
      <p>ตั้งค่าแอปพลิเคชัน</p>
      <ThemeSelector />
    </div>
  );
}
