import { useState } from 'react';
import { FestivalPage } from '../components/FestivalPage';
import { Button } from '../components/ui/button';

type DemoFestival = 'open' | 'opening-soon' | 'not-announced' | 'sold-out';

export function FestivalStatesDemo() {
  const [selectedState, setSelectedState] = useState<DemoFestival>('open');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const festivals = {
    open: {
      id: '1',
      name: 'Forró do Sol',
      location: 'Cascais',
      country: 'Portugal',
      dates: 'June 20-23, 2026',
      image: 'https://images.unsplash.com/photo-1764377847860-9005502a4888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwc3Vuc2V0JTIwYmVhY2glMjBldXJvcGV8ZW58MXx8fHwxNzcwNTczMzI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '400-500 dancers',
      venue: 'Casa da Guia Cultural Center',
      description: 'Experience the magic of Forró by the Atlantic coast. Three days of intensive workshops with international maestros, social dancing under the stars, and the warm Portuguese hospitality that makes every moment unforgettable.',
      highlights: [
        'Beachfront location with ocean views',
        'International teaching faculty from Brazil and Europe',
        'Traditional Portuguese dinner included',
        'Late-night sessions until sunrise on the terrace',
      ],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 1247,
      isFollowing,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €120',
      ticketUrl: 'https://example.com/tickets',
      passTypes: [
        {
          id: 'full-pass',
          name: 'Full Pass',
          description: 'All workshops, parties, and meals included',
          lots: [
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
          ],
        },
        {
          id: 'party-pass',
          name: 'Party Pass',
          description: 'Evening parties only',
          lots: [
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
          ],
        },
      ],
    },

    'opening-soon': {
      id: '2',
      name: 'Barcelona Forró Festival',
      location: 'Barcelona',
      country: 'Spain',
      dates: 'July 11-14, 2026',
      image: 'https://images.unsplash.com/photo-1630509695722-5ccf54e2fc7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBhcmNoaXRlY3R1cmUlMjBuaWdodHxlbnwxfHx8fDE3NzA1NzMzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '800-1000 dancers',
      venue: 'Fàbrica Moritz',
      description: 'The largest Forró gathering in Catalonia returns for its 8th edition. Four days of world-class instruction, spectacular shows, and the vibrant energy of Barcelona\'s dance community.',
      highlights: [
        'Over 40 workshops across all levels',
        'Live Brazilian band every night',
        'City center location near beach',
        'Special guest: Mestre João do Pife',
      ],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 day ago',
      followers: 2891,
      isFollowing,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-03-15',
      nextOpeningTime: '10:00 CET',
      passTypes: [
        {
          id: 'full-pass',
          name: 'Full Pass',
          lots: [
            {
              id: 'tier-1',
              lotName: 'Standard',
              price: '€165',
              opensAt: '2026-03-15',
              opensTime: '10:00 CET',
              state: 'upcoming' as const,
              tierDescription: 'Workshops and parties',
            },
            {
              id: 'tier-2',
              lotName: 'Premium',
              price: '€215',
              opensAt: '2026-03-15',
              opensTime: '10:00 CET',
              state: 'upcoming' as const,
              tierDescription: 'Includes accommodation package',
            },
            {
              id: 'tier-3',
              lotName: 'VIP',
              price: '€280',
              opensAt: '2026-03-15',
              opensTime: '10:00 CET',
              state: 'upcoming' as const,
              tierDescription: 'All-inclusive with private masterclasses',
              quota: 'Limited to 30 spots',
            },
          ],
        },
      ],
    },

    'not-announced': {
      id: '3',
      name: 'Forró in the Alps',
      location: 'Chamonix',
      country: 'France',
      dates: 'September 5-8, 2026',
      image: 'https://images.unsplash.com/photo-1763743882687-dde4488507df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMHZpbGxhZ2UlMjBldXJvcGV8ZW58MXx8fHwxNzcwNTczMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '200-250 dancers',
      venue: 'Majestic Conference Center',
      description: 'Dance surrounded by mountain peaks and fresh alpine air. A unique retreat combining Forró with optional hiking and outdoor activities in one of Europe\'s most stunning locations.',
      highlights: [
        'Mountain setting with panoramic views',
        'Optional guided hiking tours',
        'Cozy evening sessions by the fireplace',
        'Sustainable local cuisine',
      ],
      verificationStatus: 'likely' as const,
      lastUpdate: '5 days ago',
      followers: 421,
      isFollowing,
      ticketStatus: 'not_announced' as const,
      passTypes: [
        {
          id: 'full-pass',
          name: 'Full Pass',
          lots: [
            {
              id: 'tbd-1',
              lotName: 'Early Bird',
              price: '€150-€180',
              state: 'unknown' as const,
              tierDescription: 'Estimated pricing',
            },
            {
              id: 'tbd-2',
              lotName: 'Regular',
              price: 'TBA',
              state: 'unknown' as const,
            },
          ],
        },
      ],
    },

    'sold-out': {
      id: '4',
      name: 'Forró in the Garden',
      location: 'Amsterdam',
      country: 'Netherlands',
      dates: 'May 16-18, 2026',
      image: 'https://images.unsplash.com/photo-1661264047307-4d692250a7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW4lMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3MDQ4OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '150-200 dancers',
      venue: 'De Hortus Botanicus',
      description: 'An intimate weekend retreat in a historic Amsterdam garden house. Limited capacity ensures personal attention from teachers and a close-knit community atmosphere.',
      highlights: [
        'Small group workshops (max 30 people)',
        'Organic farm-to-table meals',
        'Acoustic sessions in the greenhouse',
        'Focus on musicality and connection',
      ],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 week ago',
      followers: 543,
      isFollowing,
      ticketStatus: 'sold_out' as const,
      passTypes: [
        {
          id: 'contribution',
          name: 'Contribution',
          description: 'Pay what feels right for this community event',
          lots: [
            {
              id: 'solidarity',
              lotName: 'Solidarity rate',
              price: '€80',
              opensAt: '2026-02-01',
              opensTime: '10:00 CET',
              state: 'past' as const,
              tierDescription: 'Reduced rate for those with limited means',
            },
            {
              id: 'standard',
              lotName: 'Standard contribution',
              price: '€120',
              opensAt: '2026-02-01',
              opensTime: '10:00 CET',
              state: 'past' as const,
              tierDescription: 'Covers event costs',
            },
            {
              id: 'supporter',
              lotName: 'Supporter rate',
              price: '€160',
              opensAt: '2026-02-01',
              opensTime: '10:00 CET',
              state: 'past' as const,
              tierDescription: 'Help us support future events',
            },
          ],
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* State selector */}
      <div className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">View state:</span>
            <div className="flex gap-2">
              <Button
                variant={selectedState === 'open' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedState('open')}
              >
                Tickets Open
              </Button>
              <Button
                variant={selectedState === 'opening-soon' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedState('opening-soon')}
              >
                Opening Soon
              </Button>
              <Button
                variant={selectedState === 'not-announced' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedState('not-announced')}
              >
                Not Announced
              </Button>
              <Button
                variant={selectedState === 'sold-out' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedState('sold-out')}
              >
                Sold Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Festival page */}
      <FestivalPage 
        festival={festivals[selectedState]} 
        onFollow={handleFollow}
      />
    </div>
  );
}