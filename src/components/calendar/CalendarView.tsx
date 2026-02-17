import { useState } from 'react';
import { CalendarDays, List } from 'lucide-react';
import { Button } from '../ui/button';
import { CalendarEvent } from './CalendarEvent';
import { MonthView } from './MonthView';
import { ListView } from './ListView';

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick: (festivalId: string) => void;
  onSetAlert?: (festivalId: string) => void;
}

export function CalendarView({ events, onEventClick, onSetAlert }: CalendarViewProps) {
  const [mode, setMode] = useState<'month' | 'list'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="space-y-6">
      {/* View mode toggle */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Calendar</h1>
          <p className="text-muted-foreground">
            Track ticket openings and festival dates
          </p>
        </div>
        
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={mode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('month')}
            className="gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Month</span>
          </Button>
          <Button
            variant={mode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMode('list')}
            className="gap-2"
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div>
        {mode === 'month' ? (
          <MonthView
            events={events}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onEventClick={onEventClick}
          />
        ) : (
          <ListView
            events={events}
            onEventClick={onEventClick}
            onSetAlert={onSetAlert}
          />
        )}
      </div>
    </div>
  );
}
