import { TicketLotRow } from './TicketLotRow';

interface TicketLot {
  id: string;
  lotName: string;
  price: string;
  opensAt?: string;
  opensTime?: string;
  state: 'past' | 'current' | 'upcoming' | 'unknown';
  tierDescription?: string;
  quota?: string;
}

interface TicketTimelineBlockProps {
  lots: TicketLot[];
}

export function TicketTimelineBlock({ lots }: TicketTimelineBlockProps) {
  // Sort chronologically by opening date
  const sortedLots = [...lots].sort((a, b) => {
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

  if (lots.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No ticket information available yet</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline entries */}
      <div className="space-y-1">
        {sortedLots.map((lot, index) => (
          <TicketLotRow
            key={lot.id}
            lotName={lot.lotName}
            price={lot.price}
            opensAt={lot.opensAt}
            opensTime={lot.opensTime}
            state={lot.state}
            tierDescription={lot.tierDescription}
            quota={lot.quota}
            isLast={index === sortedLots.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
