import { TicketStatusBadge } from '../components/tickets/TicketStatusBadge';
import { TicketTimelineBlock } from '../components/tickets/TicketTimelineBlock';
import { PassTypeTabs, PassTypeTab } from '../components/tickets/PassTypeTabs';
import { TicketActionPanel } from '../components/tickets/TicketActionPanel';

export function TicketComponentsDemo() {
  // Example: O Fole Roncou style festival
  const fullPassLots = [
    {
      id: 'lot-1',
      lotName: '1st Lot',
      price: '€95',
      opensAt: '2026-01-15',
      opensTime: '10:00 CET',
      state: 'past' as const,
    },
    {
      id: 'lot-2',
      lotName: '2nd Lot',
      price: '€120',
      opensAt: '2026-03-01',
      opensTime: '12:00 CET',
      state: 'current' as const,
      quota: '45 remaining',
    },
    {
      id: 'lot-3',
      lotName: '3rd Lot',
      price: '€145',
      opensAt: '2026-04-20',
      opensTime: '10:00 CET',
      state: 'upcoming' as const,
    },
    {
      id: 'lot-4',
      lotName: '4th Lot',
      price: '€165',
      opensAt: '2026-05-15',
      opensTime: '10:00 CET',
      state: 'upcoming' as const,
    },
  ];

  const partyPassLots = [
    {
      id: 'party-1',
      lotName: '1st Lot',
      price: '€40',
      opensAt: '2026-03-01',
      opensTime: '12:00 CET',
      state: 'past' as const,
    },
    {
      id: 'party-2',
      lotName: '2nd Lot',
      price: '€50',
      opensAt: '2026-03-20',
      opensTime: '14:00 CET',
      state: 'current' as const,
      quota: '78 remaining',
    },
    {
      id: 'party-3',
      lotName: '3rd Lot',
      price: '€60',
      opensAt: '2026-05-15',
      opensTime: '10:00 CET',
      state: 'upcoming' as const,
    },
  ];

  const passTypeTabs: PassTypeTab[] = [
    {
      id: 'full-pass',
      label: 'Full Pass',
      description: 'All workshops, parties, and meals included',
      content: <TicketTimelineBlock lots={fullPassLots} />,
    },
    {
      id: 'party-pass',
      label: 'Party Pass',
      description: 'Evening parties only',
      content: <TicketTimelineBlock lots={partyPassLots} />,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Ticket Components Demo</h1>
          <p className="text-muted-foreground">
            Reusable components for the ticket timeline system
          </p>
        </div>

        {/* 1. Status Badges */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">1. Ticket Status Badges</h2>
            <p className="text-sm text-muted-foreground">
              Four variants for festival-level ticket status
            </p>
          </div>
          
          <div className="space-y-4 border border-border rounded-xl p-6 bg-muted/20">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-32">Open now:</span>
              <TicketStatusBadge variant="open_now" price="From €120" />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-32">Opening soon:</span>
              <TicketStatusBadge 
                variant="opening_soon" 
                opensAt="2026-04-20" 
                opensTime="10:00 CET" 
              />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-32">Not announced:</span>
              <TicketStatusBadge variant="not_announced" />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-32">Sold out:</span>
              <TicketStatusBadge variant="sold_out" />
            </div>
          </div>
        </section>

        {/* 2. Ticket Timeline */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">2. Ticket Timeline Block</h2>
            <p className="text-sm text-muted-foreground">
              Chronological timeline showing past, current, and upcoming lots
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 bg-background">
            <TicketTimelineBlock lots={fullPassLots} />
          </div>
        </section>

        {/* 3. Pass Type Tabs */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">3. Pass Type Tabs</h2>
            <p className="text-sm text-muted-foreground">
              Multiple pass types with independent timelines
            </p>
          </div>
          
          <div className="border border-border rounded-xl p-6 bg-background">
            <PassTypeTabs tabs={passTypeTabs} />
          </div>
        </section>

        {/* 4. Action Panels */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">4. Ticket Action Panels</h2>
            <p className="text-sm text-muted-foreground">
              CTAs and trust signals for different states
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-xl p-6 bg-background space-y-3">
              <h3 className="font-medium text-sm">Buy variant</h3>
              <TicketActionPanel 
                variant="buy" 
                purchaseUrl="https://example.com"
                trustLine="Verified · Updated 2 days ago"
                followers={1247}
              />
            </div>
            
            <div className="border border-border rounded-xl p-6 bg-background space-y-3">
              <h3 className="font-medium text-sm">Follow variant</h3>
              <TicketActionPanel 
                variant="follow"
                trustLine="Verified · Updated 2 days ago"
                followers={892}
              />
            </div>
            
            <div className="border border-border rounded-xl p-6 bg-background space-y-3">
              <h3 className="font-medium text-sm">Not announced variant</h3>
              <TicketActionPanel 
                variant="not_announced"
                trustLine="Likely confirmed"
                followers={421}
              />
            </div>
            
            <div className="border border-border rounded-xl p-6 bg-background space-y-3">
              <h3 className="font-medium text-sm">Sold out variant</h3>
              <TicketActionPanel 
                variant="sold_out"
                trustLine="Verified · Updated 1 week ago"
                followers={543}
              />
            </div>
          </div>
        </section>

        {/* 5. Complete Example */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">5. Complete Example</h2>
            <p className="text-sm text-muted-foreground">
              Festival detail view with all components composed
            </p>
          </div>
          
          <div className="border border-border rounded-xl overflow-hidden">
            {/* Festival header */}
            <div className="p-6 border-b border-border bg-muted/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Forró do Sol</h3>
                  <p className="text-muted-foreground">June 20-23, 2026 · Cascais, Portugal</p>
                </div>
                <TicketStatusBadge variant="open_now" price="From €120" />
              </div>
            </div>

            {/* Tickets section */}
            <div className="p-6 space-y-6">
              <PassTypeTabs tabs={passTypeTabs} />
              
              <div className="pt-4 border-t border-border">
                <TicketActionPanel 
                  variant="buy" 
                  purchaseUrl="https://example.com"
                  trustLine="Verified by organizers · Updated 2 days ago"
                  followers={1247}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
