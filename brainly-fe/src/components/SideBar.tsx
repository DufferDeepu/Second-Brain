import React from 'react';
import { Twitter, FileText, Tags, Youtube, Link2} from 'lucide-react';
import { Logo } from '../icons/Logo';
import { SidebarItem } from './SidebarItems';

export const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('home');

  const menuItems = [
    { id: 'Tweets', icon: Twitter, label: 'Tweets' },
    { id: 'Videos', icon: Youtube, label: 'Videos' },
    { id: 'Documents', icon: FileText, label: 'Documents' },
    { id: 'Links', icon: Link2, label: 'Links' },
    { id: 'Tags', icon: Tags, label: 'Tags' },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
      <Logo />
      <div className="flex-1 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};