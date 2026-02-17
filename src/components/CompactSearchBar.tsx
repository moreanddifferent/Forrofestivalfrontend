import { Search } from 'lucide-react';
import { useState } from 'react';

interface CompactSearchBarProps {
  onSearch?: (query: string) => void;
}

export function CompactSearchBar({ onSearch }: CompactSearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search festivals…"
        className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background hover:border-foreground/30 focus:border-foreground focus:outline-none transition-colors"
      />
    </div>
  );
}
