import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Theme color sets
export const themes = [
  {
    name: 'Default Blue',
    background: '#fff',
    primary: '#2563eb',
    secondary: '#60a5fa',
    accent: '#22c55e',
    danger: '#ef4444',
    text: '#23272f',
    card: '#f7fafc',
    border: '#e5e7eb',
    sidebar: '#fff',
    sidebarText: '#2563eb',
    appbar: '#2563eb',
    appbarText: '#fff',
    badgeBg: '#fb923c',
    badgeText: '#fff',
    footer: '#2563eb',
    footerText: '#fff',
  },
  {
    name: 'Emerald Green',
    background: '#fff',
    primary: '#059669',
    secondary: '#34d399',
    accent: '#2563eb',
    danger: '#ef4444',
    text: '#1e293b',
    card: '#f0fdf4',
    border: '#d1fae5',
    sidebar: '#fff',
    sidebarText: '#059669',
    appbar: '#059669',
    appbarText: '#fff',
    badgeBg: '#059669',
    badgeText: '#fff',
    footer: '#059669',
    footerText: '#fff',
  },
  {
    name: 'Rose Red',
    background: '#fff',
    primary: '#e11d48',
    secondary: '#f472b6',
    accent: '#2563eb',
    danger: '#b91c1c',
    text: '#23272f',
    card: '#fff1f2',
    border: '#fecdd3',
    sidebar: '#fff',
    sidebarText: '#e11d48',
    appbar: '#e11d48',
    appbarText: '#fff',
    badgeBg: '#e11d48',
    badgeText: '#fff',
    footer: '#e11d48',
    footerText: '#fff',
  },
  {
    name: 'Amber Gold',
    background: '#fff',
    primary: '#f59e42',
    secondary: '#fde68a',
    accent: '#2563eb',
    danger: '#ef4444',
    text: '#78350f',
    card: '#fff7ed',
    border: '#fed7aa',
    sidebar: '#fff',
    sidebarText: '#f59e42',
    appbar: '#f59e42',
    appbarText: '#fff',
    badgeBg: '#f59e42',
    badgeText: '#fff',
    footer: '#f59e42',
    footerText: '#fff',
  },
  {
    name: 'Purple Grape',
    background: '#fff',
    primary: '#7c3aed',
    secondary: '#c4b5fd',
    accent: '#22c55e',
    danger: '#ef4444',
    text: '#312e81',
    card: '#f3e8ff',
    border: '#ddd6fe',
    sidebar: '#fff',
    sidebarText: '#7c3aed',
    appbar: '#7c3aed',
    appbarText: '#fff',
    badgeBg: '#7c3aed',
    badgeText: '#fff',
    footer: '#7c3aed',
    footerText: '#fff',
  },
  {
    name: 'Slate Gray',
    background: '#fff',
    primary: '#64748b',
    secondary: '#cbd5e1',
    accent: '#2563eb',
    danger: '#ef4444',
    text: '#23272f',
    card: '#f1f5f9',
    border: '#e2e8f0',
    sidebar: '#fff',
    sidebarText: '#64748b',
    appbar: '#64748b',
    appbarText: '#fff',
    badgeBg: '#64748b',
    badgeText: '#fff',
    footer: '#64748b',
    footerText: '#fff',
  },
  {
    name: 'Teal Ocean',
    background: '#fff',
    primary: '#0d9488',
    secondary: '#5eead4',
    accent: '#2563eb',
    danger: '#ef4444',
    text: '#134e4a',
    card: '#f0fdfa',
    border: '#99f6e4',
    sidebar: '#fff',
    sidebarText: '#0d9488',
    appbar: '#0d9488',
    appbarText: '#fff',
    badgeBg: '#0d9488',
    badgeText: '#fff',
    footer: '#0d9488',
    footerText: '#fff',
  },
  {
    name: 'Orange Sunset',
    background: '#fff',
    primary: '#fb923c',
    secondary: '#fdba74',
    accent: '#2563eb',
    danger: '#ef4444',
    text: '#7c2d12',
    card: '#fff7ed',
    border: '#fed7aa',
    sidebar: '#fff',
    sidebarText: '#fb923c',
    appbar: '#fb923c',
    appbarText: '#fff',
    badgeBg: '#fb923c',
    badgeText: '#fff',
    footer: '#fb923c',
    footerText: '#fff',
  },
  {
    name: 'Pink Blossom',
    background: '#fff',
    primary: '#ec4899',
    secondary: '#f9a8d4',
    accent: '#2563eb',
    danger: '#ef4444',
    text: '#831843',
    card: '#fdf2f8',
    border: '#fbcfe8',
    sidebar: '#fff',
    sidebarText: '#ec4899',
    appbar: '#ec4899',
    appbarText: '#fff',
    badgeBg: '#ec4899',
    badgeText: '#fff',
    footer: '#ec4899',
    footerText: '#fff',
  },
  {
    name: 'Indigo Night',
    background: '#fff',
    primary: '#4338ca',
    secondary: '#818cf8',
    accent: '#22c55e',
    danger: '#ef4444',
    text: '#1e293b',
    card: '#eef2ff',
    border: '#c7d2fe',
    sidebar: '#fff',
    sidebarText: '#4338ca',
    appbar: '#4338ca',
    appbarText: '#fff',
    badgeBg: '#4338ca',
    badgeText: '#fff',
    footer: '#4338ca',
    footerText: '#fff',
  },
];

export type Theme = typeof themes[number];

interface ThemeContextProps {
  theme: Theme;
  setThemeIndex: (idx: number) => void;
  themeIndex: number;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = themes[themeIndex] || themes[0];

  // Apply theme as CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeIndex, themeIndex }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// ThemeSelector component for switching themes
export function ThemeSelector() {
  const { themeIndex, setThemeIndex } = useTheme();
  const [pendingIndex, setPendingIndex] = React.useState(themeIndex);

  // Sync pendingIndex if themeIndex changes from outside
  React.useEffect(() => {
    setPendingIndex(themeIndex);
  }, [themeIndex]);

  const handleSave = () => {
    setThemeIndex(pendingIndex);
  };

  return (
    <div style={{ margin: '8px 0' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        {themes.map((t, idx) => (
          <button
            key={t.name}
            onClick={() => setPendingIndex(idx)}
            style={{
              background: idx === pendingIndex ? t.primary : '#f3f4f6',
              color: idx === pendingIndex ? '#fff' : t.text,
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: '6px 14px',
              fontWeight: 600,
              cursor: 'pointer',
              outline: idx === pendingIndex ? '2px solid #2563eb' : 'none',
              transition: 'all 0.15s',
              opacity: idx === themeIndex ? 1 : 0.85,
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={pendingIndex === themeIndex}
        style={{
          background: pendingIndex === themeIndex ? '#e5e7eb' : themes[pendingIndex].primary,
          color: pendingIndex === themeIndex ? '#888' : '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '7px 22px',
          fontWeight: 700,
          cursor: pendingIndex === themeIndex ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        บันทึกธีม
      </button>
    </div>
  );
}
