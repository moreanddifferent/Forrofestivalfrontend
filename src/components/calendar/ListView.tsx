import { Calendar, MapPin, Bell, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { CalendarEvent } from './CalendarEvent';

interface ListViewProps {
  events: CalendarEvent[];
  onEventClick: (festivalId: string) => void;
  onSetAlert?: (festivalId: string) => void;
}

export function ListView({ events, onEventClick, onSetAlert }: ListViewProps) {
  // Sort events: ticket openings first, then by date
  const sortedEvents = [...events].sort((a, b) => {
    // Ticket openings come first
    if (a.type === 'ticket_opening' && b.type === 'festival') return -1;
    if (a.type === 'festival' && b.type === 'ticket_opening') return 1;

    // Then sort by date
    const dateA = a.type === 'ticket_opening' ? new Date(a.data.opensAt) : new Date(a.data.startDate);
    const dateB = b.type === 'ticket_opening' ? new Date(b.data.opensAt) : new Date(b.data.startDate);
    
    return dateA.getTime() - dateB.getTime();
  });

  // Group events by month
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const date = event.type === 'ticket_opening' 
      ? new Date(event.data.opensAt)
      : new Date(event.data.startDate);
    
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const formatDate = (dateStr: string, type: 'ticket_opening' | 'festival') => {
    const date = new Date(dateStr);
    if (type === 'ticket_opening') {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric' 
      });
    }
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const startStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `${startStr} – ${endStr}`;
  };

  const isUpcoming = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    return date >= now;
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear} className="space-y-2 md:space-y-4">
          {/* Month header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-2 md:pb-3 border-b border-border">
            <h3 className="text-base md:text-lg font-bold md:font-semibold">{monthYear}</h3>
          </div>

          {/* Mobile: Compact list */}
          <div className="md:hidden divide-y divide-border">
            {monthEvents.map((event, idx) => {
              if (event.type === 'ticket_opening') {
                const upcoming = isUpcoming(event.data.opensAt);
                const date = new Date(event.data.opensAt);
                
                return (
                  <div
                    key={`ticket-${idx}`}
                    onClick={() => onEventClick(event.data.festivalId)}
                    className="py-3 flex items-center gap-3 active:bg-gray-50 transition-colors"
                  >
                    {/* Date left */}
                    <div className="shrink-0 w-14 text-center">
                      <div className={`text-[10px] font-bold uppercase tracking-wide ${upcoming ? 'text-[#0057FF]' : 'text-muted-foreground'}`}>
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className={`text-xl font-black ${upcoming ? 'text-[#0057FF]' : 'text-foreground'}`}>
                        {date.getDate()}
                      </div>
                    </div>

                    {/* Festival info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wide ${upcoming ? 'text-[#0057FF]' : 'text-muted-foreground'}`}>
                          Tickets open
                        </span>
                        {event.data.lotName && (
                          <span className="text-[10px] text-muted-foreground">· {event.data.lotName}</span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm leading-tight line-clamp-1 mb-0.5">
                        {event.data.festivalName}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {event.data.location} · {event.data.opensTime}
                      </p>
                    </div>

                    {/* Alert icon + chevron */}
                    <div className="shrink-0 flex items-center gap-2">
                      {upcoming && onSetAlert && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSetAlert(event.data.festivalId);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-sm active:bg-gray-200 transition-colors"
                        >
                          <Bell className="w-4 h-4 text-[#0057FF]" />
                        </button>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              } else {
                const startDate = new Date(event.data.startDate);
                
                return (
                  <div
                    key={`festival-${idx}`}
                    onClick={() => onEventClick(event.data.festivalId)}
                    className="py-3 flex items-center gap-3 active:bg-gray-50 transition-colors"
                  >
                    {/* Date left */}
                    <div className="shrink-0 w-14 text-center">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                        {startDate.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-xl font-black text-foreground">
                        {startDate.getDate()}
                      </div>
                    </div>

                    {/* Festival info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-0.5">
                        Festival
                      </div>
                      <h4 className="font-bold text-sm leading-tight line-clamp-1 mb-0.5">
                        {event.data.festivalName}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {event.data.location} · {formatDateRange(event.data.startDate, event.data.endDate)}
                      </p>
                    </div>

                    {/* Chevron */}
                    <div className="shrink-0">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Desktop: Card layout */}
          <div className="hidden md:block md:space-y-3">
            {monthEvents.map((event, idx) => {
              if (event.type === 'ticket_opening') {
                const upcoming = isUpcoming(event.data.opensAt);
                
                return (
                  <div
                    key={`ticket-${idx}`}
                    className={`group border rounded-xl p-5 transition-all hover:shadow-md ${
                      upcoming 
                        ? 'border-primary/30 bg-primary/5 hover:border-primary/50' 
                        : 'border-border bg-background hover:border-border'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon indicator - MORE PROMINENT */}
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        upcoming ? 'bg-primary/20' : 'bg-muted'
                      }`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          upcoming ? 'bg-primary animate-pulse' : 'bg-muted-foreground/50'
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Type badge */}
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${
                            upcoming 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            Ticket Opening
                          </span>
                          {event.data.lotName && (
                            <span className="text-xs text-muted-foreground">
                              {event.data.lotName}
                            </span>
                          )}
                        </div>

                        {/* Festival name */}
                        <button
                          onClick={() => onEventClick(event.data.festivalId)}
                          className="block text-left group-hover:text-primary transition-colors"
                        >
                          <h4 className="font-semibold text-base">
                            {event.data.festivalName}
                          </h4>
                        </button>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {formatDate(event.data.opensAt, 'ticket_opening')} · {event.data.opensTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{event.data.location}, {event.data.country}</span>
                          </div>
                          {event.data.price && (
                            <span className="font-medium text-foreground">
                              {event.data.price}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex gap-2">
                        {upcoming && onSetAlert && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSetAlert(event.data.festivalId)}
                            className="gap-2"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            <span>Alert</span>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEventClick(event.data.festivalId)}
                          className="gap-2"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Festival event - LESS PROMINENT
                return (
                  <div
                    key={`festival-${idx}`}
                    className="group border border-border rounded-xl p-5 bg-background hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon indicator - subtle */}
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Type badge */}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                          Festival Dates
                        </span>

                        {/* Festival name */}
                        <button
                          onClick={() => onEventClick(event.data.festivalId)}
                          className="block text-left group-hover:text-primary transition-colors"
                        >
                          <h4 className="font-semibold text-base">
                            {event.data.festivalName}
                          </h4>
                        </button>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDateRange(event.data.startDate, event.data.endDate)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{event.data.location}, {event.data.country}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEventClick(event.data.festivalId)}
                          className="gap-2"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}

      {sortedEvents.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No events found for the selected filters</p>
        </div>
      )}
    </div>
  );
}