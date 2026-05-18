import { Clock } from 'lucide-react';

type BadgeVariant = 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';

interface TicketStatusBadgeProps {
  variant: BadgeVariant;
  opensAt?: string;
  opensTime?: string;
  price?: string;
  compact?: boolean;
}

export function TicketStatusBadge({ 
  variant, 
  opensAt, 
  opensTime, 
  price,
  compact = false 
}: TicketStatusBadgeProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${month} ${day}`;
  };

  switch (variant) {
    case 'open_now':
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0E7C66]/10 text-[#0E7C66] border border-[#0E7C66]/20 rounded-md text-sm">
          <span className="w-1.5 h-1.5 bg-[#0E7C66] rounded-full animate-pulse" />
          <span className="font-medium">Tickets open</span>
          {price && !compact && (
            <span className="text-muted-foreground">· {price}</span>
          )}
        </div>
      );

    case 'opening_soon':
      if (!opensAt) return null;
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2F5BFF]/10 text-[#2F5BFF] border border-[#2F5BFF]/20 rounded-md text-sm">
          <Clock className="w-3.5 h-3.5" />
          <span>Opens {formatDate(opensAt)}</span>
          {opensTime && !compact && (
            <span className="text-muted-foreground">· {opensTime}</span>
          )}
        </div>
      );

    case 'not_announced':
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/50 text-muted-foreground border border-border rounded-md text-sm">
          <Clock className="w-3.5 h-3.5" />
          <span>Not announced</span>
        </div>
      );

    case 'sold_out':
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm">
          <span>Sold out</span>
        </div>
      );
  }
}
