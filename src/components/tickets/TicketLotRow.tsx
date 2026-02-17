import { Clock } from 'lucide-react';

type LotState = 'past' | 'current' | 'upcoming' | 'unknown';

interface TicketLotRowProps {
  lotName: string; // "1st Lot", "Early Bird", "Standard Tier"
  price: string; // "€95" or "€120-€150"
  opensAt?: string; // ISO date string
  opensTime?: string; // "12:00 CET"
  state: LotState;
  tierDescription?: string; // "Includes accommodation"
  quota?: string; // "45 remaining" or "Limited to 50 spots"
  isLast?: boolean; // For timeline styling
}

export function TicketLotRow({
  lotName,
  price,
  opensAt,
  opensTime,
  state,
  tierDescription,
  quota,
  isLast = false,
}: TicketLotRowProps) {
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

  const getDateLabel = () => {
    if (!opensAt) {
      return 'Opening date not announced';
    }
    
    switch (state) {
      case 'past':
        return `Opened ${formatDate(opensAt, opensTime)}`;
      case 'current':
        return `Opened ${formatDate(opensAt, opensTime)}`;
      case 'upcoming':
        return `Opens ${formatDate(opensAt, opensTime)}`;
      default:
        return `Opens ${formatDate(opensAt, opensTime)}`;
    }
  };

  // Visual styling based on state
  const getDotStyle = () => {
    switch (state) {
      case 'current':
        return 'bg-primary border-primary shadow-md shadow-primary/30';
      case 'past':
        return 'bg-muted border-border';
      case 'upcoming':
        return 'bg-background border-blue-500';
      case 'unknown':
        return 'bg-background border-border border-dashed';
    }
  };

  const getCardStyle = () => {
    switch (state) {
      case 'current':
        return 'bg-primary/5 border-primary/30 shadow-lg';
      case 'past':
        return 'bg-muted/30 border-border opacity-60';
      case 'upcoming':
        return 'bg-background border-border hover:border-primary/30';
      case 'unknown':
        return 'bg-muted/20 border-border border-dashed';
    }
  };

  return (
    <div className="relative flex gap-4">
      {/* Timeline dot */}
      <div className="relative flex flex-col items-center pt-6 z-10">
        <div
          className={`w-[22px] h-[22px] rounded-full border-2 transition-all ${getDotStyle()}`}
        >
          {state === 'current' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
            </div>
          )}
        </div>
        
        {/* Timeline line continuation */}
        {!isLast && (
          <div className="w-px h-full bg-border mt-1" />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 mb-4">
        <div className={`p-5 rounded-xl border transition-all ${getCardStyle()}`}>
          {/* Header: Name and Price */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium mb-1">{lotName}</h4>
              {tierDescription && (
                <p className="text-sm text-muted-foreground">{tierDescription}</p>
              )}
            </div>
            
            <div className="text-right shrink-0">
              <div className={`font-medium ${state === 'current' ? 'text-lg' : ''}`}>
                {price}
              </div>
            </div>
          </div>

          {/* Opening date/time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="w-4 h-4" />
            <span>{getDateLabel()}</span>
          </div>

          {/* Quota info */}
          {quota && state !== 'past' && (
            <div className="text-sm text-muted-foreground">
              {quota}
            </div>
          )}

          {/* Sold out label for past lots */}
          {state === 'past' && (
            <div className="text-sm text-muted-foreground mt-1">
              Sold out
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
