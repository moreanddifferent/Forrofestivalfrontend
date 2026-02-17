import { Festival } from '../types/festival';

interface TicketBadgeProps {
  festival: Festival;
  compact?: boolean;
}

export function TicketBadge({ festival, compact = false }: TicketBadgeProps) {
  // Derive the most relevant information from the ticket timeline
  // Priority: current open lot > next upcoming lot > not announced
  
  let currentEntry = null;
  let nextUpcomingEntry = null;
  let hasNotAnnounced = false;
  
  for (const passType of festival.passTypes) {
    for (const entry of passType.ticketEntries) {
      // Find current open lot (highest priority)
      if (entry.status === 'open_now' && !currentEntry) {
        currentEntry = entry;
      }
      // Find next upcoming lot (chronologically earliest)
      if (entry.status === 'opening_soon' && entry.opensAt) {
        if (!nextUpcomingEntry || new Date(entry.opensAt) < new Date(nextUpcomingEntry.opensAt)) {
          nextUpcomingEntry = entry;
        }
      }
      // Check if any lot is not announced
      if (entry.status === 'not_announced') {
        hasNotAnnounced = true;
      }
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${month} ${day}`;
  };

  const formatPrice = (entry: any) => {
    if (entry.priceRange) {
      return `From ${entry.currency}${entry.priceRange.min}`;
    }
    if (entry.priceAmount !== undefined) {
      return `From ${entry.currency}${entry.priceAmount}`;
    }
    return null;
  };

  // Sold out: all entries are sold out
  if (festival.ticketStatus === 'sold-out') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm">
        <span>Sold out</span>
      </div>
    );
  }

  // Tickets open: show current lot with price
  if (currentEntry) {
    const priceText = formatPrice(currentEntry);
    
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-foreground border border-primary/20 rounded-md text-sm">
        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
        <span>Tickets open</span>
        {priceText && !compact && <span className="text-muted-foreground">· {priceText}</span>}
      </div>
    );
  }

  // Opening soon: show next upcoming lot
  if (nextUpcomingEntry && nextUpcomingEntry.opensAt) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/30 text-foreground border border-blue-200 dark:border-blue-900 rounded-md text-sm">
        <span>Opens {formatDate(nextUpcomingEntry.opensAt)}</span>
        {nextUpcomingEntry.opensTime && !compact && (
          <span className="text-muted-foreground">· {nextUpcomingEntry.opensTime}</span>
        )}
      </div>
    );
  }

  // Default: not announced
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/50 text-muted-foreground border border-border rounded-md text-sm">
      <span>Not announced</span>
    </div>
  );
}