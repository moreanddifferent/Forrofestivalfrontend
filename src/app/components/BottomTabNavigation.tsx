import { Home, Calendar, Map, Bookmark } from 'lucide-react';

interface BottomTabNavigationProps {
  currentView: 'home' | 'calendar' | 'saved' | 'map';
  onNavigate: (view: 'home' | 'calendar' | 'saved' | 'map') => void;
  savedCount?: number;
}

export function BottomTabNavigation({ currentView, onNavigate, savedCount }: BottomTabNavigationProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { id: 'map' as const, label: 'Map', icon: Map },
    { id: 'saved' as const, label: 'Saved', icon: Bookmark },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          const showBadge = tab.id === 'saved' && savedCount !== undefined;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                isActive ? 'text-[#2F5BFF]' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 1.5} />
                {showBadge && (
                  <span className={`absolute -top-1 -right-2 min-w-[16px] h-[16px] text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 ${
                    savedCount && savedCount > 0
                      ? 'bg-[#2F5BFF] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {savedCount ?? 0}
                  </span>
                )}
              </div>
              <span className={`text-[11px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}