import { Bell, ArrowRight, CheckCircle2, Bookmark, Share2, MapPin, Layers, ChevronLeft, ChevronRight, Search, Calendar, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { HorizontalScrollSection } from './HorizontalScrollSection';
import { FilterModal } from './FilterModal';
import { IntegratedSearchBar, SearchFilters } from './IntegratedSearchBar';
import { useState, useRef, useCallback, useEffect } from 'react';

interface FestivalCardData {
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
  isSaved?: boolean;
  onSave?: () => void;
  experienceType?: 'intimate' | 'sea' | 'immersive' | 'urban' | 'mountain';
  duration?: 'weekend' | 'week';
  editorNote?: string;
  locationType?: string;
}

interface HomePageProps {
  festivals: FestivalCardData[];
  onFestivalClick: (festivalId: string) => void;
  onNavigateToCalendar: () => void;
  onNavigateToMap: () => void;
  onSetAlert?: (festivalId: string) => void;
  alertSet?: Set<string>;
}

const LOCATION_TYPE_LABELS: Record<string, string> = {
  sea: 'Sea',
  countryside: 'Countryside',
  urban: 'Urban',
  mountain: 'Mountain',
};

const EXPERIENCE_LABELS: Record<string, string> = {
  intimate: 'Intimate',
  immersive: 'Immersive',
};

export function HomePage({ festivals, onFestivalClick, onNavigateToCalendar, onNavigateToMap, onSetAlert, alertSet = new Set() }: HomePageProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    when: 'any',
    setting: ''
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Carousel state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    // Scroll by roughly one card width + gap
    const cardWidth = el.querySelector('[data-ticket-card]')?.clientWidth || 340;
    const scrollAmount = direction === 'left' ? -(cardWidth + 12) : (cardWidth + 12);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []);

  // Editorial curation
  const intimateFestivals = festivals.filter(f => f.experienceType === 'intimate');
  const immersiveFestivals = festivals.filter(f => f.experienceType === 'immersive' || f.duration === 'week');
  const coastalFestivals = festivals.filter(f => f.experienceType === 'sea');
  const cityFestivals = festivals.filter(f => f.experienceType === 'urban');
  const mountainFestivals = festivals.filter(f => f.experienceType === 'mountain');

  // Tickets opening soon — up to 8
  const ticketsOpeningSoon = festivals
    .filter(f => f.ticketStatus === 'opening_soon' && f.nextOpeningDate)
    .sort((a, b) => {
      const dateA = new Date(a.nextOpeningDate!);
      const dateB = new Date(b.nextOpeningDate!);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        resultCount={festivals.length}
      />

      {/* Hero Section */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-4 md:pb-8">
          {/* Hero header */}
          <div className="space-y-2 md:space-y-2 mb-6 md:mb-8">
            <h1 className="text-[22px] md:text-[48px] font-bold leading-[1.15] tracking-tight text-foreground">
              Forró festivals in Europe
            </h1>
            <p className="text-[13px] md:text-lg text-muted-foreground mt-1 md:mt-1.5 leading-relaxed">
              Track the seasons. Plan where to dance.
            </p>
          </div>

          {/* Travel Search Bar — desktop */}
          <div className="hidden md:block max-w-[860px]">
            <IntegratedSearchBar
              filters={filters}
              onFilterChange={setFilters}
              resultCount={festivals.length}
              onSearch={onNavigateToCalendar}
            />
          </div>

          {/* Mobile: simplified search bar */}
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2.5 border border-border rounded-full bg-card hover:shadow-md transition-shadow h-11"
            >
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-[13px] text-muted-foreground flex-1 text-left">
                Where • When • Setting
              </span>
              <div className="w-6 h-6 bg-[#3D63FF] rounded-full flex items-center justify-center shrink-0">
                <SlidersHorizontal className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Tickets opening soon — Electric blue full-width band */}
      {ticketsOpeningSoon.length > 0 && (
        <section className="mt-4 md:mt-4 bg-[#2F5BFF]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-3.5">
            {/* Header — white on blue */}
            <div className="flex items-center justify-between mb-3 md:mb-1">
              <div>
                <h2 className="text-[15px] md:text-lg font-black tracking-tight text-white leading-tight">
                  Tickets opening soon
                </h2>
                <p className="text-[11px] md:text-[11px] text-white/70 mt-0.5 md:mt-0.5 leading-tight">
                  Don't miss early bird prices
                </p>
              </div>
              <button
                onClick={onNavigateToCalendar}
                className="hidden md:flex items-center gap-1 text-xs font-bold text-white/80 hover:text-white hover:underline shrink-0"
              >
                <span>See all in calendar</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Carousel container */}
            <div
              className="relative group/carousel"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
            >
              {/* Desktop arrow — left (subtle, hover-reveal) */}
              {canScrollLeft && (
                <button
                  onClick={() => scrollCarousel('left')}
                  className={`hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/90 backdrop-blur rounded-full shadow items-center justify-center hover:bg-white transition-all ${
                    isCarouselHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#2F5BFF]" />
                </button>
              )}

              {/* Desktop arrow — right (subtle, hover-reveal) */}
              {canScrollRight && (
                <button
                  onClick={() => scrollCarousel('right')}
                  className={`hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/90 backdrop-blur rounded-full shadow items-center justify-center hover:bg-white transition-all ${
                    isCarouselHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F5BFF]" />
                </button>
              )}

              {/* Scrollable track */}
              <div
                ref={carouselRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {ticketsOpeningSoon.map((festival, index) => {
                  const openingDate = new Date(festival.nextOpeningDate!);
                  const hasAlert = alertSet.has(festival.id);

                  return (
                    <div
                      key={festival.id}
                      data-ticket-card
                      className="flex-shrink-0 snap-start
                        w-[calc(100vw-56px)]
                        md:w-[calc((100%-8px)/3.5)]
                        bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => onFestivalClick(festival.id)}
                    >
                      <div className="flex items-center gap-2.5 px-3 py-2.5">
                        {/* Date chip — compact */}
                        <div className="shrink-0 w-10 h-10 md:w-9 md:h-9 bg-[#FFD600]/18 border border-[#FFD600]/40 rounded-md flex flex-col items-center justify-center">
                          <span className="text-[9px] font-bold text-[#7A6500] uppercase leading-none">
                            {openingDate.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className="text-[14px] font-black text-[#7A6500] leading-none mt-0.5">
                            {openingDate.getDate()}
                          </span>
                        </div>

                        {/* Festival info — max 2 lines */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[13px] md:text-[13px] leading-tight line-clamp-1 mb-0.5">
                            {festival.name}
                          </h3>
                          <p className="text-[11px] md:text-[11px] text-muted-foreground line-clamp-1">
                            {festival.location} · {festival.nextOpeningTime || '10:00'}
                          </p>
                        </div>

                        {/* Bell icon only */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSetAlert?.(festival.id);
                          }}
                          className={`shrink-0 w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors ${
                            hasAlert
                              ? 'bg-[#2F5BFF] text-white'
                              : 'bg-[#2F5BFF]/10 text-[#2F5BFF] hover:bg-[#2F5BFF]/20'
                          }`}
                          title={hasAlert ? 'Alert set' : 'Set alert'}
                        >
                          <Bell className="w-3.5 h-3.5 md:w-3.5 md:h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EDITORIAL SECTIONS */}
      <div id="editorial-sections">
        {intimateFestivals.length > 0 && (
          <HorizontalScrollSection
            title="Intimate gatherings"
            description="Lower capacity events. Community-focused."
            festivals={intimateFestivals}
            onFestivalClick={onFestivalClick}
            isAnchor={true}
            maxItems={6}
          />
        )}

        {immersiveFestivals.length > 0 && (
          <HorizontalScrollSection
            title="Immersive weeks"
            description="Extended formats designed for deeper immersion in Forró."
            festivals={immersiveFestivals}
            onFestivalClick={onFestivalClick}
            isAnchor={true}
            maxItems={6}
          />
        )}

        {coastalFestivals.length > 0 && (
          <HorizontalScrollSection
            title="Coastal festivals"
            description="Festivals hosted near seaside towns."
            festivals={coastalFestivals}
            onFestivalClick={onFestivalClick}
            maxItems={6}
          />
        )}

        {cityFestivals.length > 0 && (
          <HorizontalScrollSection
            title="City festivals"
            description="Urban festivals combined with exploring European capitals."
            festivals={cityFestivals}
            onFestivalClick={onFestivalClick}
            maxItems={6}
          />
        )}

        {mountainFestivals.length > 0 && (
          <HorizontalScrollSection
            title="Mountain festivals"
            description="Dance surrounded by alpine landscapes."
            festivals={mountainFestivals}
            onFestivalClick={onFestivalClick}
            maxItems={6}
          />
        )}
      </div>

      {/* PLAN WITH FRIENDS */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-[#2F5BFF]/[0.04] border border-[#2F5BFF]/10 rounded-xl p-6 md:p-8 max-w-2xl">
            <h3 className="text-lg md:text-xl font-black tracking-tight text-foreground mb-2">
              Plan with friends
            </h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Save the festivals you're interested in, compare dates, and share a read-only list with your dance friends to plan the season together.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="gap-2 font-bold border-[#2F5BFF]/20 text-[#2F5BFF] hover:bg-[#2F5BFF] hover:text-white transition-colors"
                onClick={() => {
                  const el = document.getElementById('editorial-sections');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Bookmark className="w-4 h-4" />
                Save festivals
              </Button>
              <Button
                variant="outline"
                className="gap-2 font-bold border-[#2F5BFF]/20 text-[#2F5BFF] hover:bg-[#2F5BFF] hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share a list
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-border bg-background pb-4 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 text-sm mb-8 md:mb-10">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-5 h-5 bg-[#0E7C66] rounded-sm flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-sm">Verified information</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Festival details confirmed with organizers.
              </p>
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-5 h-5 bg-[#0E7C66] rounded-sm flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-sm">No commercial interest</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No ticket sales, no commissions.
              </p>
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-5 h-5 bg-[#0E7C66] rounded-sm flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-sm">Built by dancers</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For the European Forró community.
              </p>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-muted-foreground text-sm">
            <p className="font-medium">© 2026 Forró Europe · Independent guide</p>
            <a 
              href="#about" 
              className="hover:text-[#2F5BFF] hover:underline transition-colors font-medium"
            >
              About this guide
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}