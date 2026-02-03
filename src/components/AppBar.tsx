
interface AppBarProps {
  onSidebarOpen: () => void;
}

export default function AppBar({ onSidebarOpen }: AppBarProps) {
  return (
    <div className="dashboard-appbar">
      <button className="sidebar-toggle" onClick={onSidebarOpen}>
        <span style={{fontSize: '2.2rem', color: '#3182ce'}}>☰</span>
      </button>
      <span className="dashboard-title">STSS Sarabun</span>
      <div className="appbar-actions">
 
 
        <button
          className="appbar-icon p-0 border-2 border-blue-400 hover:border-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-full overflow-hidden shadow-md transition-all duration-150 w-12 h-12 flex items-center justify-center"
          title="Profile"
        >
          <span className="appbar-avatar w-12 h-12 bg-gradient-to-br from-blue-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold select-none rounded-full">
            S
          </span>
        </button>
      </div>
    </div>
  );
}
