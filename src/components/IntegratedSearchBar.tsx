import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Palmtree } from 'lucide-react';

export interface SearchFilters {
  location: string;
  when: string;
  setting: string;
}

interface IntegratedSearchBarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  resultCount?: number;
  onSearch?: () => void;
}

const WHEN_OPTIONS = [
  { value: 'any', label: 'Any time' },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
  { value: 'next_3_months', label: 'Next 3 months' },
  { value: 'next_6_months', label: 'Next 6 months' },
];

const SETTING_OPTIONS = [
  { value: '', label: 'Any setting' },
  { value: 'urban', label: 'Urban' },
  { value: 'nature', label: 'Nature' },
  { value: 'beach', label: 'Beach' },
  { value: 'mountain', label: 'Mountain' },
];

export function IntegratedSearchBar({ filters, onFilterChange, resultCount, onSearch }: IntegratedSearchBarProps) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveSegment(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getWhenLabel = () => {
    const option = WHEN_OPTIONS.find(o => o.value === filters.when);
    return option?.label || 'Any time';
  };

  const getSettingLabel = () => {
    const option = SETTING_OPTIONS.find(o => o.value === filters.setting);
    return option?.label || 'Any setting';
  };

  const hasActiveFilters = filters.location || filters.when !== 'any' || filters.setting;

  return (
    <div className="space-y-2">
      <div 
        ref={containerRef}
        className="relative inline-flex items-stretch border border-border rounded-full bg-card hover:shadow-md transition-shadow"
      >
        {/* Location Segment */}
        <div className="relative flex-1">
          <button
            onClick={() => setActiveSegment(activeSegment === 'location' ? null : 'location')}
            className={`w-full px-5 py-2 text-left rounded-l-full transition-colors ${
              activeSegment === 'location' ? 'bg-muted' : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-2 min-w-[130px]">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="text-xs font-medium text-muted-foreground">Location</div>
                <div className="text-sm">
                  {filters.location || <span className="text-muted-foreground">City or country</span>}
                </div>
              </div>
            </div>
          </button>

          {activeSegment === 'location' && (
            <div className="absolute top-full left-0 mt-2 w-[280px] bg-popover border border-border rounded-lg shadow-lg z-50 p-2.5">
              <input
                type="text"
                value={filters.location}
                onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
                placeholder="Search city or country..."
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:border-primary bg-input-background"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* When Segment */}
        <div className="relative flex-1">
          <button
            onClick={() => setActiveSegment(activeSegment === 'when' ? null : 'when')}
            className={`w-full px-5 py-2 text-left transition-colors ${
              activeSegment === 'when' ? 'bg-muted' : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-2 min-w-[110px]">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="text-xs font-medium text-muted-foreground">When</div>
                <div className="text-sm">{getWhenLabel()}</div>
              </div>
            </div>
          </button>

          {activeSegment === 'when' && (
            <div className="absolute top-full left-0 mt-2 w-[200px] bg-popover border border-border rounded-lg shadow-lg z-50 py-1.5">
              {WHEN_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onFilterChange({ ...filters, when: option.value });
                    setActiveSegment(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left text-sm hover:bg-muted transition-colors ${
                    filters.when === option.value ? 'bg-muted font-medium' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px bg-border" />

        {/* Setting Segment */}
        <div className="relative flex-1">
          <button
            onClick={() => setActiveSegment(activeSegment === 'setting' ? null : 'setting')}
            className={`w-full px-5 py-2 text-left transition-colors ${
              activeSegment === 'setting' ? 'bg-muted' : 'hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-2 min-w-[100px]">
              <Palmtree className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <div className="text-xs font-medium text-muted-foreground">Setting</div>
                <div className="text-sm">{getSettingLabel()}</div>
              </div>
            </div>
          </button>

          {activeSegment === 'setting' && (
            <div className="absolute top-full right-0 mt-2 w-[160px] bg-popover border border-border rounded-lg shadow-lg z-50 py-1.5">
              {SETTING_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onFilterChange({ ...filters, setting: option.value });
                    setActiveSegment(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left text-sm hover:bg-muted transition-colors ${
                    filters.setting === option.value ? 'bg-muted font-medium' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={() => {
            setActiveSegment(null);
            onSearch?.();
          }}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-full transition-colors"
          aria-label="Search festivals"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Result Count */}
      {hasActiveFilters && resultCount !== undefined && (
        <p className="text-sm text-muted-foreground ml-1">
          {resultCount} {resultCount === 1 ? 'festival' : 'festivals'}
        </p>
      )}
    </div>
  );
}