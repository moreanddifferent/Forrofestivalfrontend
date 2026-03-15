import { MapPin, X, Waves, TreePine, Building2, Mountain, Info } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { YellowUnderlineTitle } from './YellowUnderlineTitle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from './ui/sheet';

type LocationType = 'sea' | 'countryside' | 'urban' | 'mountain';

interface Festival {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  locationType: LocationType;
  coordinates: { lat: number; lng: number };
}

interface MapViewProps {
  festivals: Festival[];
  onFestivalClick: (festivalId: string) => void;
}

const locationTypeLabels: Record<LocationType, string> = {
  sea: 'By the Sea',
  countryside: 'Countryside',
  urban: 'Urban',
  mountain: 'Mountain',
};

// Color coding for location types — updated warm palette
const locationTypeColors: Record<LocationType, string> = {
  sea: '#3D63FF',        // bright electric blue
  countryside: '#22C55E', // fresh green
  urban: '#1F1F1C',      // deep warm charcoal
  mountain: '#F6D94C',   // warm yellow
};

// Icons for location type differentiation inside pins
const locationTypeIcons: Record<LocationType, typeof Waves> = {
  sea: Waves,
  countryside: TreePine,
  urban: Building2,
  mountain: Mountain,
};

export function MapView({ festivals, onFestivalClick }: MapViewProps) {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 10) / 40) * 900 + 50;
    const y = ((70 - lat) / 35) * 500 + 50;
    return { x, y };
  };

  const handlePinClick = (festival: Festival) => {
    setSelectedFestival(festival);
  };

  const handleClosePopup = () => {
    setSelectedFestival(null);
  };

  return (
    <div className="w-full h-full min-h-[600px] bg-background border border-border rounded-xl overflow-hidden relative">
      {/* Mobile: Legend button (opens bottom sheet) */}
      <div className="md:hidden">
        <Sheet open={isLegendOpen} onOpenChange={setIsLegendOpen}>
          <SheetTrigger asChild>
            <button className="absolute top-2 left-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-2.5 py-1.5 shadow-lg z-10 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] font-bold text-foreground">Location types</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>Location types</SheetTitle>
              <SheetDescription>
                Different types of festival locations
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-3">
              {(Object.keys(locationTypeLabels) as LocationType[]).map(type => {
                const Icon = locationTypeIcons[type];
                const color = locationTypeColors[type];
                return (
                  <div key={type} className="flex items-center gap-3 text-sm">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{locationTypeLabels[type]}</span>
                  </div>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Legend panel */}
      <div className="hidden md:block absolute top-4 left-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-10">
        <h3 className="text-[10px] font-bold mb-2 uppercase tracking-widest text-muted-foreground">Location type</h3>
        <div className="space-y-1.5">
          {(Object.keys(locationTypeLabels) as LocationType[]).map(type => {
            const Icon = locationTypeIcons[type];
            const color = locationTypeColors[type];
            return (
              <div key={type} className="flex items-center gap-2 text-xs text-foreground">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span>{locationTypeLabels[type]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Canvas */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full bg-muted/10"
        style={{ minHeight: '600px' }}
      >
        {/* Simplified Europe outline */}
        <g opacity="0.06" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 100 500 Q 150 450 200 480 L 300 450 L 400 420 L 500 400 L 600 390 L 700 400 L 750 380" />
          <path d="M 200 480 L 180 520 L 200 550" />
          <path d="M 400 200 L 450 180 L 500 200 L 550 180 L 600 200" />
        </g>

        {/* Festival Pins — neutral grey default, electric blue on select/hover */}
        {festivals.map(festival => {
          const { x, y } = projectCoordinates(festival.coordinates.lat, festival.coordinates.lng);
          const isHovered = hoveredPin === festival.id;
          const isSelected = selectedFestival?.id === festival.id;
          const isActive = isHovered || isSelected;

          // Neutral grey by default, electric blue when active
          const pinFill = isActive ? '#3D63FF' : locationTypeColors[festival.locationType];
          const pinStroke = isActive ? '#3D63FF' : '#ffffff';
          const pinRadius = isActive ? 12 : 9;

          return (
            <g key={festival.id}>
              {/* Pin shadow */}
              <circle
                cx={x}
                cy={y + 2}
                r={pinRadius}
                fill="black"
                opacity="0.08"
              />

              {/* Pin outer */}
              <circle
                cx={x}
                cy={y}
                r={pinRadius}
                fill={pinFill}
                stroke={pinStroke}
                strokeWidth="2.5"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredPin(festival.id)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => handlePinClick(festival)}
              />

              {/* Pin inner icon area — white center with subtle icon hint */}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 5 : 3.5}
                fill="white"
                opacity={isActive ? 1 : 0.7}
                className="cursor-pointer pointer-events-none"
              />

              {/* Selected yellow highlight ring */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r={16}
                  fill="none"
                  stroke="#FFD600"
                  strokeWidth="2"
                  opacity="0.5"
                  className="pointer-events-none"
                />
              )}

              {/* Hover label: name + dates */}
              {isHovered && !isSelected && (
                <g>
                  <rect
                    x={x - 80}
                    y={y - 52}
                    width="160"
                    height="40"
                    rx="6"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.97"
                  />
                  <text
                    x={x}
                    y={y - 36}
                    textAnchor="middle"
                    className="text-xs font-bold"
                    fill="currentColor"
                  >
                    {festival.name}
                  </text>
                  <text
                    x={x}
                    y={y - 22}
                    textAnchor="middle"
                    className="text-[10px]"
                    fill="#6B7280"
                  >
                    {festival.dates}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Festival Popup */}
      {selectedFestival && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="pointer-events-auto bg-background border border-border rounded-xl shadow-2xl p-5 md:p-6 max-w-sm mx-4">
            {/* Close button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="space-y-3">
              {/* Location type badge — subtle neutral */}
              <div className="flex items-center gap-2">
                {(() => {
                  const Icon = locationTypeIcons[selectedFestival.locationType];
                  return (
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-gray-500" />
                    </div>
                  );
                })()}
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {locationTypeLabels[selectedFestival.locationType]}
                </span>
              </div>

              {/* Festival info */}
              <div>
                <h3 className="text-lg font-bold mb-1.5">{selectedFestival.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedFestival.location}, {selectedFestival.country}
                  </p>
                  <p className="ml-6">{selectedFestival.dates}</p>
                </div>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full bg-[#3D63FF] hover:bg-[#2952E5] text-white font-bold"
                onClick={() => {
                  onFestivalClick(selectedFestival.id);
                  handleClosePopup();
                }}
              >
                View festival
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}