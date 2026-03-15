import { useState } from 'react';
import { CalendarDays, List, Bell, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { CalendarEvent } from './CalendarEvent';
import { MonthView } from './MonthView';
import { ListView } from './ListView';
import { CalendarFilterChips, CalendarFilters } from './CalendarFilterChips';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick: (festivalId: string) => void;
  onSetAlert?: (festivalId: string) => void;
  onSubscribeAlerts?: () => void;
  isSignedIn?: boolean;
  compareSet?: Set<string>;
  onToggleCompare?: (festivalId: string) => void;
}

export function CalendarView({ events, onEventClick, onSetAlert, onSubscribeAlerts, isSignedIn = false, compareSet, onToggleCompare }: CalendarViewProps) {
  const [mode, setMode] = useState<'month' | 'list'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState<CalendarFilters>({
    month: 'Any month',
    country: 'Any country',
    locationType: 'Any location',
    length: 'Any length',
  });
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Apply filters to events
  const filteredEvents = events.filter(event => {
    if (filters.month !== 'Any month') {
      const date = event.type === 'ticket_opening'
        ? new Date(event.data.opensAt)
        : new Date(event.data.startDate);
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });
      if (monthName !== filters.month) return false;
    }

    if (filters.country !== 'Any country') {
      if (event.data.country !== filters.country) return false;
    }

    return true;
  });

  return (
    <div className="space-y-3 md:space-y-5">
      {/* View mode toggle + subscribe entry */}
      <div className="flex items-center justify-between border-b border-border pb-2 md:pb-4 flex-wrap gap-2 md:gap-4 bg-background">
        <div>
          <div className="relative inline-block">
            <div
              className="absolute -left-1 -right-1 bottom-0.5 h-[3px] md:h-2.5 bg-[#FFD600] opacity-35 rounded-sm"
              style={{ transform: 'rotate(-0.3deg)' }}
            />
            <h1 className="text-lg md:text-3xl font-bold text-foreground leading-tight relative z-10">Calendar</h1>
          </div>
          <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 md:mt-1 leading-tight">
            Ticket openings & dates · <span className="md:hidden">Times in CET</span><span className="hidden md:inline">Track ticket openings and festival dates</span>
          </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3">
          {/* Subscribe to alerts */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-[#2F5BFF] border-[#2F5BFF]/30 hover:bg-[#2F5BFF] hover:text-white hidden md:flex"
            onClick={onSubscribeAlerts}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{isSignedIn ? 'Manage alerts' : 'Get ticket alerts'}</span>
          </Button>

          {/* View toggle */}
          <div className="flex gap-0.5 md:gap-1 p-0.5 md:p-1 bg-muted rounded-lg">
            <Button
              variant={mode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('month')}
              className={`gap-1 md:gap-2 h-7 md:h-9 px-2 md:px-3 text-[11px] md:text-sm ${mode === 'month' ? 'bg-[#2F5BFF] hover:bg-[#1A44E0] text-white' : ''}`}
            >
              <CalendarDays className="w-3 h-3 md:w-4 md:h-4" />
              <span>Month</span>
            </Button>
            <Button
              variant={mode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('list')}
              className={`gap-1 md:gap-2 h-7 md:h-9 px-2 md:px-3 text-[11px] md:text-sm ${mode === 'list' ? 'bg-[#2F5BFF] hover:bg-[#1A44E0] text-white' : ''}`}
            >
              <List className="w-3 h-3 md:w-4 md:h-4" />
              <span>List</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filter chips — with subtle background on desktop */}
      <div className="md:bg-muted/30 md:p-3 md:rounded-lg">
        <CalendarFilterChips
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      {/* Mobile: Subscribe entry point */}
      <div className="md:hidden">
        <button
          onClick={onSubscribeAlerts}
          className="w-full flex items-center gap-3 p-3 bg-[#2F5BFF]/5 border border-[#2F5BFF]/15 rounded-lg text-left"
        >
          <div className="w-8 h-8 bg-[#2F5BFF]/15 rounded-full flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-[#2F5BFF]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">{isSignedIn ? 'Manage your alerts' : 'Get ticket alerts'}</p>
            <p className="text-xs text-muted-foreground">Get notified when tickets open</p>
          </div>
        </button>
      </div>

      {/* Content */}
      <div>
        {mode === 'month' ? (
          <MonthView
            events={filteredEvents}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onEventClick={onEventClick}
          />
        ) : (
          <ListView
            events={filteredEvents}
            onEventClick={onEventClick}
            onSetAlert={onSetAlert}
            compareSet={compareSet}
            onToggleCompare={onToggleCompare}
          />
        )}
      </div>
    </div>
  );
}