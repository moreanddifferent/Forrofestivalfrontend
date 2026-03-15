import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { BottomTabNavigation } from '../components/BottomTabNavigation';
import { HomePage } from '../components/HomePage';
import { FestivalPage } from '../components/FestivalPage';
import { CalendarView, CalendarEvent } from '../components/calendar';
import { SignInModal } from '../components/SignInModal';
import { AlertModal, AlertOptions } from '../components/AlertModal';
import { MapView } from '../components/MapView';
import { MySeason } from '../components/MySeason';
import { SharePlanModal } from '../components/SharePlanModal';
import { CompareDrawer } from '../components/CompareDrawer';
import { CompareStickyBar } from '../components/CompareStickyBar';

type View = 'home' | 'calendar' | 'festival' | 'map' | 'saved';
type SignInAction = 'save' | 'share' | 'alert';

export function MainDemo() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
  const [alertSet, setAlertSet] = useState<Set<string>>(new Set());
  const [savedFestivals, setSavedFestivals] = useState<Set<string>>(new Set());
  const [festivalStatuses, setFestivalStatuses] = useState<Record<string, 'considering' | 'going'>>({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTargetFestival, setAlertTargetFestival] = useState<string | null>(null);
  const [signInAction, setSignInAction] = useState<SignInAction>('save');
  const [pendingAlertFestival, setPendingAlertFestival] = useState<string | null>(null);
  
  // Compare state
  const [compareSet, setCompareSet] = useState<Set<string>>(new Set());
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);

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
            { id: 'lot-1', lotName: '1st Lot', price: '€95', opensAt: '2026-01-15', opensTime: '10:00 CET', state: 'past' as const },
            { id: 'lot-2', lotName: '2nd Lot', price: '€120', opensAt: '2026-03-01', opensTime: '12:00 CET', state: 'current' as const, quota: '45 remaining' },
            { id: 'lot-3', lotName: '3rd Lot', price: '€145', opensAt: '2026-04-20', opensTime: '10:00 CET', state: 'upcoming' as const },
            { id: 'lot-4', lotName: '4th Lot', price: '€165', opensAt: '2026-05-15', opensTime: '10:00 CET', state: 'upcoming' as const },
          ],
        },
        {
          id: 'party-pass',
          name: 'Party Pass',
          description: 'Evening parties only',
          lots: [
            { id: 'party-1', lotName: '1st Lot', price: '€40', opensAt: '2026-03-01', opensTime: '12:00 CET', state: 'past' as const },
            { id: 'party-2', lotName: '2nd Lot', price: '€50', opensAt: '2026-03-20', opensTime: '14:00 CET', state: 'current' as const, quota: '78 remaining' },
            { id: 'party-3', lotName: '3rd Lot', price: '€60', opensAt: '2026-05-15', opensTime: '10:00 CET', state: 'upcoming' as const },
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
            { id: 'tier-1', lotName: 'Standard', price: '€165', opensAt: '2026-03-15', opensTime: '10:00 CET', state: 'upcoming' as const, tierDescription: 'Workshops and parties' },
            { id: 'tier-2', lotName: 'Premium', price: '€215', opensAt: '2026-03-15', opensTime: '10:00 CET', state: 'upcoming' as const, tierDescription: 'Includes accommodation package' },
            { id: 'tier-3', lotName: 'VIP', price: '€280', opensAt: '2026-03-15', opensTime: '10:00 CET', state: 'upcoming' as const, tierDescription: 'All-inclusive with private masterclasses', quota: 'Limited to 30 spots' },
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
            { id: 'tbd-1', lotName: 'Early Bird', price: '€150-€180', state: 'unknown' as const, tierDescription: 'Estimated pricing' },
            { id: 'tbd-2', lotName: 'Regular', price: 'TBA', state: 'unknown' as const },
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
            { id: 'solidarity', lotName: 'Solidarity rate', price: '€80', opensAt: '2026-02-01', opensTime: '10:00 CET', state: 'past' as const, tierDescription: 'Reduced rate for those with limited means' },
            { id: 'standard', lotName: 'Standard contribution', price: '€120', opensAt: '2026-02-01', opensTime: '10:00 CET', state: 'past' as const, tierDescription: 'Covers event costs' },
            { id: 'supporter', lotName: 'Supporter rate', price: '€160', opensAt: '2026-02-01', opensTime: '10:00 CET', state: 'past' as const, tierDescription: 'Help us support future events' },
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
            { id: 'lot-1', lotName: '1st Lot', price: '€95', opensAt: '2026-02-20', opensTime: '14:00 CET', state: 'current' as const, quota: '120 remaining' },
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
            { id: 'early', lotName: 'Early Bird', price: '€110', opensAt: '2026-04-10', opensTime: '18:00 CET', state: 'upcoming' as const },
          ],
        },
      ],
    },
    // === Additional festivals for category variety ===
    {
      id: '7',
      name: 'Forró de Porto',
      location: 'Porto',
      country: 'Portugal',
      dates: 'May 22-25, 2026',
      image: 'https://images.unsplash.com/photo-1725126141215-63fa9fd8c837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0byUyMHBvcnR1Z2FsJTIwcml2ZXJzaWRlJTIwb2xkJTIwdG93bnxlbnwxfHx8fDE3NzMxNzY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '250-350 dancers',
      venue: 'Palácio da Bolsa',
      description: 'Dance along the Douro river in Porto\'s historic Ribeira district. A weekend combining Forró with port wine and Portuguese culture.',
      highlights: ['River-side outdoor milonga', 'Port wine tasting included', 'Walking tours of Ribeira'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '4 days ago',
      followers: 712,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-03-20',
      nextOpeningTime: '12:00 CET',
      experienceType: 'intimate' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 41.1, lng: -8.6 },
      duration: 'weekend' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'eb', lotName: 'Early Bird', price: '€95', opensAt: '2026-03-20', opensTime: '12:00 CET', state: 'upcoming' as const }] }],
    },
    {
      id: '8',
      name: 'Provence Forró Retreat',
      location: 'Aix-en-Provence',
      country: 'France',
      dates: 'June 8-14, 2026',
      image: 'https://images.unsplash.com/photo-1623631896463-276ef87749a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm92ZW5jZSUyMGxhdmVuZGVyJTIwdmlsbGFnZSUyMGZyYW5jZXxlbnwxfHx8fDE3NzMxNzY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '100-150 dancers',
      venue: 'Domaine de Fontblanche',
      description: 'A week-long immersion in lavender fields. Small group, deep learning focus with master teachers from Brazil.',
      highlights: ['Lavender field setting', 'Max 120 participants', 'Farm-to-table French cuisine', 'Daily musicality workshops'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 389,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €280',
      ticketUrl: 'https://example.com',
      experienceType: 'intimate' as const,
      locationType: 'countryside' as const,
      coordinates: { lat: 43.5, lng: 5.4 },
      duration: 'week' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'reg', lotName: 'Regular', price: '€280', state: 'current' as const, quota: '32 remaining' }] }],
    },
    {
      id: '9',
      name: 'Sardinia Forró Beach Festival',
      location: 'Alghero',
      country: 'Italy',
      dates: 'July 3-6, 2026',
      image: 'https://images.unsplash.com/photo-1727786616190-62a1e83ef91f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXJkaW5pYSUyMGl0YWx5JTIwY29hc3QlMjB0dXJxdW9pc2V8ZW58MXx8fHwxNzczMTc2ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '350-450 dancers',
      venue: 'Spiaggia del Lido',
      description: 'Dance on the beach with turquoise Mediterranean waters. Four days of Forró on Sardinia\'s stunning Coral Riviera.',
      highlights: ['Beach parties at sunset', 'Crystal-clear water swimming', 'Italian aperitivo sessions'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 week ago',
      followers: 945,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-03-25',
      nextOpeningTime: '10:00 CET',
      experienceType: 'sea' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 40.6, lng: 8.3 },
      duration: 'weekend' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'eb', lotName: 'Early Bird', price: '€135', opensAt: '2026-03-25', opensTime: '10:00 CET', state: 'upcoming' as const }] }],
    },
    {
      id: '10',
      name: 'Swiss Alpine Forró',
      location: 'Grindelwald',
      country: 'Switzerland',
      dates: 'August 21-24, 2026',
      image: 'https://images.unsplash.com/photo-1559554498-045a606986f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBjaGFsZXQlMjBzdW1tZXJ8ZW58MXx8fHwxNzczMTc2ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '180-220 dancers',
      venue: 'Chalet Berghaus',
      description: 'Forró at altitude. Dance in a traditional Swiss chalet with the Eiger as your backdrop.',
      highlights: ['Alpine panorama venue', 'Fondue and raclette evenings', 'Mountain hiking options'],
      verificationStatus: 'likely' as const,
      lastUpdate: '3 days ago',
      followers: 312,
      ticketStatus: 'not_announced' as const,
      experienceType: 'mountain' as const,
      locationType: 'mountain' as const,
      coordinates: { lat: 46.6, lng: 8.0 },
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'tbd', lotName: 'TBA', price: 'TBA', state: 'unknown' as const }] }],
    },
    {
      id: '11',
      name: 'Paris Forró Congress',
      location: 'Paris',
      country: 'France',
      dates: 'November 6-9, 2026',
      image: 'https://images.unsplash.com/photo-1650320285532-d91be772c8ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGRhbmNlJTIwaGFsbCUyMHZlbnVlfGVufDF8fHx8MTc3MzE3Njg5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '500-700 dancers',
      venue: 'Le Carreau du Temple',
      description: 'Four days of Forró in one of Paris\'s most iconic venues. The largest gathering in France.',
      highlights: ['Historic Marais venue', '50+ workshops', 'Live bands from Brazil', 'Closing gala dinner'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 day ago',
      followers: 2156,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-04-01',
      nextOpeningTime: '10:00 CET',
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 48.9, lng: 2.4 },
      duration: 'weekend' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'eb', lotName: 'Super Early Bird', price: '€145', opensAt: '2026-04-01', opensTime: '10:00 CET', state: 'upcoming' as const, quota: 'Limited to 80' }] }],
    },
    {
      id: '12',
      name: 'Algarve Forró Sun',
      location: 'Lagos',
      country: 'Portugal',
      dates: 'September 18-21, 2026',
      image: 'https://images.unsplash.com/photo-1665759118208-7f5b9955d9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdhcnZlJTIwcG9ydHVnYWwlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NzMxNzY4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '300-400 dancers',
      venue: 'Centro Cultural de Lagos',
      description: 'End-of-summer Forró on the Algarve coast. Golden cliffs, warm water, and non-stop dancing.',
      highlights: ['Cliff-top sunset parties', 'Warm Atlantic beaches', 'Boat trip to grottoes'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '5 days ago',
      followers: 876,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €105',
      ticketUrl: 'https://example.com',
      experienceType: 'sea' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 37.1, lng: -8.7 },
      duration: 'weekend' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'reg', lotName: '2nd Lot', price: '€105', state: 'current' as const, quota: '65 remaining' }] }],
    },
    {
      id: '13',
      name: 'Vienna Forró Nights',
      location: 'Vienna',
      country: 'Austria',
      dates: 'October 16-19, 2026',
      image: 'https://images.unsplash.com/photo-1585425422155-b669d249a518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWVubmElMjBhdXN0cmlhJTIwYXJjaGl0ZWN0dXJlJTIwZXZlbmluZ3xlbnwxfHx8fDE3NzMxNzY4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '400-500 dancers',
      venue: 'Palais Kabelwerk',
      description: 'Forró meets Viennese elegance. Dance in repurposed industrial spaces with imperial architecture nearby.',
      highlights: ['Stunning industrial-chic venue', 'Coffee house culture', 'Optional city tours'],
      verificationStatus: 'likely' as const,
      lastUpdate: '1 week ago',
      followers: 534,
      ticketStatus: 'not_announced' as const,
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 48.2, lng: 16.4 },
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'tbd', lotName: 'TBA', price: 'TBA', state: 'unknown' as const }] }],
    },
    {
      id: '14',
      name: 'Black Forest Forró Retreat',
      location: 'Freiburg',
      country: 'Germany',
      dates: 'July 24-27, 2026',
      image: 'https://images.unsplash.com/photo-1735518319654-8f1285e50a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGZvcmVzdCUyMGdlcm1hbnklMjBjb3R0YWdlJTIwbmF0dXJlfGVufDF8fHx8MTc3MzE3Njg5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '120-160 dancers',
      venue: 'Waldhotel am Notschreipass',
      description: 'A deeply intimate retreat in Germany\'s Black Forest. Small groups, deep focus, surrounded by nature.',
      highlights: ['Forest setting', 'Max 140 participants', 'Sauna and wellness access', 'Nature walks between classes'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '3 days ago',
      followers: 267,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €160',
      ticketUrl: 'https://example.com',
      experienceType: 'intimate' as const,
      locationType: 'countryside' as const,
      coordinates: { lat: 47.9, lng: 7.8 },
      duration: 'weekend' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'reg', lotName: 'Regular', price: '€160', state: 'current' as const, quota: '28 remaining' }] }],
    },
    {
      id: '15',
      name: 'Lake Como Forró Week',
      location: 'Bellagio',
      country: 'Italy',
      dates: 'August 28-September 4, 2026',
      image: 'https://images.unsplash.com/photo-1661804266944-ce272a0dcdad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwY29tbyUyMGl0YWx5JTIwdmlsbGElMjBzdW1tZXJ8ZW58MXx8fHwxNzczMTc2ODkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '200-280 dancers',
      venue: 'Villa Serbelloni',
      description: 'A full week of Forró on the shores of Lake Como. Italian lakeside luxury meets Brazilian rhythm.',
      highlights: ['Lakeside villa venue', 'Boat excursions between sessions', 'Italian gastronomy program', 'Sunset aperitivo dancing'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 1124,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-04-15',
      nextOpeningTime: '09:00 CET',
      experienceType: 'immersive' as const,
      locationType: 'countryside' as const,
      coordinates: { lat: 46.0, lng: 9.3 },
      duration: 'week' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Week', lots: [{ id: 'eb', lotName: 'Early Bird', price: '€350', opensAt: '2026-04-15', opensTime: '09:00 CET', state: 'upcoming' as const, quota: 'Limited to 60' }] }],
    },
    {
      id: '16',
      name: 'Seville Forró Fiesta',
      location: 'Seville',
      country: 'Spain',
      dates: 'May 29-June 1, 2026',
      image: 'https://images.unsplash.com/photo-1764218400592-c74357b740c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXZpbGxlJTIwc3BhaW4lMjBwbGF6YSUyMGV2ZW5pbmd8ZW58MXx8fHwxNzczMTc2ODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '350-500 dancers',
      venue: 'Real Alcázar Gardens',
      description: 'Forró meets Andalusian passion. Dance in the shadow of Moorish palaces and historic plazas.',
      highlights: ['Historic palace venue', 'Tapas crawl included', 'Flamenco-Forró fusion show'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '4 days ago',
      followers: 1432,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €110',
      ticketUrl: 'https://example.com',
      experienceType: 'immersive' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 37.4, lng: -6.0 },
      duration: 'weekend' as const,
      passTypes: [{ id: 'full-pass', name: 'Full Pass', lots: [{ id: 'reg', lotName: '2nd Lot', price: '€110', state: 'current' as const, quota: '90 remaining' }] }],
    },
  ];

  // Calendar events
  const calendarEvents: CalendarEvent[] = [
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

  const handleNavigate = (view: 'home' | 'calendar' | 'map' | 'saved') => {
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
    if (!isSignedIn) {
      setPendingAlertFestival(festivalId);
      setSignInAction('alert');
      setShowSignInModal(true);
      return;
    }

    setAlertTargetFestival(festivalId);
    setShowAlertModal(true);
  };

  const handleAlertConfirm = (options: AlertOptions) => {
    if (alertTargetFestival) {
      setAlertSet(prev => {
        const newSet = new Set(prev);
        newSet.add(alertTargetFestival);
        return newSet;
      });
    }
    setShowAlertModal(false);
    setAlertTargetFestival(null);
  };

  const handleSaveFestival = (festivalId: string) => {
    // Removed sign-in requirement for demo purposes
    // if (!isSignedIn) {
    //   setSignInAction('save');
    //   setShowSignInModal(true);
    //   return;
    // }

    setSavedFestivals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(festivalId)) {
        newSet.delete(festivalId);
        // Remove from compare set if unsaved
        setCompareSet(prevCompare => {
          const newCompare = new Set(prevCompare);
          newCompare.delete(festivalId);
          return newCompare;
        });
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
    setShowShareModal(true);
  };

  const handleSubscribeAlerts = () => {
    if (!isSignedIn) {
      setSignInAction('alert');
      setShowSignInModal(true);
      return;
    }
  };

  const handleStatusChange = (festivalId: string, status: 'considering' | 'going') => {
    setFestivalStatuses(prev => ({
      ...prev,
      [festivalId]: status
    }));
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowSignInModal(false);

    if (pendingAlertFestival) {
      setAlertTargetFestival(pendingAlertFestival);
      setShowAlertModal(true);
      setPendingAlertFestival(null);
    }
  };

  // Compare handlers
  const handleToggleCompare = (festivalId: string) => {
    setCompareSet(prev => {
      const newSet = new Set(prev);
      if (newSet.has(festivalId)) {
        newSet.delete(festivalId);
      } else if (newSet.size < 3) {
        newSet.add(festivalId);
      }
      return newSet;
    });
  };

  const handleClearCompare = () => {
    setCompareSet(new Set());
  };

  const handleOpenCompare = () => {
    setShowCompareDrawer(true);
  };

  const handleRemoveFromCompare = (festivalId: string) => {
    setCompareSet(prev => {
      const newSet = new Set(prev);
      newSet.delete(festivalId);
      return newSet;
    });
    if (compareSet.size <= 1) {
      setShowCompareDrawer(false);
    }
  };

  const selectedFestivalData = selectedFestival
    ? festivals.find(f => f.id === selectedFestival)
    : null;

  const alertTargetFestivalData = alertTargetFestival
    ? festivals.find(f => f.id === alertTargetFestival)
    : null;

  const savedFestivalData = festivals.filter(f => savedFestivals.has(f.id));
  
  const planFestivals = savedFestivalData.map(festival => {
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

  const compareFestivals = festivals.filter(f => compareSet.has(f.id));

  // Show compare bar on calendar, saved, and festival views
  const showCompareBar = (currentView === 'calendar' || currentView === 'saved' || currentView === 'festival') && compareSet.size >= 2;

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Navigation */}
      {currentView !== 'festival' && (
        <Navigation
          currentView={currentView as 'home' | 'calendar' | 'saved' | 'map'}
          onNavigate={handleNavigate}
          savedCount={savedFestivals.size}
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
          onSetAlert={handleSetAlert}
          alertSet={alertSet}
        />
      )}

      {currentView === 'calendar' && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <CalendarView
            events={calendarEvents}
            onEventClick={handleFestivalClick}
            onSetAlert={handleSetAlert}
            onSubscribeAlerts={handleSubscribeAlerts}
            isSignedIn={isSignedIn}
            compareSet={compareSet}
            onToggleCompare={handleToggleCompare}
          />
        </div>
      )}

      {currentView === 'festival' && selectedFestivalData && (
        <FestivalPage
          festival={selectedFestivalData}
          onBack={handleBackFromFestival}
          onFollow={() => handleSetAlert(selectedFestivalData.id)}
          isInCompare={compareSet.has(selectedFestivalData.id)}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {currentView === 'map' && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="mb-6 md:mb-8">
            <div className="relative inline-block">
              <div
                className="absolute -left-1 -right-1 bottom-0.5 h-[3px] md:h-2.5 bg-[#FFD600] opacity-35 rounded-sm"
                style={{ transform: 'rotate(-0.3deg)' }}
              />
              <h1 className="text-2xl md:text-4xl font-bold text-foreground relative z-10">Festival Map</h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Explore festivals by location type. Tap pins to learn more.
            </p>
          </div>
          <MapView
            festivals={festivals}
            onFestivalClick={handleFestivalClick}
          />
        </div>
      )}

      {currentView === 'saved' && (
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
          compareSet={compareSet}
          onToggleCompare={handleToggleCompare}
        />
      )}

      {/* Bottom Tab Navigation - Mobile only */}
      {currentView !== 'festival' && (
        <BottomTabNavigation
          currentView={currentView as 'home' | 'calendar' | 'saved' | 'map'}
          onNavigate={handleNavigate}
          savedCount={savedFestivals.size}
        />
      )}

      {/* Compare Sticky Bar */}
      {showCompareBar && (
        <CompareStickyBar
          count={compareSet.size}
          onCompare={handleOpenCompare}
          onClear={handleClearCompare}
        />
      )}

      {/* Compare Drawer */}
      <CompareDrawer
        isOpen={showCompareDrawer}
        onClose={() => setShowCompareDrawer(false)}
        festivals={compareFestivals}
        onRemove={handleRemoveFromCompare}
        onFestivalClick={handleFestivalClick}
      />

      {/* Sign-in modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => {
          setShowSignInModal(false);
          setPendingAlertFestival(null);
        }}
        onSignIn={handleSignIn}
        action={signInAction}
      />

      {/* Alert modal */}
      <AlertModal
        isOpen={showAlertModal}
        onClose={() => {
          setShowAlertModal(false);
          setAlertTargetFestival(null);
        }}
        festivalName={alertTargetFestivalData?.name || ''}
        nextOpeningDate={alertTargetFestivalData?.nextOpeningDate}
        nextOpeningTime={alertTargetFestivalData?.nextOpeningTime}
        onConfirm={handleAlertConfirm}
        isAlreadySet={alertTargetFestival ? alertSet.has(alertTargetFestival) : false}
      />

      {/* Share modal */}
      <SharePlanModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        hasAccount={isSignedIn}
      />
    </div>
  );
}