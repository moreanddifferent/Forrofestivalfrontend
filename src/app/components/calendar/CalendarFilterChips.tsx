import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';

export interface CalendarFilters {
  month: string;
  country: string;
  locationType: string;
  length: string;
}

interface CalendarFilterChipsProps {
  filters: CalendarFilters;
  onFilterChange: (filters: CalendarFilters) => void;
}

const MONTHS = [
  'Any month', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const COUNTRIES = [
  'Any country', 'Portugal', 'Spain', 'France', 'Germany', 'Netherlands', 'Italy', 'UK'
];

const LOCATION_TYPES = [
  'Any location', 'Sea', 'Countryside', 'Urban', 'Mountain'
];

const LENGTHS = [
  'Any length', 'Weekend (2-3 days)', 'Week (5-7 days)', 'Extended (7+ days)'
];

interface FilterChipProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  defaultValue: string;
}

function FilterChip({ label, value, options, onChange, defaultValue }: FilterChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = value !== defaultValue;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#2F5BFF] text-white font-bold'
            : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
        }`}
      >
        <span>{isActive ? value : label}</span>
        {isActive ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(defaultValue);
            }}
            className="ml-0.5 hover:bg-white/20 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-xl shadow-xl z-40 min-w-[180px] py-1 max-h-[280px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === option
                    ? 'bg-[#2F5BFF]/10 text-[#2F5BFF] font-bold'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function CalendarFilterChips({ filters, onFilterChange }: CalendarFilterChipsProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const activeCount = [
    filters.month !== 'Any month',
    filters.country !== 'Any country',
    filters.locationType !== 'Any location',
    filters.length !== 'Any length',
  ].filter(Boolean).length;

  const handleClearAll = () => {
    onFilterChange({
      month: 'Any month',
      country: 'Any country',
      locationType: 'Any location',
      length: 'Any length',
    });
  };

  return (
    <>
      {/* Mobile: Single Filters button */}
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full h-11 justify-between font-bold"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </span>
              {activeCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-[#2F5BFF] text-white text-xs rounded-full font-bold">
                  {activeCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Month */}
              <div>
                <label className="text-sm font-bold mb-2 block">Month</label>
                <div className="grid grid-cols-2 gap-2">
                  {MONTHS.map((month) => (
                    <button
                      key={month}
                      onClick={() => onFilterChange({ ...filters, month })}
                      className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        filters.month === month
                          ? 'bg-[#2F5BFF] text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="text-sm font-bold mb-2 block">Country</label>
                <div className="grid grid-cols-2 gap-2">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      onClick={() => onFilterChange({ ...filters, country })}
                      className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        filters.country === country
                          ? 'bg-[#2F5BFF] text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-bold mb-2 block">Location</label>
                <div className="grid grid-cols-2 gap-2">
                  {LOCATION_TYPES.map((location) => (
                    <button
                      key={location}
                      onClick={() => onFilterChange({ ...filters, locationType: location })}
                      className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        filters.locationType === location
                          ? 'bg-[#2F5BFF] text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div>
                <label className="text-sm font-bold mb-2 block">Length</label>
                <div className="grid grid-cols-1 gap-2">
                  {LENGTHS.map((length) => (
                    <button
                      key={length}
                      onClick={() => onFilterChange({ ...filters, length })}
                      className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        filters.length === length
                          ? 'bg-[#2F5BFF] text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              {activeCount > 0 && (
                <Button
                  onClick={() => {
                    handleClearAll();
                    setIsSheetOpen(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Filter chips */}
      <div className="hidden md:flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
        <FilterChip
          label="Month"
          value={filters.month}
          options={MONTHS}
          defaultValue="Any month"
          onChange={(v) => onFilterChange({ ...filters, month: v })}
        />
        <FilterChip
          label="Country"
          value={filters.country}
          options={COUNTRIES}
          defaultValue="Any country"
          onChange={(v) => onFilterChange({ ...filters, country: v })}
        />
        <FilterChip
          label="Location"
          value={filters.locationType}
          options={LOCATION_TYPES}
          defaultValue="Any location"
          onChange={(v) => onFilterChange({ ...filters, locationType: v })}
        />
        <FilterChip
          label="Length"
          value={filters.length}
          options={LENGTHS}
          defaultValue="Any length"
          onChange={(v) => onFilterChange({ ...filters, length: v })}
        />

        {activeCount > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>
    </>
  );
}