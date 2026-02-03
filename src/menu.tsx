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
};

export const menuItems: MenuItem[] = [
  { key: 'home', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
  { key: 'signature', label: 'Signature', icon: <PencilIcon className="w-5 h-5" /> },
  { key: 'history', label: 'History', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
  { key: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
  { key: 'about', label: 'About', icon: <InformationCircleIcon className="w-5 h-5" /> },
];
