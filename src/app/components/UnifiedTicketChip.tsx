/**
 * Unified ticket status chip used consistently across the entire platform.
 * 
 * Statuses:
 *  - open_now → "Tickets available"
 *  - opening_soon → "Opens Mar 20"
 *  - sold_out → "Sold out"
 *  - not_announced → "Tickets not announced"
 *
 * New warm color system:
 *  - Tickets available: fresh green (#22C55E) with pale green background (#DCFCE7)
 *  - Opens soon: electric blue (#3D63FF) with pale blue background
 *  - Sold out: neutral warm gray with soft background
 *  - Not announced: warm yellow (#F6D94C) with soft yellow background (#FFF4BF)
 */

interface UnifiedTicketChipProps {
  status: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  currentPrice?: string;
  nextOpeningDate?: string;
  size?: 'sm' | 'md';
}

export function UnifiedTicketChip({ status, currentPrice, nextOpeningDate, size = 'sm' }: UnifiedTicketChipProps) {
  const base = size === 'sm'
    ? 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold border'
    : 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border';

  switch (status) {
    case 'open_now':
      return (
        <span className={`${base} bg-[#DCFCE7] border-[#22C55E]/20 text-[#22C55E]`}>
          Tickets available
        </span>
      );

    case 'opening_soon': {
      const dateLabel = nextOpeningDate
        ? new Date(nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'soon';
      return (
        <span className={`${base} bg-[#EBF2FF] border-[#3D63FF]/20 text-[#3D63FF]`}>
          Opens {dateLabel}
        </span>
      );
    }

    case 'sold_out':
      return (
        <span className={`${base} bg-[#F5F1E8] border-[#6B6B63]/20 text-[#6B6B63] font-medium`}>
          Sold out
        </span>
      );

    case 'not_announced':
      return (
        <span className={`${base} bg-[#FFF4BF] border-[#F6D94C]/30 text-[#1F1F1C] font-medium`}>
          Tickets not announced
        </span>
      );
  }
}