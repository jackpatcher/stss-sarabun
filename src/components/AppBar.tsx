interface AppBarProps {
  onSidebarOpen: () => void;
}

export default function AppBar({ onSidebarOpen }: AppBarProps) {
  return (
    <div className="dashboard-appbar">
      <button className="sidebar-toggle compact" onClick={onSidebarOpen}>
        <span style={{fontSize: '1.35rem', color: '#2563eb', lineHeight: 1}}>☰</span>
      </button>
      <span className="dashboard-title">STSS Sarabun</span>
      <div className="appbar-actions">
 
 
        <button
          className="appbar-icon p-0 border-2 border-blue-400 hover:border-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-full overflow-hidden shadow-md transition-all duration-150 w-12 h-12 flex items-center justify-center bg-white"
          title="Profile"
        >
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=STSS&backgroundType=gradientLinear&backgroundColor=6fa8dc,3ad29f"
            alt="Profile"
            className="w-12 h-12 object-cover rounded-full border-none select-none"
            draggable="false"
          />
        </button>
      </div>
    </div>
  );
}
