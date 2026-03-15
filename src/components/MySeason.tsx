import { useState } from 'react';
import { MapPin, Calendar, X, Share2, ChevronDown, Bookmark, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { YellowUnderlineTitle } from './YellowUnderlineTitle';

type FestivalStatus = 'considering' | 'going';

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
  status: FestivalStatus;
  ticketStatus?: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  nextOpeningDate?: string;
}

interface MySeasonProps {
  savedFestivals: SavedFestival[];
  onStatusChange: (festivalId: string, status: FestivalStatus) => void;
  onRemove: (festivalId: string) => void;
  onShareClick: () => void;
  onExploreFestivals?: () => void;
  compareSet?: Set<string>;
  onToggleCompare?: (festivalId: string) => void;
}

const LOCATION_TYPE_LABELS = {
  sea: 'Sea',
  countryside: 'Countryside',
  urban: 'Urban',
  mountain: 'Mountain'
};

export function MySeason({ 
  savedFestivals, 
  onStatusChange, 
  onRemove,
  onShareClick, 
  onExploreFestivals,
  compareSet = new Set(),
  onToggleCompare
}: MySeasonProps) {
  const [showPast, setShowPast] = useState(false);

  const currentDate = new Date(2026, 5, 1);
  const upcomingFestivals = savedFestivals.filter(f => f.endDate >= currentDate);
  const pastFestivals = savedFestivals.filter(f => f.endDate < currentDate);

  // Sort by next ticket opening (if known), then festival start date
  const sortedUpcoming = [...upcomingFestivals].sort((a, b) => {
    // Prioritize festivals with known ticket openings
    if (a.nextOpeningDate && !b.nextOpeningDate) return -1;
    if (!a.nextOpeningDate && b.nextOpeningDate) return 1;
    if (a.nextOpeningDate && b.nextOpeningDate) {
      return new Date(a.nextOpeningDate).getTime() - new Date(b.nextOpeningDate).getTime();
    }
    return a.startDate.getTime() - b.startDate.getTime();
  });

  const conflicts = detectConflicts(upcomingFestivals);
  const festivalsByMonth = groupByMonth(sortedUpcoming);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 md:py-10">
          <div className="flex items-start justify-between gap-3 md:gap-4">
            <div>
              <h1 className="text-lg md:text-3xl font-bold mb-0.5 md:mb-1 leading-tight">Saved</h1>
              <p className="text-[11px] md:text-sm text-muted-foreground leading-tight">
                {upcomingFestivals.length} upcoming{conflicts.size > 0 && (
                  <> · <span className="text-amber-600">{conflicts.size} {conflicts.size === 1 ? 'conflict' : 'conflicts'}</span></>
                )}
              </p>
            </div>
            <Button onClick={onShareClick} variant="outline" size="sm" className="gap-1.5 md:gap-2 shrink-0 h-8 md:h-9 px-2.5 md:px-4">
              <Share2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span className="hidden sm:inline text-xs md:text-sm">Share</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-4 md:py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Empty state */}
          {upcomingFestivals.length === 0 && (
            <div className="max-w-md mx-auto text-center py-12 md:py-16 px-4">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-muted rounded-full flex items-center justify-center">
                <Bookmark className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
              </div>
              <h2 className="text-lg md:text-xl font-bold mb-2">No saved festivals yet</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                Start building your season by saving festivals you're interested in
              </p>
              <Button onClick={onExploreFestivals} className="bg-[#2F5BFF] hover:bg-[#1A44E0] text-white font-bold">
                Browse festivals
              </Button>
            </div>
          )}
          {sortedUpcoming.length > 0 && (
            <div className="space-y-6">
              {festivalsByMonth.map(({ month, festivals }) => (
                <div key={month}>
                  <h2 className="text-base font-bold mb-3">{month}</h2>
                  <div className="space-y-2">
                    {festivals.map(festival => {
                      const conflictingFestival = getConflictingFestival(
                        festival, 
                        upcomingFestivals.filter(f => f.id !== festival.id)
                      );
                      
                      return (
                        <div key={festival.id}>
                          <FestivalSeasonCard
                            festival={festival}
                            onStatusChange={onStatusChange}
                            onRemove={onRemove}
                            compareSet={compareSet}
                            onToggleCompare={onToggleCompare}
                          />
                          {conflictingFestival && (
                            <div className="text-xs text-amber-600 mt-1.5 ml-[104px] md:ml-28">
                              Conflicts with {conflictingFestival.name} ({conflictingFestival.dates})
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Festivals */}
      {pastFestivals.length > 0 && (
        <section className="border-t border-border py-6 md:py-8">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <button
              onClick={() => setShowPast(!showPast)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showPast ? 'rotate-180' : ''}`} />
              <span className="text-sm font-medium">
                Past festivals ({pastFestivals.length})
              </span>
            </button>
            
            {showPast && (
              <div className="mt-4 space-y-2">
                {pastFestivals.map(festival => (
                  <FestivalSeasonCard
                    key={festival.id}
                    festival={festival}
                    onStatusChange={onStatusChange}
                    onRemove={onRemove}
                    isPast
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

interface FestivalSeasonCardProps {
  festival: SavedFestival;
  onStatusChange: (festivalId: string, status: FestivalStatus) => void;
  onRemove: (festivalId: string) => void;
  isPast?: boolean;
  compareSet?: Set<string>;
  onToggleCompare?: (festivalId: string) => void;
}

function FestivalSeasonCard({ festival, onStatusChange, onRemove, isPast = false, compareSet, onToggleCompare }: FestivalSeasonCardProps) {
  const isInCompare = compareSet?.has(festival.id) ?? false;
  const canCompare = !isPast && onToggleCompare;

  return (
    <div className={`bg-card border rounded-lg overflow-hidden hover:shadow-sm transition-shadow ${isPast ? 'opacity-60' : ''} ${isInCompare ? 'border-[#2F5BFF] ring-1 ring-[#2F5BFF]/20' : 'border-border'}`}>
      <div className="flex gap-3">
        {/* Compare checkbox + Thumbnail */}
        <div className="relative w-20 md:w-24 shrink-0 overflow-hidden bg-muted">
          <div className="w-full aspect-[4/3]">
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {canCompare && (
            <button
              onClick={() => onToggleCompare(festival.id)}
              className={`absolute bottom-1 left-1 w-5 h-5 rounded flex items-center justify-center transition-colors ${
                isInCompare
                  ? 'bg-[#2F5BFF] text-white'
                  : 'bg-white/90 border border-border text-transparent hover:border-[#2F5BFF]'
              }`}
              title="Add to compare"
            >
              <BarChart3 className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 py-2 md:py-2.5 pr-2 md:pr-3 flex items-center justify-between gap-2 md:gap-3 min-w-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1 truncate">{festival.name}</h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{festival.location}, {festival.country}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 shrink-0" />
                <span>{festival.dates}</span>
              </div>
              <span className="px-1.5 py-0.5 bg-muted text-foreground rounded text-[10px] font-medium">
                {LOCATION_TYPE_LABELS[festival.locationType]}
              </span>
            </div>
          </div>

          {/* Status Toggle & Remove */}
          {!isPast && (
            <div className="flex items-center gap-2 shrink-0">
              <StatusToggle
                status={festival.status}
                onChange={(status) => onStatusChange(festival.id, status)}
              />
              <button
                onClick={() => onRemove(festival.id)}
                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded"
                aria-label="Remove"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {isPast && (
            <button
              onClick={() => onRemove(festival.id)}
              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded shrink-0"
              aria-label="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatusToggleProps {
  status: FestivalStatus;
  onChange: (status: FestivalStatus) => void;
}

function StatusToggle({ status, onChange }: StatusToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-background p-0.5">
      <button
        onClick={() => onChange('considering')}
        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
          status === 'considering'
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Considering
      </button>
      <button
        onClick={() => onChange('going')}
        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
          status === 'going'
            ? 'bg-[#0E7C66] text-white'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Going
      </button>
    </div>
  );
}

// Helper functions
function detectConflicts(festivals: SavedFestival[]): Set<string> {
  const conflicts = new Set<string>();
  for (let i = 0; i < festivals.length; i++) {
    for (let j = i + 1; j < festivals.length; j++) {
      const festA = festivals[i];
      const festB = festivals[j];
      if (
        (festA.startDate <= festB.endDate && festA.endDate >= festB.startDate) ||
        (festB.startDate <= festA.endDate && festB.endDate >= festA.startDate)
      ) {
        conflicts.add(festA.id);
        conflicts.add(festB.id);
      }
    }
  }
  return conflicts;
}

function getConflictingFestival(
  festival: SavedFestival, 
  otherFestivals: SavedFestival[]
): SavedFestival | null {
  for (const other of otherFestivals) {
    if (
      (festival.startDate <= other.endDate && festival.endDate >= other.startDate) ||
      (other.startDate <= festival.endDate && other.endDate >= festival.startDate)
    ) {
      return other;
    }
  }
  return null;
}

function groupByMonth(festivals: SavedFestival[]) {
  const groups: { month: string; festivals: SavedFestival[] }[] = [];
  festivals.forEach(festival => {
    const monthKey = festival.startDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    const existingGroup = groups.find(g => g.month === monthKey);
    if (existingGroup) {
      existingGroup.festivals.push(festival);
    } else {
      groups.push({ month: monthKey, festivals: [festival] });
    }
  });
  return groups;
}