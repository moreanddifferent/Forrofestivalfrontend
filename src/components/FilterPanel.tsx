import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export interface FilterState {
  months: string[];
  length: string[];
  countries: string[];
  location: string[];
  ticketStatus: string[];
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const LENGTH_OPTIONS = [
  { value: 'weekend', label: 'Weekend (2-3 days)' },
  { value: 'short', label: 'Short break (3-4 days)' },
  { value: 'week', label: 'Week (5-7 days)' }
];

const COUNTRIES = [
  'Portugal', 'Spain', 'France', 'Italy', 'Germany', 'Belgium', 'Netherlands'
];

const LOCATION_OPTIONS = [
  { value: 'sea', label: 'Sea' },
  { value: 'countryside', label: 'Countryside' },
  { value: 'urban', label: 'Urban' },
  { value: 'mountain', label: 'Mountain' }
];

const TICKET_STATUS_OPTIONS = [
  { value: 'open', label: 'Tickets open' },
  { value: 'opening-soon', label: 'Opening soon' },
  { value: 'sold-out', label: 'Sold out' }
];

export function FilterPanel({ isOpen, onClose, filters, onFilterChange }: FilterPanelProps) {
  if (!isOpen) return null;

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({ ...filters, [category]: newValues });
  };

  const clearAll = () => {
    onFilterChange({
      months: [],
      length: [],
      countries: [],
      location: [],
      ticketStatus: []
    });
  };

  const hasActiveFilters = 
    filters.months.length > 0 ||
    filters.length.length > 0 ||
    filters.countries.length > 0 ||
    filters.location.length > 0 ||
    filters.ticketStatus.length > 0;

  return (
    <div className="border-t border-border bg-background">
      <div className="max-w-3xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Filters</h3>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Groups */}
        <div className="space-y-6">
          {/* Month */}
          <FilterGroup
            title="Month"
            options={MONTHS.map(m => ({ value: m.toLowerCase(), label: m }))}
            selected={filters.months}
            onToggle={(value) => toggleFilter('months', value)}
          />

          {/* Length */}
          <FilterGroup
            title="Length"
            options={LENGTH_OPTIONS}
            selected={filters.length}
            onToggle={(value) => toggleFilter('length', value)}
          />

          {/* Country */}
          <FilterGroup
            title="Country"
            options={COUNTRIES.map(c => ({ value: c.toLowerCase(), label: c }))}
            selected={filters.countries}
            onToggle={(value) => toggleFilter('countries', value)}
          />

          {/* Location */}
          <FilterGroup
            title="Location"
            options={LOCATION_OPTIONS}
            selected={filters.location}
            onToggle={(value) => toggleFilter('location', value)}
          />

          {/* Ticket Status */}
          <FilterGroup
            title="Ticket Status"
            options={TICKET_STATUS_OPTIONS}
            selected={filters.ticketStatus}
            onToggle={(value) => toggleFilter('ticketStatus', value)}
          />
        </div>
      </div>
    </div>
  );
}

interface FilterGroupProps {
  title: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}

function FilterGroup({ title, options, selected, onToggle }: FilterGroupProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selected.includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border hover:border-primary/50'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
