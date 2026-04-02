import { useState } from 'react';
import { MapPin, Calendar, X, Share2, Bookmark, Map, List, Pencil, Check, CalendarPlus } from 'lucide-react';
import { Button } from './ui/button';
import { UnifiedTicketChip } from './UnifiedTicketChip';
import { CalendarExportModal } from './CalendarExportModal';

interface SavedFestival {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  image: string;
  locationType: 'sea' | 'countryside' | 'urban' | 'mountain';
  savedAt: Date;
  ticketStatus?: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  nextOpeningDate?: string;
  currentPrice?: string;
}

interface MySeasonProps {
  savedFestivals: SavedFestival[];
  onRemove: (festivalId: string) => void;
  onShareClick: () => void;
  onExploreFestivals?: () => void;
  listName?: string;
  onListNameChange?: (name: string) => void;
}

type ViewMode = 'list' | 'map';

export function MySeason({ 
  savedFestivals, 
  onRemove,
  onShareClick, 
  onExploreFestivals,
  listName = 'My Summer 2026',
  onListNameChange
}: MySeasonProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(listName);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  
  const currentDate = new Date(2026, 2, 15); // March 15, 2026
  const upcomingFestivals = savedFestivals.filter(f => f.endDate >= currentDate);

  // Sort by festival date (earlier first)
  const sortedFestivals = [...upcomingFestivals].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  // Calculate stats for header
  const totalSaved = upcomingFestivals.length;

  // Count upcoming ticket openings (within next 30 days)
  const upcomingTicketOpenings = upcomingFestivals.filter(f => {
    if (!f.nextOpeningDate) return false;
    const openingDate = new Date(f.nextOpeningDate);
    const thirtyDaysFromNow = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    return openingDate >= currentDate && openingDate <= thirtyDaysFromNow;
  }).length;

  const handleSaveName = () => {
    if (onListNameChange && editedName.trim()) {
      onListNameChange(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setEditedName(listName);
    setIsEditingName(false);
  };

  // Prepare festivals for map
  const mapFestivals = sortedFestivals.map(festival => {
    // Mock coordinates for European cities
    const coordinates: Record<string, { lat: number; lng: number }> = {
      'Cascais': { lat: 38.7, lng: -9.4 },
      'Barcelona': { lat: 41.4, lng: 2.2 },
      'Porto': { lat: 41.2, lng: -8.6 },
      'Aix-en-Provence': { lat: 43.5, lng: 5.4 },
      'Lisbon': { lat: 38.7, lng: -9.1 },
      'Chamonix': { lat: 45.9, lng: 6.9 },
      'Amsterdam': { lat: 52.4, lng: 4.9 },
      'Lagos': { lat: 37.1, lng: -8.7 },
    };

    const coords = coordinates[festival.location] || { lat: 48.9, lng: 2.4 };

    return {
      ...festival,
      lat: coords.lat,
      lng: coords.lng,
    };
  });

  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(null);
  const selectedFestival = selectedFestivalId ? mapFestivals.find(f => f.id === selectedFestivalId) : null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Calendar Export Modal */}
      <CalendarExportModal 
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        savedFestivals={upcomingFestivals}
      />

      {/* Page Header - Utility focused */}
      <section className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveName();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    className="bg-card border border-[#3D63FF] rounded px-2 py-1 text-lg md:text-2xl font-bold focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1.5 text-[#22C55E] hover:bg-[#22C55E]/10 rounded transition-colors"
                    title="Save"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1.5 text-muted-foreground hover:bg-muted rounded transition-colors"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-lg md:text-2xl font-bold leading-tight">
                    {listName}
                  </h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    title="Rename list"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <p className="text-sm text-muted-foreground mb-1.5">
                {totalSaved} {totalSaved === 1 ? 'festival' : 'festivals'} saved
              </p>
              
              {/* Contextual helper for ticket openings */}
              {upcomingTicketOpenings > 0 && (
                <p className="text-xs text-muted-foreground">
                  {upcomingTicketOpenings} saved {upcomingTicketOpenings === 1 ? 'festival has' : 'festivals have'} ticket openings coming up
                </p>
              )}
            </div>

            {/* Actions */}
            {upcomingFestivals.length > 0 && (
              <div className="flex items-center gap-4">
                {/* View mode toggle */}
                <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
                      viewMode === 'list'
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="List view"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">List</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
                      viewMode === 'map'
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Map view"
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Map</span>
                  </button>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Add to calendar - Primary action */}
                  <Button 
                    onClick={() => setShowCalendarModal(true)} 
                    size="sm" 
                    className="gap-2 bg-[#3D63FF] hover:bg-[#2952E5] text-white font-bold"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to calendar</span>
                  </Button>

                  {/* Share - Secondary action */}
                  <Button 
                    onClick={onShareClick} 
                    variant="ghost"
                    size="sm" 
                    className="gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Empty state */}
      {upcomingFestivals.length === 0 && (
        <section className="py-12 md:py-20">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Bookmark className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">No saved festivals yet</h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Start building your season by saving festivals you're interested in
            </p>
            <Button onClick={onExploreFestivals} className="bg-[#3D63FF] hover:bg-[#2952E5] text-white font-bold">
              Browse festivals
            </Button>
          </div>
        </section>
      )}

      {/* List View - Compact shortlist style */}
      {upcomingFestivals.length > 0 && viewMode === 'list' && (
        <section className="py-4 md:py-6">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {sortedFestivals.map(festival => {
                const isUrgent = festival.ticketStatus === 'opening_soon' && 
                  festival.nextOpeningDate && 
                  new Date(festival.nextOpeningDate) <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

                return (
                  <FestivalCard
                    key={festival.id}
                    festival={festival}
                    onRemove={onRemove}
                    isUrgent={isUrgent}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Map View */}
      {upcomingFestivals.length > 0 && viewMode === 'map' && (
        <section className="py-4 md:py-6">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="relative w-full aspect-[4/3] bg-[#F8F9FA]">
                    <EuropeMap 
                      festivals={mapFestivals} 
                      selectedFestivalId={selectedFestivalId}
                      onSelectFestival={setSelectedFestivalId}
                    />
                  </div>
                </div>
              </div>

              {/* Side Panel */}
              <div className="lg:col-span-1">
                {selectedFestival ? (
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="relative h-40 bg-muted">
                      <img
                        src={selectedFestival.image}
                        alt={selectedFestival.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSelectedFestivalId(null)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="p-3 space-y-2.5">
                      <h3 className="font-bold text-base leading-tight">{selectedFestival.name}</h3>
                      
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{selectedFestival.location}, {selectedFestival.country}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>{selectedFestival.dates}</span>
                        </div>
                      </div>

                      {selectedFestival.ticketStatus && (
                        <div>
                          <UnifiedTicketChip
                            status={selectedFestival.ticketStatus}
                            currentPrice={selectedFestival.currentPrice}
                            nextOpeningDate={selectedFestival.nextOpeningDate}
                            size="sm"
                          />
                        </div>
                      )}

                      <Button
                        onClick={() => onRemove(selectedFestival.id)}
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 text-destructive hover:text-destructive mt-2"
                      >
                        <X className="w-3.5 h-3.5" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-xl p-8 text-center">
                    <Map className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click on a marker to see festival details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

interface FestivalCardProps {
  festival: SavedFestival;
  onRemove: (festivalId: string) => void;
  isUrgent?: boolean;
}

// Compact card - smaller than homepage cards
function FestivalCard({ festival, onRemove, isUrgent = false }: FestivalCardProps) {
  return (
    <div className={`bg-card border rounded-lg overflow-hidden hover:shadow-md transition-all group ${
      isUrgent ? 'border-[#3D63FF] ring-2 ring-[#3D63FF]/20' : 'border-border'
    }`}>
      {/* Reduced image height for compactness */}
      <div className="relative h-28 bg-muted">
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onRemove(festival.id)}
          className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Remove"
        >
          <X className="w-3.5 h-3.5 text-[#FF6B57]" />
        </button>
      </div>

      {/* Compact content */}
      <div className="p-3 space-y-1.5">
        <h3 className="font-bold text-sm leading-tight line-clamp-1">
          {festival.name}
        </h3>

        <div className="space-y-0.5 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{festival.location}, {festival.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5 shrink-0" />
            <span>{festival.dates}</span>
          </div>
        </div>

        {festival.ticketStatus && (
          <div className="pt-0.5">
            <UnifiedTicketChip
              status={festival.ticketStatus}
              currentPrice={festival.currentPrice}
              nextOpeningDate={festival.nextOpeningDate}
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface EuropeMapProps {
  festivals: any[];
  selectedFestivalId: string | null;
  onSelectFestival: (id: string | null) => void;
}

function EuropeMap({ festivals, selectedFestivalId, onSelectFestival }: EuropeMapProps) {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      {/* Simplified Europe outline */}
      <path
        d="M 100 50 L 700 50 L 750 150 L 750 450 L 600 550 L 200 550 L 100 450 Z"
        fill="#F5F1E8"
        stroke="#E7E0D4"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Festival markers */}
      {festivals.map((festival, idx) => {
        const x = ((festival.lng + 10) / 50) * 800;
        const y = ((65 - festival.lat) / 40) * 600;
        const isSelected = selectedFestivalId === festival.id;
        
        return (
          <g 
            key={festival.id}
            onClick={() => onSelectFestival(isSelected ? null : festival.id)}
            className="cursor-pointer"
          >
            {/* Selection ring */}
            {isSelected && (
              <circle
                cx={x}
                cy={y}
                r={20}
                fill="none"
                stroke="#3D63FF"
                strokeWidth="2"
                opacity="0.4"
              />
            )}
            
            {/* Marker circle */}
            <circle
              cx={x}
              cy={y}
              r={14}
              fill={isSelected ? '#3D63FF' : '#22C55E'}
              stroke="white"
              strokeWidth="3"
              opacity={isSelected ? 1 : 0.9}
              className="transition-all"
            />
            
            {/* Number */}
            <text
              x={x}
              y={y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
              pointerEvents="none"
            >
              {idx + 1}
            </text>

            {/* Festival name label on selection */}
            {isSelected && (
              <foreignObject 
                x={x - 60} 
                y={y - 45} 
                width="120" 
                height="30"
                pointerEvents="none"
              >
                <div className="flex justify-center">
                  <div className="bg-gray-900/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap">
                    {festival.name.length > 20 ? festival.location : festival.name}
                  </div>
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </svg>
  );
}