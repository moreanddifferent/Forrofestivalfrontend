import { Home, Calendar, Bookmark, Map, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentView: 'home' | 'calendar' | 'saved' | 'map';
  onNavigate: (view: 'home' | 'calendar' | 'saved' | 'map') => void;
  savedCount?: number;
  onFilterOpen?: () => void;
}

export function Navigation({ currentView, onNavigate, savedCount, onFilterOpen }: NavigationProps) {
  return (
    <nav className="border-b border-gray-200 bg-background sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2F5BFF] flex items-center justify-center rounded-sm group-hover:bg-[#1A44E0] transition-colors">
              <span className="text-base md:text-xl font-black text-white">F</span>
            </div>
            <div>
              <h1 className="text-sm md:text-base font-black leading-tight tracking-tight">FORRÓ EUROPE</h1>
              <p className="text-[9px] md:text-[10px] font-medium text-muted-foreground leading-tight uppercase tracking-wider hidden md:block">
                Festival guide
              </p>
            </div>
          </button>

          {/* Mobile: Filter Icon */}
          {currentView === 'home' && onFilterOpen && (
            <button
              onClick={onFilterOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg active:bg-gray-200 transition-colors"
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
              className={`gap-2 font-bold ${currentView === 'home' ? 'bg-[#2F5BFF] hover:bg-[#1A44E0] text-white' : ''}`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('calendar')}
              className={`gap-2 font-bold ${currentView === 'calendar' ? 'bg-[#2F5BFF] hover:bg-[#1A44E0] text-white' : ''}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </Button>
            <Button
              variant={currentView === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('map')}
              className={`gap-2 font-bold ${currentView === 'map' ? 'bg-[#2F5BFF] hover:bg-[#1A44E0] text-white' : ''}`}
            >
              <Map className="w-4 h-4" />
              <span>Map</span>
            </Button>
            <Button
              variant={currentView === 'saved' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('saved')}
              className={`gap-2 relative font-bold ${currentView === 'saved' ? 'bg-[#2F5BFF] hover:bg-[#1A44E0] text-white' : ''}`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
              {savedCount !== undefined && savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-[#FFD600] text-black min-w-[20px] text-center rounded-full">
                  {savedCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}