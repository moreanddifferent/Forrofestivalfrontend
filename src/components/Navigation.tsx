import { Grid3x3, Calendar, CalendarDays, Map, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentView: 'home' | 'calendar' | 'plan' | 'map';
  onNavigate: (view: 'home' | 'calendar' | 'plan' | 'map') => void;
  planCount?: number;
  onFilterOpen?: () => void;
}

export function Navigation({ currentView, onNavigate, planCount, onFilterOpen }: NavigationProps) {
  return (
    <nav className="border-b border-gray-200 md:border-b-2 md:border-black bg-background sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0057FF] flex items-center justify-center group-hover:bg-[#003FCC] transition-colors">
              <span className="text-base md:text-xl font-black text-white">F</span>
            </div>
            <div>
              <h1 className="text-sm md:text-base font-black leading-tight tracking-tight">FORRÓ EUROPE</h1>
              <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground leading-tight uppercase tracking-wider hidden md:block">
                Festival guide
              </p>
            </div>
          </button>

          {/* Mobile: Filter Icon */}
          {currentView === 'home' && onFilterOpen && (
            <button
              onClick={onFilterOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 rounded-sm active:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Desktop: Navigation links */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant={currentView === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('home')}
              className="gap-2 font-bold"
            >
              <Grid3x3 className="w-4 h-4" />
              <span>Festivals</span>
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('calendar')}
              className="gap-2 font-bold"
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </Button>
            <Button
              variant={currentView === 'plan' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('plan')}
              className="gap-2 relative font-bold"
            >
              <CalendarDays className="w-4 h-4" />
              <span>My Plan</span>
              {planCount && planCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-[10px] font-black bg-[#F5FF00] text-black min-w-[20px] text-center">
                  {planCount}
                </span>
              )}
            </Button>
            <Button
              variant={currentView === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('map')}
              className="gap-2 font-bold"
            >
              <Map className="w-4 h-4" />
              <span>Map</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}