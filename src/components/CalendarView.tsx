import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Ticket } from 'lucide-react';
import { Button } from './ui/button';
import { Festival } from '../types/festival';

interface CalendarViewProps {
  festivals: Festival[];
  onFestivalClick: (festival: Festival) => void;
}

type ViewMode = 'month' | 'list';

interface CalendarEvent {
  type: 'festival' | 'ticket-opening';
  festival: Festival;
  date: Date;
  endDate?: Date;
  lotName?: string;
  openingTime?: string;
}

export function CalendarView({ festivals, onFestivalClick }: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate calendar events from festivals and ticket lots
  const events: CalendarEvent[] = [];
  
  festivals.forEach(festival => {
    // Add festival date event
    const startDate = new Date(festival.startDate);
    const endDate = new Date(festival.endDate);
    events.push({
      type: 'festival',
      festival,
      date: startDate,
      endDate
    });

    // Add ticket opening events from all pass types
    festival.passTypes.forEach(passType => {
      passType.ticketEntries.forEach(entry => {
        if (entry.opensAt && (entry.status === 'opening_soon' || entry.status === 'open_now')) {
          const openingDate = new Date(entry.opensAt);
          events.push({
            type: 'ticket-opening',
            festival,
            date: openingDate,
            lotName: entry.lotName,
            openingTime: entry.opensTime
          });
        }
      });
    });
  });

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium">Timeline</h2>
            <p className="text-sm text-muted-foreground">All festivals and ticket openings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('month')}
              className="gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Month view</span>
            </Button>
          </div>
        </div>

        {/* List View */}
        <div className="space-y-8">
          {monthNames.map((month, monthIndex) => {
            const monthEvents = events
              .filter(e => e.date.getMonth() === monthIndex && e.date.getFullYear() === 2026)
              .sort((a, b) => a.date.getTime() - b.date.getTime());

            if (monthEvents.length === 0) return null;

            return (
              <div key={month} className="space-y-3">
                <h3 className="text-lg font-medium">{month} 2026</h3>
                <div className="space-y-2">
                  {monthEvents.map((event, idx) => (
                    <ListEventItem 
                      key={`${event.type}-${event.festival.id}-${idx}`}
                      event={event}
                      onClick={() => onFestivalClick(event.festival)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Month View
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  // Get events for current month
  const monthEvents = events.filter(e => 
    e.date.getMonth() === month && e.date.getFullYear() === year
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-medium">
            {monthNames[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode('list')}
          className="gap-2"
        >
          <List className="w-4 h-4" />
          <span>List view</span>
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm text-muted-foreground bg-muted/30">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            if (day === null) {
              return (
                <div 
                  key={`empty-${index}`} 
                  className="min-h-[120px] border-r border-b border-border bg-muted/10"
                />
              );
            }

            const currentDay = new Date(year, month, day);
            const dayEvents = monthEvents.filter(e => {
              if (e.type === 'festival' && e.endDate) {
                return currentDay >= e.date && currentDay <= e.endDate;
              }
              return e.date.getDate() === day;
            });

            return (
              <div 
                key={day}
                className="min-h-[120px] border-r border-b border-border p-2 hover:bg-muted/20 transition-colors"
              >
                <div className="text-sm mb-2 font-medium">{day}</div>
                <div className="space-y-1">
                  {dayEvents.map((event, idx) => (
                    <CalendarEventItem
                      key={`${event.type}-${event.festival.id}-${idx}`}
                      event={event}
                      onClick={() => onFestivalClick(event.festival)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-muted-foreground">Festival dates</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-muted-foreground">Ticket opening</span>
        </div>
      </div>
    </div>
  );
}

function CalendarEventItem({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  if (event.type === 'ticket-opening') {
    return (
      <button
        onClick={onClick}
        className="w-full text-left px-2 py-1 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded text-xs hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
      >
        <div className="flex items-center gap-1">
          <Ticket className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate text-blue-700 dark:text-blue-300">{event.festival.name}</span>
        </div>
        {event.openingTime && (
          <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-0.5">{event.openingTime}</div>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs hover:bg-primary/20 transition-colors"
    >
      <span className="truncate block">{event.festival.name}</span>
    </button>
  );
}

function ListEventItem({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  const formatDate = (date: Date, endDate?: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    if (endDate) {
      return `${date.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
    }
    return date.toLocaleDateString('en-US', { ...options, year: 'numeric' });
  };

  if (event.type === 'ticket-opening') {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors text-left"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-lg shrink-0">
          <Ticket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">TICKETS OPENING</span>
            {event.lotName && (
              <span className="text-xs text-blue-600 dark:text-blue-400">· {event.lotName}</span>
            )}
          </div>
          <h4 className="mb-1 truncate font-medium">{event.festival.name}</h4>
          <p className="text-sm text-muted-foreground">
            {formatDate(event.date)}
            {event.openingTime && ` · ${event.openingTime}`}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all text-left"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg shrink-0">
        <CalendarIcon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="mb-1 truncate font-medium">{event.festival.name}</h4>
        <p className="text-sm text-muted-foreground mb-1">
          {event.festival.location}, {event.festival.country}
        </p>
        <p className="text-sm text-muted-foreground">{formatDate(event.date, event.endDate)}</p>
      </div>
    </button>
  );
}