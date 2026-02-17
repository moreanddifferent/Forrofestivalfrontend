import { Calendar, Bell, ArrowRight, CheckCircle2, Map, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { FestivalCard } from './FestivalCard';
import { IntegratedSearchBar, SearchFilters } from './IntegratedSearchBar';
import { FilterModal } from './FilterModal';
import { SectionHeader } from './SectionHeader';
import { HorizontalScrollSection } from './HorizontalScrollSection';
import { useState } from 'react';

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
}

interface HomePageProps {
  festivals: FestivalCardData[];
  onFestivalClick: (festivalId: string) => void;
  onNavigateToCalendar: () => void;
  onNavigateToMap: () => void;
}

export function HomePage({ festivals, onFestivalClick, onNavigateToCalendar, onNavigateToMap }: HomePageProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    when: 'any',
    setting: ''
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Editorial curation
  const smallFestivals = festivals.filter(f => f.experienceType === 'intimate');
  const coastalFestivals = festivals.filter(f => f.experienceType === 'sea');
  const cityFestivals = festivals.filter(f => f.experienceType === 'urban');
  const mountainFestivals = festivals.filter(f => f.experienceType === 'mountain');
  const weekLongFestivals = festivals.filter(f => f.duration === 'week');

  // Upcoming - upcoming festivals and those with opening_soon status
  const getUpcomingFestivals = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    return festivals
      .filter(f => {
        // Include festivals with opening_soon status OR happening soon
        if (f.ticketStatus === 'opening_soon') return true;
        
        const dateMatch = f.dates.match(/(\w+)\s+(\d+)-(\d+),\s+(\d+)/);
        if (!dateMatch) return false;
        
        const [, month] = dateMatch;
        const monthIndex = new Date(`${month} 1, 2000`).getMonth();
        
        // Show festivals happening in next 3 months
        return monthIndex >= 4 && monthIndex <= 7; // May-August
      })
      .slice(0, 4);
  };

  const upcomingFestivals = getUpcomingFestivals();

  return (
    <div className="min-h-screen bg-background">
      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        resultCount={festivals.length}
      />

      {/* Hero Section - MOBILE OPTIMIZED */}
      <section className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-4 md:py-12">
          <div className="mb-4 md:mb-6">
            <h1 className="text-[28px] md:text-[52px] font-bold mb-1 md:mb-2 leading-[1.1] tracking-tight">
              Forró festivals in Europe
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Track the season. Plan where to dance.
            </p>
          </div>

          {/* Desktop: Search Bar */}
          <div className="hidden md:block">
            <IntegratedSearchBar
              filters={filters}
              onFilterChange={setFilters}
              resultCount={festivals.length}
            />
          </div>
        </div>
      </section>

      {/* UPCOMING - COMPACT BLUE STRIP */}
      {upcomingFestivals.length > 0 && (
        <section className="bg-[#0048FF]">
          <div className="px-4 md:px-6 md:max-w-6xl md:mx-auto py-3 md:py-5">
            <h2 className="text-[10px] font-black tracking-[0.25em] text-white mb-2 md:mb-3 uppercase">
              Upcoming
            </h2>
            
            {/* Mobile: Horizontal scroll with snap */}
            <div className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
              <div className="flex gap-2 pb-1">
                {upcomingFestivals.slice(0, 4).map(festival => (
                  <div
                    key={festival.id}
                    onClick={() => onFestivalClick(festival.id)}
                    className="flex-shrink-0 w-[85vw] snap-start bg-white rounded-sm shadow-lg active:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                  >
                    {/* Compact image - max 200px */}
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={festival.image}
                        alt={festival.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Compact content */}
                    <div className="p-2.5">
                      <h3 className="font-black text-xs leading-tight line-clamp-1 text-foreground mb-1">
                        {festival.name}
                      </h3>
                      <p className="text-[10px] font-medium text-muted-foreground line-clamp-1 mb-1.5">
                        {festival.location} · {festival.dates}
                      </p>
                      {festival.ticketStatus === 'opening_soon' && festival.nextOpeningDate ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#0048FF] text-white rounded-sm text-[10px] font-bold">
                          Opens {new Date(festival.nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      ) : festival.ticketStatus === 'open_now' ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#0048FF] text-white rounded-sm text-[10px] font-bold">
                          <span className="w-1 h-1 bg-white rounded-full" />
                          <span>Open</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-muted-foreground rounded-sm text-[10px] font-medium">
                          {festival.ticketStatus === 'sold_out' ? 'Sold out' : 'TBA'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Horizontal cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-3">
              {upcomingFestivals.slice(0, 3).map(festival => (
                <div
                  key={festival.id}
                  onClick={() => onFestivalClick(festival.id)}
                  className="group bg-white rounded-sm shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden flex"
                >
                  {/* Image - 40% */}
                  <div className="relative w-[40%] overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={festival.image}
                        alt={festival.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Content - 60% */}
                  <div className="w-[60%] p-2 flex flex-col justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-black text-xs leading-tight line-clamp-2 text-foreground">
                        {festival.name}
                      </h3>
                      <p className="text-[10px] font-medium text-muted-foreground line-clamp-1">
                        {festival.location}
                      </p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                        {festival.dates}
                      </p>
                    </div>
                    <div className="pt-1">
                      {festival.ticketStatus === 'opening_soon' && festival.nextOpeningDate ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#0048FF] text-white rounded-sm text-[10px] font-bold group-hover:bg-[#F5FF00] group-hover:text-black transition-colors duration-200">
                          Opens {new Date(festival.nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      ) : festival.ticketStatus === 'open_now' ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#0048FF] text-white rounded-sm text-[10px] font-bold group-hover:bg-[#F5FF00] group-hover:text-black transition-colors duration-200">
                          <span className="w-1 h-1 bg-white group-hover:bg-black rounded-full" />
                          <span>Open</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-muted-foreground rounded-sm text-[10px] font-medium">
                          {festival.ticketStatus === 'sold_out' ? 'Sold out' : 'TBA'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Small Festivals */}
      {smallFestivals.length > 0 && (
        <HorizontalScrollSection
          title="Small festivals"
          description="Lower capacity events. Community-focused."
          festivals={smallFestivals}
          onFestivalClick={onFestivalClick}
        />
      )}

      {/* Coastal Festivals */}
      {coastalFestivals.length > 0 && (
        <HorizontalScrollSection
          title="Coastal festivals"
          description="Festivals hosted near seaside towns."
          festivals={coastalFestivals}
          onFestivalClick={onFestivalClick}
        />
      )}

      {/* Week-long Festivals */}
      {weekLongFestivals.length > 0 && (
        <HorizontalScrollSection
          title="Week-long festivals"
          description="Extended formats designed for immersion."
          festivals={weekLongFestivals}
          onFestivalClick={onFestivalClick}
        />
      )}

      {/* City Festivals */}
      {cityFestivals.length > 0 && (
        <HorizontalScrollSection
          title="City festivals"
          description="Urban festivals combined with exploring European capitals."
          festivals={cityFestivals}
          onFestivalClick={onFestivalClick}
        />
      )}

      {/* Mountain Festivals */}
      {mountainFestivals.length > 0 && (
        <HorizontalScrollSection
          title="Mountain festivals"
          description="Dance surrounded by alpine landscapes."
          festivals={mountainFestivals}
          onFestivalClick={onFestivalClick}
        />
      )}

      {/* Planning Tools */}
      <section className="pt-5 md:pt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {/* Map */}
            <div className="space-y-2 md:space-y-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0057FF] flex items-center justify-center">
                <Map className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-black">Explore by location</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                See festivals on a map. Discover what's happening near coastal towns, mountain retreats, or urban centers.
              </p>
              <Button 
                variant="outline" 
                className="gap-2 mt-3 md:mt-4 border-2 border-black hover:bg-[#0057FF] hover:text-white hover:border-[#0057FF] transition-colors font-bold w-full md:w-auto"
                onClick={onNavigateToMap}
              >
                <span>Open Map</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Calendar */}
            <div className="space-y-2 md:space-y-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0057FF] flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-black">Plan with the calendar</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                See all ticket openings and festival dates in one timeline. Track what's coming up.
              </p>
              <Button 
                variant="outline" 
                className="gap-2 mt-3 md:mt-4 border-2 border-black hover:bg-[#0057FF] hover:text-white hover:border-[#0057FF] transition-colors font-bold w-full md:w-auto"
                onClick={onNavigateToCalendar}
              >
                <span>Open Calendar</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Alerts */}
            <div className="space-y-2 md:space-y-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0057FF] flex items-center justify-center">
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-black">Never miss a ticket</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Save festivals to get notified when tickets open. Track specific lots.
              </p>
              <Button 
                variant="outline" 
                className="gap-2 mt-3 md:mt-4 border-2 border-black hover:bg-[#0057FF] hover:text-white hover:border-[#0057FF] transition-colors font-bold w-full md:w-auto"
                onClick={() => {
                  const element = document.getElementById('festivals');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Browse Festivals</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t-2 border-black bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-sm mb-6 md:mb-8">
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <div className="w-5 h-5 bg-[#0057FF] flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-black text-sm">Verified information</span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm">
                Festival details confirmed with organizers.
              </p>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <div className="w-5 h-5 bg-[#0057FF] flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-black text-sm">No commercial interest</span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm">
                No ticket sales, no commissions.
              </p>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <div className="w-5 h-5 bg-[#0057FF] flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-black text-sm">Built by dancers</span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm">
                For the European Forró community.
              </p>
            </div>
          </div>

          <div className="pt-4 md:pt-6 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-muted-foreground text-xs">
            <p className="font-bold">© 2026 Forró Europe · Independent guide</p>
            <a 
              href="#about" 
              className="hover:text-[#0057FF] hover:underline transition-colors font-bold"
            >
              About this guide
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}