import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';

export interface FilterState {
  months: string[];
  countries: string[];
  locationTypes: string[];
  lengths: string[];
  ticketStatus: string[];
}

interface FilterChipsProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
  totalCount: number;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const COUNTRIES = ['Portugal', 'Spain', 'France', 'Netherlands', 'Germany', 'Italy'];

const LOCATION_TYPES = [
  { value: 'sea', label: 'Sea' },
  { value: 'countryside', label: 'Countryside' },
  { value: 'urban', label: 'Urban' },
  { value: 'mountain', label: 'Mountain' }
];

const LENGTHS = [
  { value: 'weekend', label: 'Weekend (2-3 days)' },
  { value: 'long', label: 'Long (4-5 days)' },
  { value: 'week', label: 'Week+' }
];

const TICKET_STATUS = [
  { value: 'open_now', label: 'Open now' },
  { value: 'opening_soon', label: 'Opening soon' },
  { value: 'sold_out', label: 'Sold out' },
  { value: 'not_announced', label: 'Not announced' }
];

export function FilterChips({ filters, onFilterChange, resultCount, totalCount }: FilterChipsProps) {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const hasActiveFilters = 
    filters.months.length > 0 ||
    filters.countries.length > 0 ||
    filters.locationTypes.length > 0 ||
    filters.lengths.length > 0 ||
    filters.ticketStatus.length > 0;

  const handleClearAll = () => {
    onFilterChange({
      months: [],
      countries: [],
      locationTypes: [],
      lengths: [],
      ticketStatus: []
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <FilterChip
          label="Month"
          isOpen={openPopover === 'month'}
          onToggle={() => setOpenPopover(openPopover === 'month' ? null : 'month')}
          activeCount={filters.months.length}
        >
          <MonthFilter
            selected={filters.months}
            onChange={(months) => onFilterChange({ ...filters, months })}
            onClose={() => setOpenPopover(null)}
          />
        </FilterChip>

        <FilterChip
          label="Country"
          isOpen={openPopover === 'country'}
          onToggle={() => setOpenPopover(openPopover === 'country' ? null : 'country')}
          activeCount={filters.countries.length}
        >
          <CountryFilter
            selected={filters.countries}
            onChange={(countries) => onFilterChange({ ...filters, countries })}
            onClose={() => setOpenPopover(null)}
          />
        </FilterChip>

        <FilterChip
          label="Location"
          isOpen={openPopover === 'location'}
          onToggle={() => setOpenPopover(openPopover === 'location' ? null : 'location')}
          activeCount={filters.locationTypes.length}
        >
          <LocationFilter
            selected={filters.locationTypes}
            onChange={(locationTypes) => onFilterChange({ ...filters, locationTypes })}
            onClose={() => setOpenPopover(null)}
          />
        </FilterChip>

        <FilterChip
          label="Length"
          isOpen={openPopover === 'length'}
          onToggle={() => setOpenPopover(openPopover === 'length' ? null : 'length')}
          activeCount={filters.lengths.length}
        >
          <LengthFilter
            selected={filters.lengths}
            onChange={(lengths) => onFilterChange({ ...filters, lengths })}
            onClose={() => setOpenPopover(null)}
          />
        </FilterChip>

        <FilterChip
          label="Ticket"
          isOpen={openPopover === 'ticket'}
          onToggle={() => setOpenPopover(openPopover === 'ticket' ? null : 'ticket')}
          activeCount={filters.ticketStatus.length}
        >
          <TicketFilter
            selected={filters.ticketStatus}
            onChange={(ticketStatus) => onFilterChange({ ...filters, ticketStatus })}
            onClose={() => setOpenPopover(null)}
          />
        </FilterChip>

        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? 'festival' : 'festivals'} found
        </p>
      )}
    </div>
  );
}

interface FilterChipProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  activeCount: number;
  children: React.ReactNode;
}

function FilterChip({ label, isOpen, onToggle, activeCount, children }: FilterChipProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={onToggle}
        className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all ${
          activeCount > 0
            ? 'bg-foreground text-background border-foreground'
            : 'bg-background text-foreground border-border hover:border-foreground'
        }`}
      >
        <span className="flex items-center gap-1.5">
          {label}
          {activeCount > 0 && (
            <span className="ml-0.5 px-1 text-xs">
              {activeCount}
            </span>
          )}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 min-w-[200px]">
          {children}
        </div>
      )}
    </div>
  );
}

// Individual filter components
interface MonthFilterProps {
  selected: string[];
  onChange: (months: string[]) => void;
  onClose: () => void;
}

function MonthFilter({ selected, onChange, onClose }: MonthFilterProps) {
  const toggleMonth = (month: string) => {
    if (selected.includes(month)) {
      onChange(selected.filter(m => m !== month));
    } else {
      onChange([...selected, month]);
    }
  };

  return (
    <div className="p-3 max-h-[300px] overflow-y-auto">
      <div className="grid grid-cols-2 gap-1">
        {MONTHS.map(month => (
          <label
            key={month}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(month)}
              onChange={() => toggleMonth(month)}
              className="rounded border-border"
            />
            <span>{month}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface CountryFilterProps {
  selected: string[];
  onChange: (countries: string[]) => void;
  onClose: () => void;
}

function CountryFilter({ selected, onChange, onClose }: CountryFilterProps) {
  const toggleCountry = (country: string) => {
    if (selected.includes(country)) {
      onChange(selected.filter(c => c !== country));
    } else {
      onChange([...selected, country]);
    }
  };

  return (
    <div className="p-3">
      <div className="space-y-1">
        {COUNTRIES.map(country => (
          <label
            key={country}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(country)}
              onChange={() => toggleCountry(country)}
              className="rounded border-border"
            />
            <span>{country}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface LocationFilterProps {
  selected: string[];
  onChange: (locationTypes: string[]) => void;
  onClose: () => void;
}

function LocationFilter({ selected, onChange, onClose }: LocationFilterProps) {
  const toggleLocation = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(l => l !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="p-3">
      <div className="space-y-1">
        {LOCATION_TYPES.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => toggleLocation(value)}
              className="rounded border-border"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface LengthFilterProps {
  selected: string[];
  onChange: (lengths: string[]) => void;
  onClose: () => void;
}

function LengthFilter({ selected, onChange, onClose }: LengthFilterProps) {
  const toggleLength = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(l => l !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="p-3">
      <div className="space-y-1">
        {LENGTHS.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => toggleLength(value)}
              className="rounded border-border"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface TicketFilterProps {
  selected: string[];
  onChange: (ticketStatus: string[]) => void;
  onClose: () => void;
}

function TicketFilter({ selected, onChange, onClose }: TicketFilterProps) {
  const toggleStatus = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(s => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="p-3">
      <div className="space-y-1">
        {TICKET_STATUS.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => toggleStatus(value)}
              className="rounded border-border"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
