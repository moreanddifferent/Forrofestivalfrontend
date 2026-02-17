import { MapPin, Calendar, ChevronRight, Bookmark } from 'lucide-react';
import { TicketStatusBadge } from './TicketStatusBadge';

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
}

export function FestivalCard({ festival, onClick, isSaved = false, onSave }: FestivalCardProps) {
  return (
    <div
      className="group cursor-pointer bg-card border border-gray-200 md:border-2 md:border-black rounded-sm overflow-hidden shadow-md hover:shadow-2xl md:hover:-translate-y-1 active:shadow-lg transition-all duration-200 ease-out"
    >
      {/* Image with overlay badge - 3:2 ratio, max 200px on mobile */}
      <div 
        className="relative aspect-[3/2] max-h-[200px] md:max-h-none overflow-hidden bg-muted"
        onClick={onClick}
      >
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Ticket status badge overlay - mobile optimized */}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2">
          {festival.ticketStatus === 'opening_soon' && festival.nextOpeningDate ? (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#0057FF] text-white rounded-sm text-[10px] font-bold shadow-sm">
              Opens {new Date(festival.nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          ) : festival.ticketStatus === 'open_now' ? (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#0057FF] text-white rounded-sm text-[10px] font-bold shadow-sm">
              <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
              <span>Open</span>
            </div>
          ) : festival.ticketStatus === 'sold_out' ? (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-900 text-white rounded-sm text-[10px] font-bold shadow-sm">
              Sold out
            </div>
          ) : null}
        </div>

        {/* Bookmark button overlay */}
        {onSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className="absolute top-1.5 right-1.5 md:top-2 md:right-2 p-1.5 bg-white/95 hover:bg-[#F5FF00] active:bg-[#F5FF00] transition-all duration-150 shadow-sm"
            aria-label={isSaved ? "Remove from plan" : "Add to plan"}
          >
            <Bookmark 
              className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-150 ${
                isSaved ? 'fill-[#0057FF] text-[#0057FF]' : 'text-foreground'
              }`}
            />
          </button>
        )}
      </div>

      {/* Content - reduced padding on mobile */}
      <div className="p-1.5 md:p-3 space-y-0.5 md:space-y-1" onClick={onClick}>
        {/* Festival name */}
        <h3 className="font-black text-xs md:text-sm leading-tight line-clamp-1 group-hover:text-[#0057FF] transition-colors duration-200">
          {festival.name}
        </h3>
        
        {/* Location and dates - compact */}
        <div className="space-y-0 text-[10px] md:text-xs text-muted-foreground">
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