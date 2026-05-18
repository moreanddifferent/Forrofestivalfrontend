import { Bell, ArrowRight, CheckCircle2, Bookmark, Share2, MapPin, Layers, ChevronLeft, ChevronRight, Search, Calendar, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { HorizontalScrollSection } from './HorizontalScrollSection';
import { FilterModal } from './FilterModal';
import { IntegratedSearchBar, SearchFilters } from './IntegratedSearchBar';
import { useState, useRef, useCallback, useEffect } from 'react';
import { TypewriterText } from './TypewriterText';

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
      <section className="hero-bg relative overflow-hidden">
        {/* Decorative brush marks */}
<div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-20 pb-6 md:pb-10 text-center">
          {/* Hero header */}
          <div className="mb-6 md:mb-10">
            <h1 className="text-[48px] md:text-[84px] leading-[0.95] tracking-tight text-foreground">
              <span className="forro-script block">
                <span className="organic-underline">Forró festivals</span>
              </span>
              <span className="forro-script block mt-1 md:mt-2">
                across Europe
              </span>
            </h1>
            <p className="text-[20px] md:text-[28px] font-semibold tracking-tight text-slate-700 leading-[1.3] mt-6 md:mt-8 min-h-[1.4em]">
              <TypewriterText text={'Plan where to dance next'} />
            </p>
          </div>

          {/* Travel Search Bar — desktop */}
          <div className="hidden md:block max-w-[860px] mx-auto">
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
              className="w-full flex items-center gap-2 px-4 py-3 border border-border rounded-full bg-card hover:shadow-md transition-shadow"
            >
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-[14px] text-muted-foreground flex-1 text-left">
                Where • When • Setting
              </span>
              <div className="w-7 h-7 bg-[#3D63FF] rounded-full flex items-center justify-center shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Tickets opening soon — Electric blue full-width band */}
      {ticketsOpeningSoon.length > 0 && (
        <section className="mt-2 md:mt-2 bg-[#2F5BFF]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-3.5">
            {/* Header — white on blue */}
            <div className="flex items-center justify-between mb-4 md:mb-1">
              <div>
                <h2 className="text-[16px] md:text-lg font-black tracking-tight text-white leading-tight">
                  Tickets opening soon
                </h2>
                <p className="text-[12px] md:text-[11px] text-white/70 mt-1 md:mt-0.5 leading-tight micro-note">
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
                        bg-white rounded-lg shadow-soft hover:shadow-soft-lg smooth-hover cursor-pointer"
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
            description="Small weekends where everyone ends up knowing each other."
            festivals={intimateFestivals}
            onFestivalClick={onFestivalClick}
            isAnchor={true}
            maxItems={4}
          />
        )}

        {immersiveFestivals.length > 0 && (
          <HorizontalScrollSection
            title="Immersive weeks"
            description="Longer stays built around music, dance, and community."
            festivals={immersiveFestivals}
            onFestivalClick={onFestivalClick}
            isAnchor={true}
            maxItems={4}
          />
        )}

        {coastalFestivals.length > 0 && (
          <HorizontalScrollSection
            title="Coastal festivals"
            description="Dance all night. Swim in the morning."
            festivals={coastalFestivals}
            onFestivalClick={onFestivalClick}
            maxItems={4}
          />
        )}

        {cityFestivals.length > 0 && (
          <HorizontalScrollSection
            title="City festivals"
            description="Urban weekends with strong local scenes."
            festivals={cityFestivals}
            onFestivalClick={onFestivalClick}
            maxItems={4}
          />
        )}

        {mountainFestivals.length > 0 && (
          <HorizontalScrollSection
            title="Mountain festivals"
            description="Fresh air, close dances, and nature-led weekends."
            festivals={mountainFestivals}
            onFestivalClick={onFestivalClick}
            maxItems={2}
          />
        )}
      </div>

      {/* PLAN WITH FRIENDS */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="separator-organic mb-8 md:mb-12"></div>
          <div className="border-l-4 border-[#2F5BFF] pl-5 md:pl-6 max-w-2xl">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground mb-2">
              Plan with friends
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed">
              Save festivals you're considering. Compare dates. Share your season with dance friends.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                className="gap-2 font-bold bg-[#2F5BFF] text-white hover:bg-[#1A44E0] shadow-soft"
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
                className="gap-2 font-bold border-[#2F5BFF] text-[#2F5BFF] hover:bg-[#2F5BFF] hover:text-white"
              >
                <Share2 className="w-4 h-4" />
                Share a list
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-10 pb-4 md:pb-6">
          {/* Built by dancers — signature + details */}
          <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto">
            <div className="text-[22px] md:text-[28px] leading-[1] text-foreground">
              <span className="forro-script">
                <span className="organic-underline">Built by dancers</span>
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">
              An independent guide made by the Forró community, for the Forró community.
            </p>
            <div className="mt-4 md:mt-5 flex flex-col sm:flex-row justify-center gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground">
              <p><span className="font-bold text-foreground">Verified information</span> — confirmed directly with festival organizers.</p>
              <p><span className="font-bold text-foreground">No commercial interest</span> — no ticket sales, no commissions, no affiliations.</p>
            </div>
          </div>

          <div className="pt-4 md:pt-5">
            <div className="separator-organic mb-4 md:mb-5"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-muted-foreground text-sm">
              <p className="font-medium">© 2026 Forró Europe · Independent guide</p>
              <a
                href="#about"
                className="hover:text-[#2F5BFF] hover:underline smooth-hover-fast font-medium"
              >
                About this guide
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}