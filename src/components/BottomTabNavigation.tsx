import { Grid3x3, Calendar, CalendarDays, Map } from 'lucide-react';

interface BottomTabNavigationProps {
  currentView: 'home' | 'calendar' | 'plan' | 'map';
  onNavigate: (view: 'home' | 'calendar' | 'plan' | 'map') => void;
  planCount?: number;
}

export function BottomTabNavigation({ currentView, onNavigate, planCount }: BottomTabNavigationProps) {
  const tabs = [
    { id: 'home' as const, label: 'Festivals', icon: Grid3x3 },
    { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { id: 'plan' as const, label: 'My Plan', icon: CalendarDays },
    { id: 'map' as const, label: 'Map', icon: Map },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          const showBadge = tab.id === 'plan' && planCount && planCount > 0;
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                isActive ? 'text-[#0057FF]' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#0057FF] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {planCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-black' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}