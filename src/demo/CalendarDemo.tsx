import { useState } from 'react';
import { CalendarView, CalendarEvent } from '../components/calendar';
import { FestivalPage } from '../components/FestivalPage';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function CalendarDemo() {
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
  const [alertSet, setAlertSet] = useState<Set<string>>(new Set());

  // Sample calendar events
  const calendarEvents: CalendarEvent[] = [
    // Ticket openings
    {
      type: 'ticket_opening',
      data: {
        festivalId: '1',
        festivalName: 'Forró do Sol',
        location: 'Cascais',
        country: 'Portugal',
        opensAt: '2026-03-01',
        opensTime: '12:00 CET',
        price: 'From €120',
        lotName: '2nd Lot',
      },
    },
    {
      type: 'ticket_opening',
      data: {
        festivalId: '2',
        festivalName: 'Barcelona Forró Festival',
        location: 'Barcelona',
        country: 'Spain',
        opensAt: '2026-03-15',
        opensTime: '10:00 CET',
        price: 'From €165',
        lotName: 'Early Bird',
      },
    },
    {
      type: 'ticket_opening',
      data: {
        festivalId: '6',
        festivalName: 'Berlin Forró Weekend',
        location: 'Berlin',
        country: 'Germany',
        opensAt: '2026-04-10',
        opensTime: '18:00 CET',
        price: 'From €110',
        lotName: 'Early Bird',
      },
    },
    {
      type: 'ticket_opening',
      data: {
        festivalId: '1',
        festivalName: 'Forró do Sol',
        location: 'Cascais',
        country: 'Portugal',
        opensAt: '2026-04-20',
        opensTime: '10:00 CET',
        price: 'From €145',
        lotName: '3rd Lot',
      },
    },
    {
      type: 'ticket_opening',
      data: {
        festivalId: '1',
        festivalName: 'Forró do Sol',
        location: 'Cascais',
        country: 'Portugal',
        opensAt: '2026-05-15',
        opensTime: '10:00 CET',
        price: 'From €165',
        lotName: '4th Lot',
      },
    },

    // Festival dates
    {
      type: 'festival',
      data: {
        festivalId: '4',
        festivalName: 'Forró in the Garden',
        location: 'Amsterdam',
        country: 'Netherlands',
        startDate: '2026-05-16',
        endDate: '2026-05-18',
        image: 'https://images.unsplash.com/photo-1661264047307-4d692250a7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: '1',
        festivalName: 'Forró do Sol',
        location: 'Cascais',
        country: 'Portugal',
        startDate: '2026-06-20',
        endDate: '2026-06-23',
        image: 'https://images.unsplash.com/photo-1764377847860-9005502a4888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: '2',
        festivalName: 'Barcelona Forró Festival',
        location: 'Barcelona',
        country: 'Spain',
        startDate: '2026-07-11',
        endDate: '2026-07-14',
        image: 'https://images.unsplash.com/photo-1630509695722-5ccf54e2fc7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: '5',
        festivalName: 'Lisboa Forró Connection',
        location: 'Lisbon',
        country: 'Portugal',
        startDate: '2026-08-15',
        endDate: '2026-08-18',
        image: 'https://images.unsplash.com/photo-1588456439214-e2e90fb6c47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: '3',
        festivalName: 'Forró in the Alps',
        location: 'Chamonix',
        country: 'France',
        startDate: '2026-09-05',
        endDate: '2026-09-08',
        image: 'https://images.unsplash.com/photo-1763743882687-dde4488507df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: '6',
        festivalName: 'Berlin Forró Weekend',
        location: 'Berlin',
        country: 'Germany',
        startDate: '2026-10-04',
        endDate: '2026-10-06',
        image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
  ];

  // Festival data (expanded from cards)
  const festivals = {
    '1': {
      id: '1',
      name: 'Forró do Sol',
      location: 'Cascais',
      country: 'Portugal',
      dates: 'June 20-23, 2026',
      image: 'https://images.unsplash.com/photo-1764377847860-9005502a4888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      attendees: '400-500 dancers',
      venue: 'Casa da Guia Cultural Center',
      description: 'Experience the magic of Forró by the Atlantic coast.',
      highlights: ['Beachfront location', 'International teachers', 'Traditional Portuguese dinner'],
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
          lots: [
            {
              id: 'lot-2',
              lotName: '2nd Lot',
              price: '€120',
              opensAt: '2026-03-01',
              opensTime: '12:00 CET',
              state: 'current' as const,
              quota: '45 remaining',
            },
          ],
        },
      ],
    },
    '2': {
      id: '2',
      name: 'Barcelona Forró Festival',
      location: 'Barcelona',
      country: 'Spain',
      dates: 'July 11-14, 2026',
      image: 'https://images.unsplash.com/photo-1630509695722-5ccf54e2fc7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      attendees: '800-1000 dancers',
      venue: 'Fàbrica Moritz',
      description: 'The largest Forró gathering in Catalonia.',
      highlights: ['Over 40 workshops', 'Live Brazilian band', 'City center location'],
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
    '3': {
      id: '3',
      name: 'Forró in the Alps',
      location: 'Chamonix',
      country: 'France',
      dates: 'September 5-8, 2026',
      image: 'https://images.unsplash.com/photo-1763743882687-dde4488507df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      attendees: '200-250 dancers',
      venue: 'Majestic Conference Center',
      description: 'Dance surrounded by mountain peaks.',
      highlights: ['Mountain setting', 'Optional hiking tours', 'Cozy sessions'],
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
    '4': {
      id: '4',
      name: 'Forró in the Garden',
      location: 'Amsterdam',
      country: 'Netherlands',
      dates: 'May 16-18, 2026',
      image: 'https://images.unsplash.com/photo-1661264047307-4d692250a7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      attendees: '150-200 dancers',
      venue: 'De Hortus Botanicus',
      description: 'An intimate weekend retreat.',
      highlights: ['Small group workshops', 'Organic meals', 'Acoustic sessions'],
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
    '5': {
      id: '5',
      name: 'Lisboa Forró Connection',
      location: 'Lisbon',
      country: 'Portugal',
      dates: 'August 15-18, 2026',
      image: 'https://images.unsplash.com/photo-1588456439214-e2e90fb6c47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      attendees: '600-700 dancers',
      venue: 'LX Factory',
      description: 'Urban festival in Lisbon\'s hippest cultural space.',
      highlights: ['Rooftop parties', 'Walking distance', 'Featured DJs'],
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
    '6': {
      id: '6',
      name: 'Berlin Forró Weekend',
      location: 'Berlin',
      country: 'Germany',
      dates: 'October 4-6, 2026',
      image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      attendees: '300-400 dancers',
      venue: 'Kulturbrauerei',
      description: 'Weekend intensive in Berlin\'s iconic brewery complex.',
      highlights: ['Historic venue', 'Easy transport', 'After-hours clubs'],
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
  };

  const handleEventClick = (festivalId: string) => {
    setSelectedFestival(festivalId);
  };

  const handleSetAlert = (festivalId: string) => {
    setAlertSet(prev => {
      const newSet = new Set(prev);
      if (newSet.has(festivalId)) {
        newSet.delete(festivalId);
      } else {
        newSet.add(festivalId);
      }
      return newSet;
    });
  };

  const selectedFestivalData = selectedFestival ? festivals[selectedFestival as keyof typeof festivals] : null;

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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <CalendarView
          events={calendarEvents}
          onEventClick={handleEventClick}
          onSetAlert={handleSetAlert}
        />
      </div>
    </div>
  );
}
