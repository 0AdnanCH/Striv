import React from 'react';
import { User, KeyRound, LogOut, FileText } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn.util'; 

interface AccountSidebarProps {
  userEmail: string | undefined;
  onLogout: () => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({ 
  userEmail, 
  onLogout 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Profile',
      icon: <User size={18} />,
      path: '/client/profile'
    },
    {
      label: 'Reset Password',
      icon: <KeyRound size={18} />,
      path: '/client/change-password'
    },
    {
      label: 'Trainer Application',
      icon: <FileText size={18} />, 
      path: '/trainer/application-hub'
    }
  ];

  return (
    <aside className={cn(
      'hidden md:flex flex-col w-64 px-6 py-10 h-full', 
      'bg-white/40 backdrop-blur-xl border-r border-striv-muted/40 shadow-md',
      'overflow-y-auto'
    )}>
      {/* HEADER */}
      <div className="mb-12 mt-10">
        <h2 className="text-2xl font-bold text-striv-primary tracking-tight">Account</h2>
        <p className="text-sm text-gray-700 mt-1">{userEmail}</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200',
                isActive 
                  ? 'bg-striv-primary text-white shadow-md' 
                  : 'text-gray-800 hover:bg-striv-muted/30 hover:text-striv-primary'
              )}
            >
              <span className={cn(isActive ? 'text-white' : 'text-striv-secondary')}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto pt-10">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 
                   rounded-lg font-medium text-red-600
                   hover:bg-red-100 active:bg-red-200 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};