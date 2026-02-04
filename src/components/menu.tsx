import React from 'react';
import {
  HomeIcon,
  PencilIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

export type MenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  badge?: { value: number; type: 'info' | 'danger' };
};

export const menuItems: MenuItem[] = [
  { key: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
  { key: 'signature', label: 'Signature', icon: <PencilIcon className="w-5 h-5" /> },
  { key: 'history', label: 'History', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
  { key: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
  { key: 'about', label: 'About', icon: <InformationCircleIcon className="w-5 h-5" /> },
  { key: 'notifications', label: 'Notifications', icon: <InformationCircleIcon className="w-5 h-5" />, badge: { value: 2, type: 'info' } },
  { key: 'typography', label: 'Typography', icon: <InformationCircleIcon className="w-5 h-5" />, badge: { value: 25, type: 'danger' } },
];
