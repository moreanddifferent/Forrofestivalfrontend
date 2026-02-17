import { useState } from 'react';
import { MapPin, Calendar, X, Share2, Lock, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

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
}

interface MySeasonProps {
  savedFestivals: SavedFestival[];
  onStatusChange: (festivalId: string, status: FestivalStatus) => void;
  onRemove: (festivalId: string) => void;
  onShareClick: () => void;
  onExploreFestivals?: () => void;
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
  onExploreFestivals 
}: MySeasonProps) {
  const [showPast, setShowPast] = useState(false);

  // Separate upcoming and past festivals (using June 2026 as current date for demo)
  const currentDate = new Date(2026, 5, 1); // June 1, 2026
  const upcomingFestivals = savedFestivals.filter(f => f.endDate >= currentDate);
  const pastFestivals = savedFestivals.filter(f => f.endDate < currentDate);

  // Detect conflicts
  const conflicts = detectConflicts(upcomingFestivals);

  // Group upcoming by month
  const festivalsByMonth = groupByMonth(upcomingFestivals);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">My Festival Plan</h1>
                <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Private
                </span>
              </div>
              <p className="text-muted-foreground">
                {upcomingFestivals.length} upcoming {upcomingFestivals.length === 1 ? 'festival' : 'festivals'}
                {conflicts.size > 0 && (
                  <> · <span className="text-warning">{conflicts.size} date {conflicts.size === 1 ? 'conflict' : 'conflicts'}</span></>
                )}
              </p>
            </div>
            <Button onClick={onShareClick} variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {upcomingFestivals.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-2">No festivals in your season</h2>
              <p className="text-muted-foreground mb-6">
                Add festivals to track dates and plan your schedule.
              </p>
              {onExploreFestivals && (
                <Button onClick={onExploreFestivals}>
                  Explore festivals
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {festivalsByMonth.map(({ month, festivals }) => (
                <div key={month}>
                  <h2 className="text-lg font-semibold mb-3">{month}</h2>
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
                          />
                          {conflictingFestival && (
                            <div className="text-sm text-warning mt-1.5 ml-28">
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

      {/* Past Festivals Section */}
      {pastFestivals.length > 0 && (
        <section className="border-t border-border py-8">
          <div className="max-w-4xl mx-auto px-6">
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
}

function FestivalSeasonCard({ festival, onStatusChange, onRemove, isPast = false }: FestivalSeasonCardProps) {
  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-sm transition-shadow ${isPast ? 'opacity-60' : ''}`}>
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="w-24 h-20 shrink-0 overflow-hidden bg-muted">
          <img
            src={festival.image}
            alt={festival.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 py-2.5 pr-3 flex items-center justify-between gap-3 min-w-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1.5 truncate">{festival.name}</h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{festival.location}, {festival.country}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 shrink-0" />
                <span>{festival.dates}</span>
              </div>
              <span className="px-1.5 py-0.5 bg-muted text-foreground rounded text-xs">
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
            ? 'bg-primary text-primary-foreground'
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
  const sorted = [...festivals].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const groups: { month: string; festivals: SavedFestival[] }[] = [];

  sorted.forEach(festival => {
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