
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Camera, TrendingUp, PlayCircle, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
  fullScreen?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children,
  hideNavigation = false,
  fullScreen = false
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/pump', icon: TrendingUp, label: 'Pump' },
    { path: '/stories', icon: PlayCircle, label: 'Stories' },
    { path: '/', icon: Camera, label: 'Camera' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  // Check if we're on a chat conversation page
  const isConversationPage = currentPath.startsWith('/chat/');

  // If we're on a conversation page, we want to highlight the chat tab
  const getIsActive = (path: string) => {
    if (path === '/chat' && isConversationPage) return true;
    return currentPath === path;
  };

  return (
    <div className="relative flex flex-col h-screen max-h-screen w-full max-w-md mx-auto overflow-hidden bg-snap-dark">
      <main className={cn(
        "flex-1 overflow-auto scrollbar-none",
        fullScreen ? "fixed inset-0 z-50" : ""
      )}>
        {children}
      </main>
      
      {!hideNavigation && (
        <nav className="mt-auto w-full glass-morphism h-16 flex items-center justify-around bg-gray-900/50">
          {navItems.map((item) => {
            const isActive = getIsActive(item.path);
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center py-1 px-3", 
                  isActive ? "text-solana-purple" : "text-gray-400 hover:text-gray-300"
                )}
              >
                <IconComponent 
                  size={item.path === '/' ? 28 : 24} 
                  className={cn(
                    "transition-all",
                    item.path === '/' && "p-1 rounded-full bg-solana-purple text-white"
                  )} 
                  strokeWidth={item.path === '/' ? 1.5 : 2} 
                />
                <span className="text-xs mt-0.5">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default MobileLayout;
