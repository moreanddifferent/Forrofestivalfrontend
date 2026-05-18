import { MapPin, Calendar, Bookmark } from 'lucide-react';
import { TicketStatusBadge } from './TicketStatusBadge';

interface EditorPickFestival {
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
  editorNote: string;
  isSaved?: boolean;
  onSave?: () => void;
}

interface EditorPicksProps {
  festivals: EditorPickFestival[];
  onFestivalClick: (festivalId: string) => void;
}

export function EditorPicks({ festivals, onFestivalClick }: EditorPicksProps) {
  if (festivals.length === 0) return null;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {festivals.slice(0, 3).map(festival => (
        <div
          key={festival.id}
          className="group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 ease-out"
        >
          {/* Image */}
          <div 
            className="relative aspect-[3/2] overflow-hidden bg-muted"
            onClick={() => onFestivalClick(festival.id)}
          >
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200 ease-out"
            />
            
            {/* Editor note label */}
            <div className="absolute top-2 left-2">
              <div className="px-2.5 py-1 rounded-full bg-white/95 text-xs font-medium text-foreground shadow-sm">
                {festival.editorNote}
              </div>
            </div>

            {/* Bookmark button */}
            {festival.onSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  festival.onSave?.();
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 hover:bg-white transition-all duration-150 shadow-sm hover:scale-[1.08] active:scale-100"
                aria-label={festival.isSaved ? "Remove from plan" : "Add to plan"}
              >
                <Bookmark 
                  className={`w-4 h-4 transition-colors duration-150 ${
                    festival.isSaved ? 'fill-foreground text-foreground' : 'text-foreground/60'
                  }`}
                />
              </button>
            )}

            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-3 space-y-1.5" onClick={() => onFestivalClick(festival.id)}>
            {/* Photo caption */}
            <p className="text-[11px] text-muted-foreground/70 -mt-0.5">
              Photo: festival archive
            </p>

            {/* Festival name */}
            <h3 className="font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {festival.name}
            </h3>
            
            {/* Location and dates */}
            <div className="space-y-0.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="line-clamp-1">{festival.location}, {festival.country}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="line-clamp-1">{festival.dates}</span>
              </div>
            </div>

            {/* Ticket status */}
            <div className="pt-1">
              <TicketStatusBadge
                variant={festival.ticketStatus}
                price={festival.currentPrice}
                opensAt={festival.nextOpeningDate}
                opensTime={festival.nextOpeningTime}
                compact
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}