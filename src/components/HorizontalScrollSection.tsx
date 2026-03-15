import { ArrowRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { UnifiedTicketChip } from './UnifiedTicketChip';

export interface FestivalCardData {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  image: string;
  ticketStatus?: 'open_now' | 'opening_soon' | 'sold_out' | 'not_announced';
  nextOpeningDate?: string;
  currentPrice?: string;
  isSaved?: boolean;
  onSave?: () => void;
}

interface HorizontalScrollSectionProps {
  title: string;
  description?: string;
  festivals: FestivalCardData[];
  onFestivalClick: (id: string) => void;
  onSeeAll?: () => void;
  isAnchor?: boolean;
  maxItems?: number;
}

export function HorizontalScrollSection({
  title,
  description,
  festivals,
  onFestivalClick,
  onSeeAll,
  isAnchor = false,
  maxItems = 6,
}: HorizontalScrollSectionProps) {
  const displayFestivals = festivals.slice(0, maxItems);

  return (
    <section className={`${isAnchor ? 'pt-3 md:pt-8' : 'pt-3 md:pt-8'}`}>
      <div className="max-w-6xl mx-auto md:px-6">
        {/* Header with See All */}
        <div className="px-4 md:px-0 mb-2 md:mb-4">
          <div className="flex items-start justify-between mb-1">
            <SectionHeader title={title} description={description} isAnchor={isAnchor} />
            {festivals.length > maxItems && (
              <button
                onClick={onSeeAll}
                className="flex items-center gap-1 text-xs font-bold text-[#2F5BFF] hover:text-[#1A44E0] hover:underline shrink-0 ml-3 mt-1"
              >
                <span>See all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4">
          <div className="flex gap-3 pb-1">
            {displayFestivals.map((festival) => (
              <div
                key={festival.id}
                className="flex-shrink-0 w-[180px] snap-start cursor-pointer border border-border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow"
              >
                {/* Image with overlays */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted" onClick={() => onFestivalClick(festival.id)}>
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Ticket chip overlay */}
                  {festival.ticketStatus && (
                    <div className="absolute bottom-1.5 left-1.5">
                      <UnifiedTicketChip
                        status={festival.ticketStatus}
                        currentPrice={festival.currentPrice}
                        nextOpeningDate={festival.nextOpeningDate}
                      />
                    </div>
                  )}

                  {/* Bookmark button */}
                  {festival.onSave && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        festival.onSave!();
                      }}
                      className="absolute top-1.5 right-1.5 p-1 bg-white/95 rounded-full shadow-sm active:bg-[#FFD600]/40 transition-colors"
                    >
                      <svg
                        className={`w-3 h-3 ${
                          festival.isSaved ? 'fill-[#2F5BFF] text-[#2F5BFF]' : 'fill-none text-black'
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

                {/* Content */}
                <div className="p-2 space-y-0.5" onClick={() => onFestivalClick(festival.id)}>
                  <h3 className="font-bold text-[12px] leading-tight line-clamp-1 text-foreground">
                    {festival.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">
                    {festival.location}, {festival.country}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">
                    {festival.dates}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 2-column grid (calmer, more comparable) */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 px-0">
          {displayFestivals.map((festival) => (
            <div
              key={festival.id}
              className="group cursor-pointer border border-border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted" onClick={() => onFestivalClick(festival.id)}>
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                {/* Ticket chip overlay */}
                {festival.ticketStatus && (
                  <div className="absolute bottom-1.5 left-1.5">
                    <UnifiedTicketChip
                      status={festival.ticketStatus}
                      currentPrice={festival.currentPrice}
                      nextOpeningDate={festival.nextOpeningDate}
                    />
                  </div>
                )}
                {festival.onSave && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      festival.onSave!();
                    }}
                    className="absolute top-1.5 right-1.5 p-1.5 bg-white/95 hover:bg-[#FFD600]/40 rounded-full shadow-sm transition-colors"
                  >
                    <svg
                      className={`w-3.5 h-3.5 ${
                        festival.isSaved ? 'fill-[#2F5BFF] text-[#2F5BFF]' : 'fill-none text-black'
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
              <div className="p-2.5 space-y-0.5" onClick={() => onFestivalClick(festival.id)}>
                <h3 className="font-bold text-[13px] leading-tight line-clamp-1 text-foreground group-hover:text-[#2F5BFF] transition-colors">
                  {festival.name}
                </h3>
                <p className="text-[11px] text-muted-foreground">{festival.location}, {festival.country}</p>
                <p className="text-[11px] text-muted-foreground">{festival.dates}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}