/**
 * Unified ticket status chip used consistently across the entire platform:
 * homepage cards, "Tickets opening soon" mini-cards, calendar list items,
 * and festival page ticket summary.
 *
 * Statuses:
 *  - open_now  → "Open · From €X" (if price known) or "Open"
 *  - opening_soon → "Opens {Mon DD}"
 *  - sold_out → "Sold out"
 *  - not_announced → "Tickets not announced"
 *
 * Color rules (no green):
 *  - Open: neutral chip with blue dot accent
 *  - Opens soon: electric blue
 *  - Sold out: neutral grey
 *  - Not announced: muted
 */

interface UnifiedTicketChipProps {
  status: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  currentPrice?: string;
  nextOpeningDate?: string;
  size?: 'sm' | 'md';
}

export function UnifiedTicketChip({ status, currentPrice, nextOpeningDate, size = 'sm' }: UnifiedTicketChipProps) {
  const base = size === 'sm'
    ? 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold'
    : 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold';

  switch (status) {
    case 'open_now':
      return (
        <span className={`${base} bg-white border border-[#2F5BFF]/30 text-foreground`}>
          <span className="w-1.5 h-1.5 bg-[#2F5BFF] rounded-full animate-pulse" />
          Open{currentPrice ? ` · ${currentPrice}` : ''}
        </span>
      );

    case 'opening_soon': {
      const dateLabel = nextOpeningDate
        ? new Date(nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'soon';
      return (
        <span className={`${base} bg-[#2F5BFF] text-white`}>
          Opens {dateLabel}
        </span>
      );
    }

    case 'sold_out':
      return (
        <span className={`${base} bg-gray-200 text-foreground font-medium`}>
          Sold out
        </span>
      );

    case 'not_announced':
      return (
        <span className={`${base} bg-muted text-muted-foreground font-medium`}>
          Tickets not announced
        </span>
      );
  }
}
