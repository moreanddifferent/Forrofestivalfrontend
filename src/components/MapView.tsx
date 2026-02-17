import { MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

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

const locationTypeColors = {
  sea: '#0EA5E9',      // Sky blue
  countryside: '#22C55E', // Green
  urban: '#F59E0B',    // Amber
  mountain: '#8B5CF6', // Purple
};

const locationTypeLabels = {
  sea: 'By the Sea',
  countryside: 'Countryside',
  urban: 'Urban',
  mountain: 'Mountain',
};

export function MapView({ festivals, onFestivalClick }: MapViewProps) {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  // Simple projection for demo - maps lat/lng to SVG coordinates
  const projectCoordinates = (lat: number, lng: number) => {
    // Europe bounds roughly: lat 35-70, lng -10-30
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
    <div className="w-full h-full min-h-[600px] bg-background border border-border rounded-2xl overflow-hidden relative">
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-10">
        <h3 className="text-sm font-semibold mb-2">Location Types</h3>
        <div className="space-y-1.5">
          {(Object.keys(locationTypeLabels) as LocationType[]).map(type => (
            <div key={type} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: locationTypeColors[type] }}
              />
              <span className="text-muted-foreground">{locationTypeLabels[type]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Canvas */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full bg-muted/20"
        style={{ minHeight: '600px' }}
      >
        {/* Simplified Europe outline for context */}
        <g opacity="0.1" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 100 500 Q 150 450 200 480 L 300 450 L 400 420 L 500 400 L 600 390 L 700 400 L 750 380" />
          <path d="M 200 480 L 180 520 L 200 550" />
          <path d="M 400 200 L 450 180 L 500 200 L 550 180 L 600 200" />
        </g>

        {/* Festival Pins */}
        {festivals.map(festival => {
          const { x, y } = projectCoordinates(festival.coordinates.lat, festival.coordinates.lng);
          const isHovered = hoveredPin === festival.id;
          const isSelected = selectedFestival?.id === festival.id;
          const color = locationTypeColors[festival.locationType];

          return (
            <g key={festival.id}>
              {/* Pin shadow */}
              <circle
                cx={x}
                cy={y + 2}
                r={isHovered || isSelected ? 10 : 8}
                fill="black"
                opacity="0.1"
              />

              {/* Pin */}
              <circle
                cx={x}
                cy={y}
                r={isHovered || isSelected ? 10 : 8}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredPin(festival.id)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => handlePinClick(festival)}
              />

              {/* Pin inner dot */}
              <circle
                cx={x}
                cy={y}
                r={isHovered || isSelected ? 4 : 3}
                fill="white"
                opacity="0.8"
                className="cursor-pointer pointer-events-none"
              />

              {/* Hover label */}
              {isHovered && !isSelected && (
                <g>
                  <rect
                    x={x - 60}
                    y={y - 40}
                    width="120"
                    height="28"
                    rx="6"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x={x}
                    y={y - 22}
                    textAnchor="middle"
                    className="text-xs font-medium"
                    fill="currentColor"
                  >
                    {festival.name}
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
          <div className="pointer-events-auto bg-background border border-border rounded-xl shadow-2xl p-6 max-w-sm mx-4">
            {/* Close button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="space-y-4">
              {/* Location type badge */}
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: locationTypeColors[selectedFestival.locationType] }}
                />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {locationTypeLabels[selectedFestival.locationType]}
                </span>
              </div>

              {/* Festival info */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{selectedFestival.name}</h3>
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
                className="w-full"
                onClick={() => {
                  onFestivalClick(selectedFestival.id);
                  handleClosePopup();
                }}
              >
                View Festival
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}