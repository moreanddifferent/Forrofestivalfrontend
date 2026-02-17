import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

interface SearchBarProps {
  onFilterClick?: () => void;
}

export function SearchBar({ onFilterClick }: SearchBarProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search festivals by name, location, or country..."
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-white text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
          />
        </div>

        {/* Filters Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onFilterClick}
          className="h-14 px-6 gap-2 bg-white hover:bg-primary hover:text-white hover:border-primary shadow-sm"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>
    </div>
  );
}