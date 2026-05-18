import { X } from 'lucide-react';
import { Button } from './ui/button';
import { SearchFilters } from './IntegratedSearchBar';
import { useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  resultCount: number;
}

export function FilterModal({ isOpen, onClose, filters, onFilterChange, resultCount }: FilterModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 md:hidden"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 bg-white z-50 md:hidden rounded-t-xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-bold">Filter festivals</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Location */}
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
              Location
            </label>
            <input
              type="text"
              placeholder="Country or city"
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#2F5BFF]"
            />
          </div>

          {/* When */}
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
              When
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['any', 'this_month', 'next_month', 'summer'].map((option) => (
                <button
                  key={option}
                  onClick={() => onFilterChange({ ...filters, when: option as SearchFilters['when'] })}
                  className={`px-4 py-3 border rounded-lg font-bold text-sm transition-colors ${
                    filters.when === option
                      ? 'bg-[#2F5BFF] text-white border-[#2F5BFF]'
                      : 'bg-white text-black border-border hover:bg-gray-50'
                  }`}
                >
                  {option === 'any' && 'Any time'}
                  {option === 'this_month' && 'This month'}
                  {option === 'next_month' && 'Next month'}
                  {option === 'summer' && 'Summer'}
                </button>
              ))}
            </div>
          </div>

          {/* Setting */}
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
              Setting
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: '', label: 'All' },
                { value: 'coastal', label: 'Coastal' },
                { value: 'mountain', label: 'Mountain' },
                { value: 'city', label: 'City' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => onFilterChange({ ...filters, setting: option.value })}
                  className={`px-4 py-3 border rounded-lg font-bold text-sm transition-colors ${
                    filters.setting === option.value
                      ? 'bg-[#2F5BFF] text-white border-[#2F5BFF]'
                      : 'bg-white text-black border-border hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              {resultCount} festivals
            </span>
            <button
              onClick={() => onFilterChange({ location: '', when: 'any', setting: '' })}
              className="text-sm font-bold text-[#2F5BFF] hover:underline"
            >
              Clear all
            </button>
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-[#2F5BFF] hover:bg-[#1A44E0] text-white font-bold py-6 text-base"
          >
            Show {resultCount} festivals
          </Button>
        </div>
      </div>
    </>
  );
}