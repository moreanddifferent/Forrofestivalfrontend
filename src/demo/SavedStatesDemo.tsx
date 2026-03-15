import { useState } from 'react';
import { MySeason } from '../components/MySeason';
import { SharedPlan } from '../components/SharedPlan';
import { Link2 } from 'lucide-react';

export function SavedStatesDemo() {
  const [demoMode, setDemoMode] = useState<'personal' | 'shared'>('personal');
  const [listName, setListName] = useState('My Summer 2026');

  // Mock data for personal saved festivals
  const allFestivals = [
    {
      id: '1',
      name: 'Forró do Sol',
      location: 'Cascais',
      country: 'Portugal',
      dates: 'June 20-23, 2026',
      startDate: new Date(2026, 5, 20),
      endDate: new Date(2026, 5, 23),
      image: 'https://images.unsplash.com/photo-1652492892191-487055a9b6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      locationType: 'sea' as const,
      savedAt: new Date(2026, 2, 10),
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €120',
    },
    {
      id: '2',
      name: 'Barcelona Forró Festival',
      location: 'Barcelona',
      country: 'Spain',
      dates: 'July 11-14, 2026',
      startDate: new Date(2026, 6, 11),
      endDate: new Date(2026, 6, 14),
      image: 'https://images.unsplash.com/photo-1768053922352-3ef4060e4e18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      locationType: 'sea' as const,
      savedAt: new Date(2026, 2, 12),
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-03-20',
    },
    {
      id: '7',
      name: 'Forró de Porto',
      location: 'Porto',
      country: 'Portugal',
      dates: 'May 22-25, 2026',
      startDate: new Date(2026, 4, 22),
      endDate: new Date(2026, 4, 25),
      image: 'https://images.unsplash.com/photo-1725126141215-63fa9fd8c837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      locationType: 'urban' as const,
      savedAt: new Date(2026, 2, 8),
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-03-18',
    },
    {
      id: '8',
      name: 'Provence Forró Retreat',
      location: 'Aix-en-Provence',
      country: 'France',
      dates: 'June 8-14, 2026',
      startDate: new Date(2026, 5, 8),
      endDate: new Date(2026, 5, 14),
      image: 'https://images.unsplash.com/photo-1623631896463-276ef87749a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      locationType: 'countryside' as const,
      savedAt: new Date(2026, 2, 14),
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €280',
    },
    {
      id: '5',
      name: 'Lisboa Forró Connection',
      location: 'Lisbon',
      country: 'Portugal',
      dates: 'August 15-18, 2026',
      startDate: new Date(2026, 7, 15),
      endDate: new Date(2026, 7, 18),
      image: 'https://images.unsplash.com/photo-1588456439214-e2e90fb6c47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      locationType: 'sea' as const,
      savedAt: new Date(2026, 2, 11),
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €95',
    },
    {
      id: '3',
      name: 'Forró in the Alps',
      location: 'Chamonix',
      country: 'France',
      dates: 'September 5-8, 2026',
      startDate: new Date(2026, 8, 5),
      endDate: new Date(2026, 8, 8),
      image: 'https://images.unsplash.com/photo-1763743882687-dde4488507df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      locationType: 'mountain' as const,
      savedAt: new Date(2026, 2, 13),
      ticketStatus: 'not_announced' as const,
    },
    {
      id: '12',
      name: 'Algarve Forró Sun',
      location: 'Lagos',
      country: 'Portugal',
      dates: 'September 18-21, 2026',
      startDate: new Date(2026, 8, 18),
      endDate: new Date(2026, 8, 21),
      image: 'https://images.unsplash.com/photo-1665759118208-7f5b9955d9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      locationType: 'sea' as const,
      savedAt: new Date(2026, 2, 9),
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €105',
    },
  ];

  // Mock data for shared wishlist (friend's saved festivals - accessed via link only)
  const sharedFestivals = [
    {
      id: '1',
      name: 'Forró do Sol',
      location: 'Cascais',
      country: 'Portugal',
      dates: 'June 20-23, 2026',
      startDate: new Date(2026, 5, 20),
      endDate: new Date(2026, 5, 23),
      image: 'https://images.unsplash.com/photo-1652492892191-487055a9b6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €120',
    },
    {
      id: '8',
      name: 'Provence Forró Retreat',
      location: 'Aix-en-Provence',
      country: 'France',
      dates: 'June 8-14, 2026',
      startDate: new Date(2026, 5, 8),
      endDate: new Date(2026, 5, 14),
      image: 'https://images.unsplash.com/photo-1623631896463-276ef87749a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €280',
    },
    {
      id: '3',
      name: 'Forró in the Alps',
      location: 'Chamonix',
      country: 'France',
      dates: 'September 5-8, 2026',
      startDate: new Date(2026, 8, 5),
      endDate: new Date(2026, 8, 8),
      image: 'https://images.unsplash.com/photo-1763743882687-dde4488507df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      ticketStatus: 'not_announced' as const,
    },
  ];

  const handleRemove = (festivalId: string) => {
    console.log('Remove festival:', festivalId);
  };

  const handleShareClick = () => {
    console.log('Share clicked - would generate shareable link');
    alert('In production, this would generate a shareable link like:\nforro.eu/saved/abc123\n\nFor demo purposes, switching to shared view...');
    setDemoMode('shared');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Controls - simulates accessing via link vs navigation */}
      <div className="sticky top-0 z-50 bg-muted/40 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FFD600]" />
              <div>
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  Saved Section Demo
                </h2>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {demoMode === 'personal' ? 'Personal shortlist with naming' : 'Read-only shared page (link-only access)'}
                </p>
              </div>
            </div>
            
            {/* Demo mode indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDemoMode(demoMode === 'personal' ? 'shared' : 'personal')}
                className="text-xs text-[#2F5BFF] hover:underline flex items-center gap-1"
              >
                {demoMode === 'personal' ? (
                  <>View shared example →</>
                ) : (
                  <>← Back to personal</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {demoMode === 'personal' && (
        <MySeason
          savedFestivals={allFestivals}
          onRemove={handleRemove}
          onShareClick={handleShareClick}
          listName={listName}
          onListNameChange={setListName}
        />
      )}

      {demoMode === 'shared' && (
        <SharedPlan
          ownerName="Sarah"
          ownerAvatar=""
          festivals={sharedFestivals}
        />
      )}
    </div>
  );
}