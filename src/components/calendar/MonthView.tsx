import { useState } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Button } from '../ui/button';
import { CalendarEvent } from './CalendarEvent';

interface MonthViewProps {
  events: CalendarEvent[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onEventClick: (festivalId: string) => void;
}

export function MonthView({ events, currentDate, onDateChange, onEventClick }: MonthViewProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday = 0

  const prevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    onDateChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    onDateChange(newDate);
  };

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const ticketOpenings = events.filter(event => {
      if (event.type === 'ticket_opening') {
        return event.data.opensAt === dateStr;
      }
      return false;
    });

    const festivals = events.filter(event => {
      if (event.type === 'festival') {
        const start = new Date(event.data.startDate);
        const end = new Date(event.data.endDate);
        const current = new Date(year, month, day);
        return current >= start && current <= end;
      }
      return false;
    });

    return { ticketOpenings, festivals };
  };

  // Check if date is the start of a festival
  const isFestivalStart = (day: number, festival: CalendarEvent) => {
    if (festival.type !== 'festival') return false;
    const startDate = new Date(festival.data.startDate);
    return startDate.getDate() === day && 
           startDate.getMonth() === month && 
           startDate.getFullYear() === year;
  };

  const days = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-[100px]" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const { ticketOpenings, festivals } = getEventsForDate(day);
    const isToday = new Date().getDate() === day && 
                    new Date().getMonth() === month && 
                    new Date().getFullYear() === year;

    days.push(
      <div
        key={day}
        className={`min-h-[100px] p-2 border-r border-b border-border ${
          isToday ? 'bg-primary/5' : ''
        }`}
      >
        <div className={`text-sm mb-2 ${isToday ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
          {day}
        </div>
        
        <div className="space-y-1">
          {/* Ticket openings - MORE PROMINENT */}
          {ticketOpenings.map((event, idx) => {
            if (event.type === 'ticket_opening') {
              return (
                <button
                  key={`ticket-${idx}`}
                  onClick={() => onEventClick(event.data.festivalId)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-[#2F5BFF]/10 hover:bg-[#2F5BFF]/20 rounded-md transition-colors group">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2F5BFF] shrink-0 animate-pulse" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[#2F5BFF] truncate">
                        {event.data.opensTime}
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {event.data.festivalName}
                      </div>
                    </div>
                  </div>
                </button>
              );
            }
            return null;
          })}

          {/* Festival dates - SOFT, LESS PROMINENT */}
          {festivals.map((event, idx) => {
            if (event.type === 'festival' && isFestivalStart(day, event)) {
              return (
                <button
                  key={`festival-${idx}`}
                  onClick={() => onEventClick(event.data.festivalId)}
                  className="w-full text-left"
                >
                  <div className="px-2 py-1 bg-muted hover:bg-muted/80 rounded-md transition-colors">
                    <div className="text-[10px] font-medium text-foreground truncate">
                      {event.data.festivalName}
                    </div>
                    <div className="text-[9px] text-muted-foreground truncate">
                      {event.data.location}
                    </div>
                  </div>
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#2F5BFF] animate-pulse" />
          <span>Ticket opening</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 rounded bg-muted" />
          <span>Festival dates</span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border bg-muted/30">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div
              key={day}
              className="p-3 text-center text-xs font-medium text-muted-foreground border-r border-border last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
    </div>
  );
}