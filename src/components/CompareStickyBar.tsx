import { BarChart3, X } from 'lucide-react';
import { Button } from './ui/button';

interface CompareStickyBarProps {
  count: number;
  onCompare: () => void;
  onClear: () => void;
}

export function CompareStickyBar({ count, onCompare, onClear }: CompareStickyBarProps) {
  if (count === 0) return null;

  // Single selection state — helper chip
  if (count === 1) {
    return (
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-muted text-muted-foreground rounded-full shadow-lg px-4 py-2 flex items-center gap-2 animate-in slide-in-from-bottom-4">
        <span className="text-xs font-medium whitespace-nowrap">
          1 selected — select one more to compare
        </span>
        <button
          onClick={onClear}
          className="w-5 h-5 flex items-center justify-center hover:bg-background/50 rounded-full transition-colors"
          aria-label="Clear selection"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // 2+ selections — full compare bar
  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#2F5BFF] text-white rounded-full shadow-2xl pl-4 md:pl-5 pr-2 py-1.5 md:py-2 flex items-center gap-2 md:gap-3 animate-in slide-in-from-bottom-4">
      <span className="text-xs md:text-sm font-bold whitespace-nowrap">
        Compare ({count})
      </span>
      <Button
        size="sm"
        onClick={onCompare}
        className="bg-white text-[#2F5BFF] hover:bg-gray-100 font-bold gap-1.5 rounded-full h-7 md:h-8 px-2.5 md:px-3 text-xs"
      >
        <BarChart3 className="w-3 h-3 md:w-3.5 md:h-3.5" />
        <span className="hidden sm:inline">Compare</span>
      </Button>
      <button
        onClick={onClear}
        className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
        aria-label="Clear compare"
      >
        <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </button>
    </div>
  );
}