import { ArrowRight } from 'lucide-react';
import { FestivalCardData } from './FestivalCard';

interface HorizontalScrollSectionProps {
  title: string;
  description?: string;
  festivals: FestivalCardData[];
  onFestivalClick: (id: string) => void;
  onSeeAll?: () => void;
}

export function HorizontalScrollSection({
  title,
  description,
  festivals,
  onFestivalClick,
  onSeeAll,
}: HorizontalScrollSectionProps) {
  // Show max 3 items in preview
  const displayFestivals = festivals.slice(0, 3);

  return (
    <section className="pt-5 md:pt-16">
      <div className="max-w-6xl mx-auto md:px-6">
        {/* Header with See All */}
        <div className="px-4 md:px-0 mb-3 md:mb-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-xl md:text-3xl font-black text-foreground tracking-tight">
              {title}
            </h2>
            {onSeeAll && festivals.length > 3 && (
              <button
                onClick={onSeeAll}
                className="flex items-center gap-1 text-xs font-bold text-[#0057FF] hover:underline shrink-0 ml-3 md:hidden"
              >
                <span>See all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
          <div className="flex gap-3 pb-1">
            {displayFestivals.map((festival) => (
              <div
                key={festival.id}
                onClick={() => onFestivalClick(festival.id)}
                className="flex-shrink-0 w-[85vw] snap-start cursor-pointer"
              >
                {/* Image - 4:3 ratio, max 200px */}
                <div className="relative aspect-[4/3] max-h-[200px] overflow-hidden rounded-sm bg-muted mb-2">
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Bookmark button */}
                  {festival.onSave && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        festival.onSave();
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/95 rounded-sm shadow-sm active:bg-[#F5FF00] transition-colors"
                    >
                      <svg
                        className={`w-3.5 h-3.5 ${
                          festival.isSaved ? 'fill-[#0057FF] text-[#0057FF]' : 'fill-none text-black'
                        }`}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Content - compact */}
                <div className="space-y-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm leading-tight line-clamp-1 text-foreground flex-1">
                      {festival.name}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {festival.location}, {festival.country}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {festival.dates}
                  </p>
                  
                  {/* Status tag - small and minimal */}
                  <div className="pt-1">
                    {festival.ticketStatus === 'opening_soon' && festival.nextOpeningDate ? (
                      <span className="inline-block text-[10px] font-bold text-[#0057FF]">
                        Opens {new Date(festival.nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    ) : festival.ticketStatus === 'open_now' ? (
                      <span className="inline-block text-[10px] font-bold text-[#0057FF]">
                        Tickets open
                      </span>
                    ) : festival.ticketStatus === 'sold_out' ? (
                      <span className="inline-block text-[10px] font-medium text-muted-foreground">
                        Sold out
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 px-0">
          {festivals.map((festival) => (
            <div
              key={festival.id}
              onClick={() => onFestivalClick(festival.id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted mb-2">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {festival.onSave && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      festival.onSave();
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/95 hover:bg-[#F5FF00] rounded-sm shadow-sm transition-colors"
                  >
                    <svg
                      className={`w-4 h-4 ${
                        festival.isSaved ? 'fill-[#0057FF] text-[#0057FF]' : 'fill-none text-black'
                      }`}
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm leading-tight line-clamp-1 text-foreground group-hover:text-[#0057FF] transition-colors">
                  {festival.name}
                </h3>
                <p className="text-xs text-muted-foreground">{festival.location}, {festival.country}</p>
                <p className="text-xs text-muted-foreground">{festival.dates}</p>
                <div className="pt-1">
                  {festival.ticketStatus === 'opening_soon' && festival.nextOpeningDate ? (
                    <span className="text-xs font-bold text-[#0057FF]">
                      Opens {new Date(festival.nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  ) : festival.ticketStatus === 'open_now' ? (
                    <span className="text-xs font-bold text-[#0057FF]">
                      Tickets open
                    </span>
                  ) : festival.ticketStatus === 'sold_out' ? (
                    <span className="text-xs font-medium text-muted-foreground">
                      Sold out
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface FestivalCardData {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  image: string;
  ticketStatus?: 'open_now' | 'opening_soon' | 'sold_out' | 'not_announced';
  nextOpeningDate?: string;
  isSaved?: boolean;
  onSave?: () => void;
}
