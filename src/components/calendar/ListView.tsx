import { Calendar, MapPin, Bell, ExternalLink, ChevronRight, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { CalendarEvent } from './CalendarEvent';
import { UnifiedTicketChip } from '../UnifiedTicketChip';

interface ListViewProps {
  events: CalendarEvent[];
  onEventClick: (festivalId: string) => void;
  onSetAlert?: (festivalId: string) => void;
  compareSet?: Set<string>;
  onToggleCompare?: (festivalId: string) => void;
}

export function ListView({ events, onEventClick, onSetAlert, compareSet, onToggleCompare }: ListViewProps) {
  // Sort events: ticket openings first (soonest first), then by date
  const sortedEvents = [...events].sort((a, b) => {
    if (a.type === 'ticket_opening' && b.type === 'festival') return -1;
    if (a.type === 'festival' && b.type === 'ticket_opening') return 1;

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

  const canCompare = !!onToggleCompare;

  return (
    <div className="space-y-6 md:space-y-8">
      {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
        <div key={monthYear} className="md:bg-muted/30 md:p-5 md:rounded-xl">
          {/* Month header — stronger spacing */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-2 md:pb-3 mb-3 md:mb-4 border-b-2 border-border md:relative md:bg-transparent md:backdrop-blur-none">
            <h3 className="text-base md:text-xl font-black tracking-tight">{monthYear}</h3>
          </div>

          {/* Mobile: Compact list */}
          <div className="md:hidden divide-y divide-border">
            {monthEvents.map((event, idx) => {
              const festivalId = event.data.festivalId;
              const isInCompare = compareSet?.has(festivalId) ?? false;

              if (event.type === 'ticket_opening') {
                const upcoming = isUpcoming(event.data.opensAt);
                const date = new Date(event.data.opensAt);
                
                return (
                  <div
                    key={`ticket-${idx}`}
                    className={`py-2 flex items-center gap-2 active:bg-gray-50 transition-colors ${isInCompare ? 'bg-[#2F5BFF]/5' : ''}`}
                  >
                    {/* Compare checkbox */}
                    {canCompare && (
                      <button
                        onClick={() => onToggleCompare(festivalId)}
                        className={`shrink-0 w-4 h-4 rounded flex items-center justify-center transition-colors ${
                          isInCompare
                            ? 'bg-[#2F5BFF] text-white'
                            : 'bg-white border border-border text-transparent hover:border-[#2F5BFF]'
                        }`}
                        title="Add to compare"
                      >
                        <BarChart3 className="w-2.5 h-2.5" />
                      </button>
                    )}

                    {/* Compact date for ticket openings */}
                    <div className="shrink-0 w-11 text-center relative" onClick={() => onEventClick(festivalId)}>
                      {upcoming && (
                        <div className="absolute left-0 top-0.5 bottom-0.5 w-[2px] rounded-full bg-[#FFD600]" />
                      )}
                      <div className={`text-[9px] font-bold uppercase tracking-wide leading-none ${upcoming ? 'text-[#2F5BFF]' : 'text-muted-foreground'}`}>
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className={`text-lg font-black leading-none mt-0.5 ${upcoming ? 'text-[#2F5BFF]' : 'text-foreground'}`}>
                        {date.getDate()}
                      </div>
                    </div>

                    {/* Festival info — 2 lines max */}
                    <div className="flex-1 min-w-0" onClick={() => onEventClick(festivalId)}>
                      <h4 className="font-bold text-[13px] leading-tight line-clamp-1">
                        {event.data.festivalName}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground leading-tight mt-0.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${upcoming ? 'bg-[#FFD600]/20 text-[#7A6500]' : 'bg-muted text-muted-foreground'}`}>
                          {event.data.lotName || 'Ticket'}
                        </span>
                        <span>·</span>
                        <span className="truncate">{event.data.location} · {event.data.opensTime}</span>
                      </div>
                    </div>

                    {/* Alert icon */}
                    {upcoming && onSetAlert && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSetAlert(festivalId);
                        }}
                        className="shrink-0 p-1.5 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition-colors"
                      >
                        <Bell className="w-3.5 h-3.5 text-[#2F5BFF]" />
                      </button>
                    )}
                  </div>
                );
              } else {
                const startDate = new Date(event.data.startDate);
                
                return (
                  <div
                    key={`festival-${idx}`}
                    className={`py-2 flex items-center gap-2 active:bg-gray-50 transition-colors ${isInCompare ? 'bg-[#2F5BFF]/5' : ''}`}
                  >
                    {/* Compare checkbox */}
                    {canCompare && (
                      <button
                        onClick={() => onToggleCompare(festivalId)}
                        className={`shrink-0 w-4 h-4 rounded flex items-center justify-center transition-colors ${
                          isInCompare
                            ? 'bg-[#2F5BFF] text-white'
                            : 'bg-white border border-border text-transparent hover:border-[#2F5BFF]'
                        }`}
                        title="Add to compare"
                      >
                        <BarChart3 className="w-2.5 h-2.5" />
                      </button>
                    )}

                    {/* Neutral date for festival dates */}
                    <div className="shrink-0 w-11 text-center" onClick={() => onEventClick(festivalId)}>
                      <div className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground leading-none">
                        {startDate.toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-lg font-black text-foreground leading-none mt-0.5">
                        {startDate.getDate()}
                      </div>
                    </div>

                    {/* Festival info — 2 lines max */}
                    <div className="flex-1 min-w-0" onClick={() => onEventClick(festivalId)}>
                      <h4 className="font-bold text-[13px] leading-tight line-clamp-1">
                        {event.data.festivalName}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground leading-tight mt-0.5">
                        <span className="px-1.5 py-0.5 bg-muted rounded text-[9px] font-bold uppercase">
                          Festival
                        </span>
                        <span>·</span>
                        <span className="truncate">{event.data.location} · {formatDateRange(event.data.startDate, event.data.endDate)}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Desktop: Card layout */}
          <div className="hidden md:block md:space-y-3">
            {monthEvents.map((event, idx) => {
              const festivalId = event.data.festivalId;
              const isInCompare = compareSet?.has(festivalId) ?? false;

              if (event.type === 'ticket_opening') {
                const upcoming = isUpcoming(event.data.opensAt);
                
                return (
                  <div
                    key={`ticket-${idx}`}
                    className={`group border rounded-xl p-5 transition-all hover:shadow-md relative overflow-hidden ${
                      isInCompare
                        ? 'border-[#2F5BFF] ring-1 ring-[#2F5BFF]/20 bg-white'
                        : upcoming 
                          ? 'border-border bg-white hover:border-[#2F5BFF]/30' 
                          : 'border-border bg-background hover:border-border'
                    }`}
                  >
                    {/* Yellow left bar for ticket openings */}
                    {upcoming && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FFD600] rounded-l-xl" />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Compare toggle */}
                      {canCompare && (
                        <button
                          onClick={() => onToggleCompare(festivalId)}
                          className={`shrink-0 w-8 h-8 mt-2 rounded-lg flex items-center justify-center transition-colors ${
                            isInCompare
                              ? 'bg-[#2F5BFF] text-white'
                              : 'bg-white border border-border text-muted-foreground hover:border-[#2F5BFF] hover:text-[#2F5BFF]'
                          }`}
                          title={isInCompare ? 'Remove from compare' : 'Add to compare'}
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Icon indicator — subtle, not heavy blue bg */}
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        upcoming ? 'bg-[#FFD600]/15 border border-[#FFD600]/30' : 'bg-muted'
                      }`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          upcoming ? 'bg-[#2F5BFF] animate-pulse' : 'bg-muted-foreground/50'
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${
                            upcoming 
                              ? 'bg-[#2F5BFF]/10 text-[#2F5BFF]' 
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

                        <button
                          onClick={() => onEventClick(festivalId)}
                          className="block text-left group-hover:text-[#2F5BFF] transition-colors"
                        >
                          <h4 className="font-bold text-base">
                            {event.data.festivalName}
                          </h4>
                        </button>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {new Date(event.data.opensAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {event.data.opensTime}
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
                            onClick={() => onSetAlert(festivalId)}
                            className="gap-2"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            <span>Alert</span>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEventClick(festivalId)}
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
                return (
                  <div
                    key={`festival-${idx}`}
                    className={`group border rounded-xl p-5 bg-background hover:shadow-md transition-all ${
                      isInCompare
                        ? 'border-[#2F5BFF] ring-1 ring-[#2F5BFF]/20 bg-[#2F5BFF]/5'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Compare toggle */}
                      {canCompare && (
                        <button
                          onClick={() => onToggleCompare(festivalId)}
                          className={`shrink-0 w-8 h-8 mt-2 rounded-lg flex items-center justify-center transition-colors ${
                            isInCompare
                              ? 'bg-[#2F5BFF] text-white'
                              : 'bg-white border border-border text-muted-foreground hover:border-[#2F5BFF] hover:text-[#2F5BFF]'
                          }`}
                          title={isInCompare ? 'Remove from compare' : 'Add to compare'}
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                      )}

                      <div className="shrink-0 w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                          Festival Dates
                        </span>

                        <button
                          onClick={() => onEventClick(festivalId)}
                          className="block text-left group-hover:text-[#2F5BFF] transition-colors"
                        >
                          <h4 className="font-bold text-base">
                            {event.data.festivalName}
                          </h4>
                        </button>

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

                      <div className="shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEventClick(festivalId)}
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