import { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export interface FilterState {
  search: string;
  months: string[];
  festivalLength: string[];
  countries: string[];
  locationType: string[];
  ticketStatus: string[];
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultsCount: number;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const COUNTRIES = [
  'Portugal', 'Spain', 'France', 'Italy', 'Germany', 'Belgium', 'Netherlands'
];

export function FilterBar({ filters, onFilterChange, resultsCount }: FilterBarProps) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters = 
    filters.months.length > 0 ||
    filters.festivalLength.length > 0 ||
    filters.countries.length > 0 ||
    filters.locationType.length > 0 ||
    filters.ticketStatus.length > 0;

  const clearAllFilters = () => {
    onFilterChange({
      search: '',
      months: [],
      festivalLength: [],
      countries: [],
      locationType: [],
      ticketStatus: []
    });
    setSearchValue('');
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFilterChange({ ...filters, search: value });
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({ ...filters, [category]: newValues });
  };

  const removeFilter = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category] as string[];
    const newValues = currentValues.filter(v => v !== value);
    onFilterChange({ ...filters, [category]: newValues });
  };

  return (
    <div className="border-b border-border bg-card sticky top-[73px] z-40">
      <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by festival name, city, or venue..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all text-base"
          />
        </div>

        {/* Filter Groups */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {/* When */}
          <FilterPopover
            title="Month"
            options={MONTHS.map(m => ({ value: m.toLowerCase(), label: m }))}
            selected={filters.months}
            onToggle={(value) => toggleFilter('months', value)}
            multiSelect
          />

          <div className="w-px h-6 bg-border" />

          {/* Time Commitment */}
          <FilterPopover
            title="Length of stay"
            options={[
              { value: 'weekend', label: 'Weekend (2-3 days)' },
              { value: 'short', label: 'Short break (3-4 days)' },
              { value: 'long', label: 'Long festival (5-7 days)' }
            ]}
            selected={filters.festivalLength}
            onToggle={(value) => toggleFilter('festivalLength', value)}
            multiSelect
          />

          <div className="w-px h-6 bg-border" />

          {/* Where */}
          <FilterPopover
            title="Country"
            options={COUNTRIES.map(c => ({ value: c.toLowerCase(), label: c }))}
            selected={filters.countries}
            onToggle={(value) => toggleFilter('countries', value)}
            multiSelect
          />
          <FilterPopover
            title="Location type"
            options={[
              { value: 'city', label: 'City' },
              { value: 'coastal', label: 'Seaside' },
              { value: 'intimate', label: 'Countryside' }
            ]}
            selected={filters.locationType}
            onToggle={(value) => toggleFilter('locationType', value)}
            multiSelect
          />

          <div className="w-px h-6 bg-border" />

          {/* Tickets */}
          <FilterPopover
            title="Ticket status"
            options={[
              { value: 'open', label: 'Open' },
              { value: 'opening-soon', label: 'Opening soon' },
              { value: 'sold-out', label: 'Sold out' }
            ]}
            selected={filters.ticketStatus}
            onToggle={(value) => toggleFilter('ticketStatus', value)}
            multiSelect
          />
        </div>

        {/* Active Filters & Results */}
        {(hasActiveFilters || filters.search) && (
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              {filters.months.map(value => (
                <FilterPill
                  key={value}
                  label={MONTHS[MONTHS.findIndex(m => m.toLowerCase() === value)]}
                  onRemove={() => removeFilter('months', value)}
                />
              ))}
              {filters.festivalLength.map(value => (
                <FilterPill
                  key={value}
                  label={
                    value === 'weekend' ? 'Weekend' : 
                    value === 'short' ? 'Short break' : 
                    'Long festival'
                  }
                  onRemove={() => removeFilter('festivalLength', value)}
                />
              ))}
              {filters.countries.map(value => (
                <FilterPill
                  key={value}
                  label={COUNTRIES.find(c => c.toLowerCase() === value) || value}
                  onRemove={() => removeFilter('countries', value)}
                />
              ))}
              {filters.locationType.map(value => (
                <FilterPill
                  key={value}
                  label={
                    value === 'city' ? 'City' : 
                    value === 'coastal' ? 'Seaside' : 
                    'Countryside'
                  }
                  onRemove={() => removeFilter('locationType', value)}
                />
              ))}
              {filters.ticketStatus.map(value => (
                <FilterPill
                  key={value}
                  label={
                    value === 'open' ? 'Open' : 
                    value === 'opening-soon' ? 'Opening soon' : 
                    'Sold out'
                  }
                  onRemove={() => removeFilter('ticketStatus', value)}
                />
              ))}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {resultsCount} {resultsCount === 1 ? 'festival' : 'festivals'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface FilterPopoverProps {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  multiSelect?: boolean;
}

function FilterPopover({ 
  title, 
  options, 
  selected, 
  onToggle,
  multiSelect = false
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const hasSelection = selected.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`gap-2 transition-all ${hasSelection ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary' : ''}`}
        >
          <span>{title}</span>
          {hasSelection && (
            <span className="ml-1 px-1.5 min-w-[20px] h-5 flex items-center justify-center bg-primary-foreground/20 text-primary-foreground rounded-full text-xs">
              {selected.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="start">
        <div className="space-y-1">
          <h4 className="text-sm mb-3 px-1">{title}</h4>
          <div className="space-y-1 max-h-[280px] overflow-y-auto">
            {options.map(option => (
              <label
                key={option.value}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted cursor-pointer transition-colors group"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => onToggle(option.value)}
                    className="w-4 h-4 rounded border-2 border-border checked:bg-primary checked:border-primary cursor-pointer"
                  />
                </div>
                <span className="text-sm flex-1">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-foreground border border-primary/20 rounded-full text-sm">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}