import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { BottomTabNavigation } from '../components/BottomTabNavigation';
import { HomePage } from '../components/HomePage';
import { FestivalPage } from '../components/FestivalPage';
import { CalendarView, CalendarEvent } from '../components/calendar';
import { SignInModal } from '../components/SignInModal';
import { MapView } from '../components/MapView';
import { MySeason } from '../components/MySeason';
import { SharePlanModal } from '../components/SharePlanModal';

type View = 'home' | 'calendar' | 'festival' | 'map' | 'plan';
type SignInAction = 'save' | 'share' | 'alert';

export function MainDemo() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
  const [alertSet, setAlertSet] = useState<Set<string>>(new Set());
  const [savedFestivals, setSavedFestivals] = useState<Set<string>>(new Set());
  const [festivalStatuses, setFestivalStatuses] = useState<Record<string, 'considering' | 'probably' | 'booked'>>({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [signInAction, setSignInAction] = useState<SignInAction>('save');

  // Festival data
  const festivals = [
    {
      id: '1',
      name: 'Forró do Sol',
      location: 'Cascais',
      country: 'Portugal',
      dates: 'June 20-23, 2026',
      image: 'https://images.unsplash.com/photo-1652492892191-487055a9b6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBkYW5jaW5nJTIwZm9yciVDMyVCMyUyMGNvdXBsZXxlbnwxfHx8fDE3NzA4NDY1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
      experienceType: 'sea' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 38.7, lng: -9.4 },
      editorNote: 'Strong social atmosphere',
      duration: 'weekend' as const,
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
    {
      id: '2',
      name: 'Barcelona Forró Festival',
      location: 'Barcelona',
      country: 'Spain',
      dates: 'July 11-14, 2026',
      image: 'https://images.unsplash.com/photo-1768053922352-3ef4060e4e18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMGZlc3RpdmFsJTIwY3Jvd2QlMjBlbmVyZ3l8ZW58MXx8fHwxNzcwODQ2NTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
      experienceType: 'immersive' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 41.4, lng: 2.2 },
      editorNote: 'Best for first-time attendees',
      duration: 'week' as const,
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
    {
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
      ticketStatus: 'not_announced' as const,
      experienceType: 'mountain' as const,
      locationType: 'mountain' as const,
      coordinates: { lat: 45.9, lng: 6.9 },
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
    {
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
      ticketStatus: 'sold_out' as const,
      experienceType: 'intimate' as const,
      locationType: 'countryside' as const,
      coordinates: { lat: 52.4, lng: 4.9 },
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
      experienceType: 'urban' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 38.7, lng: -9.1 },
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
              opensTime: '14:00 CET',
              state: 'current' as const,
              quota: '120 remaining',
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
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 52.5, lng: 13.4 },
      editorNote: 'Good destination pairing',
      duration: 'weekend' as const,
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
              opensTime: '18:00 CET',
              state: 'upcoming' as const,
            },
          ],
        },
      ],
    },
  ];

  // Calendar events
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

  const handleNavigate = (view: 'home' | 'calendar' | 'map' | 'plan') => {
    setCurrentView(view);
    setSelectedFestival(null);
  };

  const handleFestivalClick = (festivalId: string) => {
    setSelectedFestival(festivalId);
    setCurrentView('festival');
  };

  const handleBackFromFestival = () => {
    setSelectedFestival(null);
    setCurrentView('home');
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

  const handleSaveFestival = (festivalId: string) => {
    if (!isSignedIn) {
      setSignInAction('save');
      setShowSignInModal(true);
      return;
    }

    setSavedFestivals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(festivalId)) {
        newSet.delete(festivalId);
      } else {
        newSet.add(festivalId);
      }
      return newSet;
    });
  };

  const handleShareWishlist = () => {
    if (!isSignedIn) {
      setSignInAction('share');
      setShowSignInModal(true);
      return;
    }

    // Show share modal
    setShowShareModal(true);
  };

  const handleStatusChange = (festivalId: string, status: 'considering' | 'probably' | 'booked') => {
    setFestivalStatuses(prev => ({
      ...prev,
      [festivalId]: status
    }));
  };

  const handleSignIn = () => {
    // Demo: simulate sign-in
    setIsSignedIn(true);
    setShowSignInModal(false);
  };

  const selectedFestivalData = selectedFestival
    ? festivals.find(f => f.id === selectedFestival)
    : null;

  const savedFestivalData = festivals.filter(f => savedFestivals.has(f.id));
  
  // Convert saved festivals to My Plan format with dates
  const planFestivals = savedFestivalData.map(festival => {
    // Parse dates from festival.dates string (e.g., "June 20-23, 2026")
    const dateMatch = festival.dates.match(/(\w+)\s+(\d+)-(\d+),\s+(\d+)/);
    let startDate = new Date(2026, 0, 1);
    let endDate = new Date(2026, 0, 1);
    
    if (dateMatch) {
      const [, month, startDay, endDay, year] = dateMatch;
      const monthIndex = new Date(`${month} 1, 2000`).getMonth();
      startDate = new Date(parseInt(year), monthIndex, parseInt(startDay));
      endDate = new Date(parseInt(year), monthIndex, parseInt(endDay));
    }
    
    return {
      ...festival,
      startDate,
      endDate,
      status: festivalStatuses[festival.id] || ('considering' as const)
    };
  });

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Navigation - shown on all views except festival detail */}
      {currentView !== 'festival' && (
        <Navigation
          currentView={currentView}
          onNavigate={handleNavigate}
          planCount={savedFestivals.size}
        />
      )}

      {/* Content */}
      {currentView === 'home' && (
        <HomePage 
          festivals={festivals.map(f => ({
            ...f,
            isSaved: savedFestivals.has(f.id),
            onSave: () => handleSaveFestival(f.id),
          }))}
          onFestivalClick={handleFestivalClick}
          onNavigateToCalendar={() => handleNavigate('calendar')}
          onNavigateToMap={() => handleNavigate('map')}
        />
      )}

      {currentView === 'calendar' && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <CalendarView
            events={calendarEvents}
            onEventClick={handleFestivalClick}
            onSetAlert={handleSetAlert}
          />
        </div>
      )}

      {currentView === 'festival' && selectedFestivalData && (
        <FestivalPage
          festival={selectedFestivalData}
          onBack={handleBackFromFestival}
        />
      )}

      {currentView === 'map' && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">Festival Map</h1>
            <p className="text-sm md:text-lg text-muted-foreground">
              Explore festivals by location. Click on pins to learn more.
            </p>
          </div>
          <MapView
            festivals={festivals}
            onFestivalClick={handleFestivalClick}
          />
        </div>
      )}

      {currentView === 'plan' && (
        <MySeason
          savedFestivals={planFestivals}
          onStatusChange={handleStatusChange}
          onRemove={(festivalId) => {
            setSavedFestivals(prev => {
              const newSet = new Set(prev);
              newSet.delete(festivalId);
              return newSet;
            });
          }}
          onShareClick={handleShareWishlist}
          onExploreFestivals={() => handleNavigate('home')}
        />
      )}

      {/* Bottom Tab Navigation - Mobile only */}
      {currentView !== 'festival' && (
        <BottomTabNavigation
          currentView={currentView}
          onNavigate={handleNavigate}
          planCount={savedFestivals.size}
        />
      )}

      {/* Sign-in modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
        action={signInAction}
      />

      {/* Share plan modal */}
      <SharePlanModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        hasAccount={isSignedIn}
      />
    </div>
  );
}