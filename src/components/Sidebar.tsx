import { menuItems } from './menu.tsx';

interface SidebarProps {
  current: string;
  onNavigate: (key: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ current, onNavigate, open, setOpen }: SidebarProps) {
  return (
    <>
      <aside className={`sidebar dashboard${open ? ' open' : ''}`}> 
        <div className="sidebar-header">
          <span className="sidebar-logo">STSS Sarabun</span>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">MENU</div>
          <nav className="sidebar-menu">
            {menuItems.map((item: any) => (
              <button
                key={item.key}
                className={`sidebar-menu-btn${current === item.key ? ' active' : ''}`}
                onClick={() => { onNavigate(item.key); }}
                style={{width: '100%', justifyContent: 'flex-start', paddingLeft: 24, paddingRight: 24, position: 'relative' }}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
                {item.badge && (
                  <span className={`sidebar-badge${item.badge.type ? ' ' + item.badge.type : ''}`}>{item.badge.value}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <span className="sidebar-footer-text">© 2026 STSS Sarabun</span>
        </div>
      </aside>
      {/* Overlay for mobile sidebar toggle */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
