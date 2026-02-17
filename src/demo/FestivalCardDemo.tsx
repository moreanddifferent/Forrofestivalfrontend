import { useState } from 'react';
import { FestivalCard } from '../components/FestivalCard';
import { FestivalPage } from '../components/FestivalPage';

export function FestivalCardDemo() {
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);

  const festivals = [
    {
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
          ],
        },
      ],
    },
    {
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
      ],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 day ago',
      followers: 2891,
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
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Forró in the Alps',
      location: 'Chamonix',
      country: 'France',
      dates: 'September 5-8, 2026',
      image: 'https://images.unsplash.com/photo-1763743882687-dde4488507df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudHJ5c2lkZSUyMHZpbGxhZ2UlMjBldXJvcGV8ZW58MXx8fHwxNzcwNTczMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '200-250 dancers',
      venue: 'Majestic Conference Center',
      description: 'Dance surrounded by mountain peaks and fresh alpine air. A unique retreat combining Forró with optional hiking and outdoor activities.',
      highlights: [
        'Mountain setting with panoramic views',
        'Optional guided hiking tours',
        'Cozy evening sessions by the fireplace',
      ],
      verificationStatus: 'likely' as const,
      lastUpdate: '5 days ago',
      followers: 421,
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
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Forró in the Garden',
      location: 'Amsterdam',
      country: 'Netherlands',
      dates: 'May 16-18, 2026',
      image: 'https://images.unsplash.com/photo-1661264047307-4d692250a7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBnYXJkZW4lMjBncmVlbmhvdXNlfGVufDF8fHx8MTc3MDQ4OTQ4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '150-200 dancers',
      venue: 'De Hortus Botanicus',
      description: 'An intimate weekend retreat in a historic Amsterdam garden house. Limited capacity ensures personal attention from teachers.',
      highlights: [
        'Small group workshops (max 30 people)',
        'Organic farm-to-table meals',
        'Acoustic sessions in the greenhouse',
      ],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 week ago',
      followers: 543,
      ticketStatus: 'sold_out' as const,
      passTypes: [
        {
          id: 'contribution',
          name: 'Contribution',
          lots: [
            {
              id: 'solidarity',
              lotName: 'Solidarity rate',
              price: '€80',
              opensAt: '2026-02-01',
              state: 'past' as const,
            },
          ],
        },
      ],
    },
    {
      id: '5',
      name: 'Lisboa Forró Connection',
      location: 'Lisbon',
      country: 'Portugal',
      dates: 'August 15-18, 2026',
      image: 'https://images.unsplash.com/photo-1588456439214-e2e90fb6c47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXNib24lMjBjaXR5JTIwc3Vuc2V0fGVufDF8fHx8MTc3MDU3MzMyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '600-700 dancers',
      venue: 'LX Factory',
      description: 'Urban festival in Lisbon\'s hippest cultural space. Four days of non-stop forró in the heart of Portugal\'s capital.',
      highlights: [
        'Rooftop parties with city views',
        'Walking distance to downtown',
        'Featured DJs from Brazil',
      ],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '3 days ago',
      followers: 1823,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €95',
      ticketUrl: 'https://example.com/tickets',
      passTypes: [
        {
          id: 'full-pass',
          name: 'Full Pass',
          lots: [
            {
              id: 'lot-1',
              lotName: '1st Lot',
              price: '€95',
              opensAt: '2026-02-20',
              state: 'current' as const,
            },
          ],
        },
      ],
    },
    {
      id: '6',
      name: 'Berlin Forró Weekend',
      location: 'Berlin',
      country: 'Germany',
      dates: 'October 4-6, 2026',
      image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJsaW4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcwNTczMzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '300-400 dancers',
      venue: 'Kulturbrauerei',
      description: 'Weekend intensive in Berlin\'s iconic brewery complex. Merge dance with Berlin\'s vibrant nightlife culture.',
      highlights: [
        'Historic industrial venue',
        'Easy public transport access',
        'After-hours club nights',
      ],
      verificationStatus: 'likely' as const,
      lastUpdate: '1 week ago',
      followers: 654,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-04-10',
      nextOpeningTime: '18:00 CET',
      passTypes: [
        {
          id: 'full-pass',
          name: 'Full Pass',
          lots: [
            {
              id: 'early',
              lotName: 'Early Bird',
              price: '€110',
              opensAt: '2026-04-10',
              state: 'upcoming' as const,
            },
          ],
        },
      ],
    },
  ];

  const selectedFestivalData = festivals.find(f => f.id === selectedFestival);

  if (selectedFestival && selectedFestivalData) {
    return (
      <FestivalPage 
        festival={selectedFestivalData} 
        onBack={() => setSelectedFestival(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">Forró Festivals in Europe</h1>
          <p className="text-muted-foreground">
            Discover and plan your next festival adventure
          </p>
        </div>
      </div>

      {/* Festival grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map(festival => (
            <FestivalCard
              key={festival.id}
              festival={festival}
              onClick={() => setSelectedFestival(festival.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
