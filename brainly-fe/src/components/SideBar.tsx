import React from 'react';
import { Twitter, FileText, Tags, Youtube, Link2, BrainCog} from 'lucide-react';
import { Logo } from '../icons/Logo';
import { SidebarItem } from './SidebarItems';
import { LogoutButton } from './LogoutButton';

export const Sidebar: React.FC<{ onItemClick: (type: string) => void; activeItem: string }> = ({ onItemClick, activeItem }) => {
  const menuItems = [
    { id: 'All Notes', icon: BrainCog, label: 'All Notes' },
    { id: 'Tweets', icon: Twitter, label: 'Tweets' },
    { id: 'Videos', icon: Youtube, label: 'Videos' },
    { id: 'Documents', icon: FileText, label: 'Documents' },
    { id: 'Links', icon: Link2, label: 'Links' },
    { id: 'Tags', icon: Tags, label: 'Tags' },
  ];
  

  return (
    <div className='flex flex-col justify-between h-screen w-64'>
      <div className="flex flex-col  bg-white border-r border-gray-200">
      <Logo />
      <div className="flex-1 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.id}
              onClick={() => onItemClick(item.id)}
            />
          ))}
        </nav>
      </div>
    </div>
    <div className="p-4">
      <LogoutButton />
    </div>
    </div>
  );
};
