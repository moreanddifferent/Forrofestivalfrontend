import { FestivalPage } from '../components/FestivalPage';

export function FestivalPageDemo() {
  // Example: O Fole Roncou style festival
  const festival = {
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
    
    // Ticket data
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
  };

  // Example: Opening soon festival
  const festivalOpeningSoon = {
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
      {
        id: 'party-pass',
        name: 'Party Pass',
        lots: [
          {
            id: 'party-tier',
            lotName: 'Party Only',
            price: '€85',
            opensAt: '2026-03-15',
            opensTime: '10:00 CET',
            state: 'upcoming' as const,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <FestivalPage festival={festival} />
    </div>
  );
}
