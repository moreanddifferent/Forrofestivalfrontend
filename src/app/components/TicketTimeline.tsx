import { useState } from 'react';
import { Clock, ExternalLink, Bell } from 'lucide-react';
import { PassType, TicketEntry } from '../types/festival';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TicketTimelineProps {
  passTypes: PassType[];
}

export function TicketTimeline({ passTypes }: TicketTimelineProps) {
  const [selectedPassType, setSelectedPassType] = useState(passTypes[0]?.id || '');

  if (passTypes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No ticket information available yet</p>
      </div>
    );
  }

  // Check if any pass has future openings for alert button
  const hasFutureOpenings = passTypes.some(passType =>
    passType.ticketEntries.some(entry => entry.status === 'opening_soon' && entry.opensAt)
  );

  return (
    <div className="space-y-4">
      {/* Alert button for future openings */}
      {hasFutureOpenings && (
        <Button variant="outline" size="sm" className="w-full gap-2">
          <Bell className="w-4 h-4" />
          <span>Follow next opening</span>
        </Button>
      )}

      {/* Pass type tabs */}
      {passTypes.length === 1 ? (
        <div className="space-y-4">
          {passTypes[0].description && (
            <p className="text-sm text-muted-foreground">{passTypes[0].description}</p>
          )}
          <TicketEntryTimeline entries={passTypes[0].ticketEntries} />
        </div>
      ) : (
        <Tabs value={selectedPassType} onValueChange={setSelectedPassType}>
          <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${passTypes.length}, 1fr)` }}>
            {passTypes.map(passType => (
              <TabsTrigger key={passType.id} value={passType.id} className="text-sm">
                {passType.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {passTypes.map(passType => (
            <TabsContent key={passType.id} value={passType.id} className="mt-4 space-y-4">
              {passType.description && (
                <p className="text-sm text-muted-foreground">{passType.description}</p>
              )}
              <TicketEntryTimeline entries={passType.ticketEntries} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

function TicketEntryTimeline({ entries }: { entries: TicketEntry[] }) {
  // Sort chronologically by opening date (past to future)
  // Entries without dates go to the end
  const sortedEntries = [...entries].sort((a, b) => {
    // If both have dates, sort chronologically
    if (a.opensAt && b.opensAt) {
      return new Date(a.opensAt).getTime() - new Date(b.opensAt).getTime();
    }
    // Entries with dates come before entries without dates
    if (a.opensAt && !b.opensAt) return -1;
    if (!a.opensAt && b.opensAt) return 1;
    // Both without dates, maintain order
    return 0;
  });

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-8 bottom-8 w-px bg-border" />
      
      {/* Timeline entries */}
      <div className="space-y-1">
        {sortedEntries.map((entry, index) => (
          <TimelineEntry 
            key={entry.id} 
            entry={entry}
            isLast={index === sortedEntries.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({ entry, isLast }: { entry: TicketEntry; isLast: boolean }) {
  const formatDate = (dateStr: string, timeStr?: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    if (timeStr) {
      return `${month} ${day}, ${year} · ${timeStr}`;
    }
    return `${month} ${day}, ${year}`;
  };

  const formatPrice = () => {
    if (entry.priceRange) {
      return `${entry.currency}${entry.priceRange.min} - ${entry.currency}${entry.priceRange.max}`;
    }
    if (entry.priceAmount !== undefined) {
      return `${entry.currency}${entry.priceAmount}`;
    }
    return null;
  };

  // Visual styling based on status
  const isCurrentLot = entry.status === 'open_now';
  const isPastLot = entry.status === 'sold_out';
  const isUpcomingLot = entry.status === 'opening_soon';
  const isUnknownLot = entry.status === 'not_announced';

  return (
    <div className="relative flex gap-4 group">
      {/* Timeline dot */}
      <div className="relative flex flex-col items-center pt-6 z-10">
        <div
          className={`w-[22px] h-[22px] rounded-full border-2 transition-all ${
            isCurrentLot
              ? 'bg-primary border-primary shadow-md shadow-primary/30'
              : isPastLot
              ? 'bg-muted border-border'
              : isUpcomingLot
              ? 'bg-background border-blue-500'
              : 'bg-background border-border border-dashed'
          }`}
        >
          {isCurrentLot && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Content card */}
      <div className={`flex-1 mb-4`}>
        <div
          className={`p-5 rounded-xl border transition-all ${
            isCurrentLot
              ? 'bg-primary/5 border-primary/30 shadow-lg'
              : isPastLot
              ? 'bg-muted/30 border-border opacity-60'
              : isUpcomingLot
              ? 'bg-background border-border hover:border-primary/30'
              : 'bg-muted/20 border-border border-dashed'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium mb-1">{entry.lotName}</h4>
              {entry.tierDescription && (
                <p className="text-sm text-muted-foreground">{entry.tierDescription}</p>
              )}
            </div>
            
            {formatPrice() && (
              <div className="text-right shrink-0">
                <div className={`font-medium ${isCurrentLot ? 'text-lg' : ''}`}>
                  {formatPrice()}
                </div>
              </div>
            )}
          </div>

          {/* Opening date/time */}
          {entry.opensAt ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4" />
              <span>
                {isPastLot ? 'Opened' : isCurrentLot ? 'Opened' : 'Opens'}{' '}
                {formatDate(entry.opensAt, entry.opensTime)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4" />
              <span>Opening date not announced</span>
            </div>
          )}

          {/* Quota info */}
          {entry.quota && !isPastLot && (
            <div className="text-sm text-muted-foreground mb-3">
              {entry.quota}
            </div>
          )}

          {/* Status label for past lots */}
          {isPastLot && (
            <div className="text-sm text-muted-foreground mb-3">
              Sold out
            </div>
          )}

          {/* CTA for current lot */}
          {isCurrentLot && entry.purchaseLink && (
            <Button size="default" className="w-full gap-2 mt-1" asChild>
              <a href={entry.purchaseLink} target="_blank" rel="noopener noreferrer">
                <span>Buy tickets now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}

          {/* Catalog entries (always available) */}
          {entry.isCatalogEntry && entry.purchaseLink && !isPastLot && (
            <Button size="default" variant="outline" className="w-full gap-2 mt-1" asChild>
              <a href={entry.purchaseLink} target="_blank" rel="noopener noreferrer">
                <span>Contribute</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}

          {/* Reminder for upcoming lot */}
          {isUpcomingLot && entry.opensAt && (
            <Button size="sm" variant="outline" className="w-full gap-2 mt-1">
              <Bell className="w-4 h-4" />
              <span>Remind me</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
