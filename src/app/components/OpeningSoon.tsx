import { Calendar, ArrowRight } from 'lucide-react';

interface OpeningSoonItem {
  festivalId: string;
  festivalName: string;
  openingDate: string;
}

interface OpeningSoonProps {
  items: OpeningSoonItem[];
  onFestivalClick: (festivalId: string) => void;
}

export function OpeningSoon({ items, onFestivalClick }: OpeningSoonProps) {
  if (items.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="flex flex-wrap gap-3">
      {items.slice(0, 4).map(item => (
        <button
          key={item.festivalId}
          onClick={() => onFestivalClick(item.festivalId)}
          className="group flex items-center gap-2 px-3.5 py-2 border border-border rounded-full bg-card hover:bg-muted hover:border-primary/30 transition-all duration-200 text-sm"
        >
          <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="font-medium">{item.festivalName}</span>
          <span className="text-muted-foreground">—</span>
          <span className="text-muted-foreground">Opens {formatDate(item.openingDate)}</span>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors ml-0.5" />
        </button>
      ))}
    </div>
  );
}