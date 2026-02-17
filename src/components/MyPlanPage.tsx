import { useState } from 'react';
import { Calendar, MapPin, AlertCircle, Share2, ChevronDown, Lock, Info } from 'lucide-react';
import { Button } from './ui/button';

type FestivalStatus = 'considering' | 'probably' | 'booked';

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

interface MyPlanPageProps {
  savedFestivals: SavedFestival[];
  onStatusChange: (festivalId: string, status: FestivalStatus) => void;
  onShareClick: () => void;
  onExploreFestivals?: () => void;
}

const LOCATION_TYPE_LABELS = {
  sea: 'Sea',
  countryside: 'Countryside',
  urban: 'Urban',
  mountain: 'Mountain'
};

const STATUS_OPTIONS: { value: FestivalStatus; label: string }[] = [
  { value: 'considering', label: 'Considering' },
  { value: 'probably', label: 'Probably' },
  { value: 'booked', label: 'Booked' }
];

export function MyPlanPage({ savedFestivals, onStatusChange, onShareClick, onExploreFestivals }: MyPlanPageProps) {
  const [showPrivacyTooltip, setShowPrivacyTooltip] = useState(false);
  
  // Detect date conflicts
  const conflicts = detectConflicts(savedFestivals);

  // Group by month
  const festivalsByMonth = groupByMonth(savedFestivals);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          {/* Privacy Indicator */}
          <div className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg mb-4 text-sm text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span>Private — Only visible to you</span>
            <button
              onMouseEnter={() => setShowPrivacyTooltip(true)}
              onMouseLeave={() => setShowPrivacyTooltip(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            
            {/* Tooltip */}
            {showPrivacyTooltip && (
              <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-popover border border-border rounded-lg shadow-lg text-xs text-popover-foreground z-50">
                Your plan is private unless you choose to share it. No one can see which festivals you've saved.
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My 2026 Plan</h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <span>{savedFestivals.length} {savedFestivals.length === 1 ? 'festival' : 'festivals'} saved</span>
            {conflicts.size > 0 && (
              <span className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-4 h-4" />
                {conflicts.size} date {conflicts.size === 1 ? 'conflict' : 'conflicts'}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {savedFestivals.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-3">Build your Forró season.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Save festivals to compare dates and plan your year.
              </p>
              {onExploreFestivals && (
                <Button onClick={onExploreFestivals} size="lg">
                  Explore festivals
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              {festivalsByMonth.map(({ month, festivals }) => (
                <div key={month}>
                  <h2 className="text-2xl font-bold mb-5 sticky top-0 bg-background py-2 z-10">
                    {month}
                  </h2>
                  <div className="space-y-3">
                    {festivals.map(festival => (
                      <div key={festival.id}>
                        <FestivalPlanCard
                          festival={festival}
                          hasConflict={conflicts.has(festival.id)}
                          onStatusChange={onStatusChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Share Section */}
      {savedFestivals.length > 0 && (
        <section className="border-t border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h3 className="text-xl font-semibold mb-3">Share your plan</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Generate a read-only link to share your festival calendar with friends or dance partners
            </p>
            <Button onClick={onShareClick} size="lg" className="gap-2">
              <Share2 className="w-5 h-5" />
              Share my plan
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}

interface FestivalPlanCardProps {
  festival: SavedFestival;
  hasConflict: boolean;
  onStatusChange: (festivalId: string, status: FestivalStatus) => void;
}

function FestivalPlanCard({ festival, hasConflict, onStatusChange }: FestivalPlanCardProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <div>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-32 h-24 shrink-0 overflow-hidden bg-muted">
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 py-3 pr-4 flex items-center justify-between gap-4 min-w-0">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-2 truncate">{festival.name}</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{festival.location}, {festival.country}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{festival.dates}</span>
                </div>
                <span className="px-2 py-0.5 bg-muted text-foreground rounded text-xs">
                  {LOCATION_TYPE_LABELS[festival.locationType]}
                </span>
              </div>
            </div>

            {/* Status Selector */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                  festival.status === 'booked'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : festival.status === 'probably'
                    ? 'bg-accent/10 text-accent-foreground border-accent/30'
                    : 'bg-background border-border'
                }`}
              >
                {STATUS_OPTIONS.find(opt => opt.value === festival.status)?.label}
                <ChevronDown className="w-4 h-4" />
              </button>

              {isStatusOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsStatusOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-20 min-w-[140px]">
                    {STATUS_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onStatusChange(festival.id, option.value);
                          setIsStatusOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-muted transition-colors ${
                          festival.status === option.value ? 'bg-muted font-medium' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conflict Warning */}
      {hasConflict && (
        <div className="flex items-center gap-2 text-sm text-warning mt-2 ml-36">
          <AlertCircle className="w-4 h-4" />
          <span>Date conflict with another festival in your plan</span>
        </div>
      )}
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

      // Check if dates overlap
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