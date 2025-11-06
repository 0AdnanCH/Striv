import React, { useState } from 'react';
import { LayoutDashboard, Users, Settings, BarChart3, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../../utils/cn.util';

export interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface AdminSidebarProps {
  items?: SidebarItem[];
  onToggle?: (isOpen: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ items, onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = items || [
    { name: 'Main Management', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  return (
    <aside className={cn('h-screen flex flex-col transition-all duration-300 shadow-xl', isOpen ? 'w-64' : 'w-20', 'bg-admin-primary text-admin-bg')}>
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-admin-secondary">
        <h1 className={cn('text-xl font-bold tracking-wide transition-all duration-300', !isOpen && 'hidden')}>Admin Panel</h1>
        <button onClick={handleToggle} className="text-admin-bg hover:text-admin-accent transition">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 mt-4">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 px-6 py-3 text-admin-bg transition-colors',
                'hover:bg-admin-secondary/30 hover:text-admin-accent',
                isActive && 'bg-admin-secondary/30 text-admin-accent font-medium'
              )
            }
          >
            <Icon size={20} />
            {isOpen && <span className="text-sm font-medium">{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-6 border-t border-admin-secondary text-sm text-admin-secondary">{isOpen ? '© 2025 Striv Admin' : '©'}</div>
    </aside>
  );
};

export default AdminSidebar;