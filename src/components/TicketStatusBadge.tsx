interface TicketStatusBadgeProps {
  variant: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  price?: string;
  opensAt?: string;
  opensTime?: string;
  compact?: boolean;
}

export function TicketStatusBadge({ variant, price, opensAt, opensTime, compact = false }: TicketStatusBadgeProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${month} ${day}`;
  };

  if (variant === 'sold_out') {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-gray-200 text-foreground border-2 border-black text-xs font-bold">
        <span>SOLD OUT</span>
      </div>
    );
  }

  if (variant === 'open_now') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0057FF] text-white border-2 border-black text-xs font-bold shadow-lg">
        <span className="w-1.5 h-1.5 bg-[#F5FF00] rounded-full animate-pulse" />
        <span>OPEN NOW</span>
        {price && <span className="text-white/90">· {price}</span>}
      </div>
    );
  }

  if (variant === 'opening_soon' && opensAt) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0057FF] text-white border-2 border-black text-xs font-bold shadow-lg">
        <span>OPENS {formatDate(opensAt).toUpperCase()}</span>
        {opensTime && <span className="text-white/90">· {opensTime}</span>}
      </div>
    );
  }

  // Default: not announced
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white text-foreground border-2 border-black text-xs font-bold">
      <span>TBA</span>
    </div>
  );
}