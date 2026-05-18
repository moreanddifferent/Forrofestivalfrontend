import { MapPin, Calendar, Map, List, User } from 'lucide-react';
import { UnifiedTicketChip } from './UnifiedTicketChip';
import { useState } from 'react';

export interface SharedFestival {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  startDate: Date;
  endDate: Date;
  image: string;
  ticketStatus?: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  nextOpeningDate?: string;
  currentPrice?: string;
}

interface SharedPlanProps {
  ownerName: string;
  ownerAvatar?: string;
  festivals: SharedFestival[];
}

type ViewMode = 'list' | 'map';

export function SharedPlan({ ownerName, ownerAvatar, festivals }: SharedPlanProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  // Sort by festival date (earlier first)
  const sortedFestivals = [...festivals].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

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
      {/* Page Header - Read-only shared view */}
      <section className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-lg md:text-2xl font-bold leading-tight mb-2">
                {ownerName}'s saved festivals
              </h1>
              <div className="flex items-center gap-2">
                {ownerAvatar ? (
                  <img 
                    src={ownerAvatar} 
                    alt={ownerName}
                    className="w-6 h-6 rounded-full border-2 border-background"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#3D63FF] flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  {sortedFestivals.length} {sortedFestivals.length === 1 ? 'festival' : 'festivals'}
                </p>
              </div>
            </div>

            {/* View mode toggle */}
            {sortedFestivals.length > 0 && (
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
            )}
          </div>
        </div>
      </section>

      {/* Empty state */}
      {sortedFestivals.length === 0 && (
        <section className="py-12 md:py-20">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Map className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">No saved festivals yet</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {ownerName} hasn't saved any festivals yet
            </p>
          </div>
        </section>
      )}

      {/* List View - Compact read-only cards */}
      {sortedFestivals.length > 0 && viewMode === 'list' && (
        <section className="py-4 md:py-6">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {sortedFestivals.map(festival => (
                <FestivalCard key={festival.id} festival={festival} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map View */}
      {sortedFestivals.length > 0 && viewMode === 'map' && (
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
  festival: SharedFestival;
}

// Compact read-only card
function FestivalCard({ festival }: FestivalCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all">
      {/* Reduced image height */}
      <div className="relative h-28 bg-muted">
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover"
        />
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