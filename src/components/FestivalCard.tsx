import { MapPin, Calendar, Bookmark, BarChart3, Check } from 'lucide-react';
import { UnifiedTicketChip } from './UnifiedTicketChip';

interface FestivalCardProps {
  festival: {
    id: string;
    name: string;
    location: string;
    country: string;
    dates: string;
    image: string;
    ticketStatus: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
    currentPrice?: string;
    nextOpeningDate?: string;
    nextOpeningTime?: string;
  };
  onClick: () => void;
  isSaved?: boolean;
  onSave?: () => void;
  isInCompare?: boolean;
  onToggleCompare?: () => void;
}

export function FestivalCard({ festival, onClick, isSaved = false, onSave, isInCompare = false, onToggleCompare }: FestivalCardProps) {
  const showCompareToggle = !!onToggleCompare;

  return (
    <div
      className={`group cursor-pointer bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-lg md:hover:-translate-y-1 active:shadow-md transition-all duration-200 ease-out ${
        isInCompare ? 'border-[#2F5BFF] ring-1 ring-[#2F5BFF]/20' : 'border-gray-200'
      }`}
    >
      {/* Image — reduced height for desktop */}
      <div 
        className="relative aspect-[3/2] max-h-[200px] md:max-h-[160px] overflow-hidden bg-muted"
        onClick={onClick}
      >
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Unified ticket status chip overlay */}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2">
          <UnifiedTicketChip
            status={festival.ticketStatus}
            currentPrice={festival.currentPrice}
            nextOpeningDate={festival.nextOpeningDate}
          />
        </div>

        {/* Top-right overlays: Compare toggle + Bookmark */}
        <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 flex items-center gap-1.5">
          {/* Compare toggle — visible on mobile, on hover on desktop */}
          {showCompareToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare();
              }}
              className={`md:opacity-0 md:group-hover:opacity-100 transition-all duration-150 p-1.5 rounded-full shadow-sm ${
                isInCompare
                  ? 'bg-[#2F5BFF] text-white'
                  : 'bg-white/95 hover:bg-[#2F5BFF]/10 text-foreground'
              }`}
              title={isInCompare ? 'Remove from compare' : 'Add to compare'}
            >
              {isInCompare ? (
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
              ) : (
                <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              )}
            </button>
          )}

          {/* Bookmark button overlay */}
          {onSave && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave();
              }}
              className="p-1.5 bg-white/95 hover:bg-[#FFD600]/40 active:bg-[#FFD600]/40 rounded-full transition-all duration-150 shadow-sm"
              aria-label={isSaved ? "Remove from saved" : "Save festival"}
            >
              <Bookmark 
                className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-150 ${
                  isSaved ? 'fill-[#2F5BFF] text-[#2F5BFF]' : 'text-foreground'
                }`}
              />
            </button>
          )}
        </div>

        {/* Selected indicator badge — bottom-left on mobile when selected */}
        {isInCompare && (
          <div className="md:hidden absolute bottom-2 left-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#2F5BFF] text-white rounded-full text-[10px] font-bold">
              <Check className="w-2.5 h-2.5" />
              Selected
            </span>
          </div>
        )}
      </div>

      {/* Content — tighter spacing */}
      <div className="p-2 md:p-2.5 space-y-0.5 md:space-y-0.5" onClick={onClick}>
        <h3 className="font-bold text-xs md:text-sm leading-tight line-clamp-1 group-hover:text-[#2F5BFF] transition-colors duration-200">
          {festival.name}
        </h3>
        
        <div className="space-y-0 text-[10px] md:text-xs text-muted-foreground leading-snug">
          <div className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
            <span className="line-clamp-1 font-medium">{festival.location}, {festival.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
            <span className="line-clamp-1">{festival.dates}</span>
          </div>
        </div>
      </div>
    </div>
  );
}