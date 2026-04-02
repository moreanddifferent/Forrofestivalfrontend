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

  // Festival data - Real festivals from Forró Europe
  const festivals = [
    // INTIMATE GATHERINGS
    {
      id: 'maria-bonita',
      name: 'Maria Bonita Festival',
      location: 'Lisbon',
      country: 'Portugal',
      dates: '6–8 Mar 2026',
      image: 'https://images.unsplash.com/photo-1618431379559-8dae023fb153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JyJUMzJUIzJTIwZGFuY2luZyUyMGNvdXBsZSUyMGludGltYXRlfGVufDF8fHx8MTc3NTE2MTAzNHww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '150-200 dancers',
      venue: 'Lisbon Cultural Center',
      description: 'Warm Lisbon street texture, tiled facades, social dancing atmosphere. An intimate weekend in Portugal\'s capital.',
      highlights: ['Lisbon street atmosphere', 'Tiled facades', 'Social dancing', 'Portuguese culture'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 day ago',
      followers: 421,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €90',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'intimate' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 38.7, lng: -9.1 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€90', state: 'current' as const, quota: '32 remaining' }]
      }],
    },
    {
      id: 'vinil-paris',
      name: 'Vinil Em Paris Forró',
      location: 'Paris',
      country: 'France',
      dates: '8–10 May 2026',
      image: 'https://images.unsplash.com/photo-1768244016584-a2df5873b348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBkYW5jZSUyMGZlc3RpdmFsJTIwcGVvcGxlJTIwZGFuY2luZ3xlbnwxfHx8fDE3NzUxNjEwMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '120-150 dancers',
      venue: 'Paris Dance Hall',
      description: 'Intimate indoor dancefloor, vinyl / retro mood, Paris night warmth. A weekend celebrating vintage forró vibes.',
      highlights: ['Retro vinyl atmosphere', 'Intimate dancefloor', 'Paris night warmth', 'Small community feel'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 312,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €75',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'intimate' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 48.9, lng: 2.4 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€75', state: 'current' as const, quota: '28 remaining' }]
      }],
    },
    {
      id: 'mais-forro',
      name: 'Mais Forró Por Favor',
      location: 'Mèze',
      country: 'France',
      dates: '14–16 Aug 2026',
      image: 'https://images.unsplash.com/photo-1611276974081-e86e87c17a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmF6aWxpYW4lMjBkYW5jZSUyMGZvcnIlQzMlQjMlMjBhY2NvcmRpb258ZW58MXx8fHwxNzc1MTYxMDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '100-150 dancers',
      venue: 'Mèze Seaside',
      description: 'Small southern seaside town, relaxed summer mood, human-scale gathering. Perfect for authentic community connection.',
      highlights: ['Southern French coast', 'Relaxed summer vibes', 'Small-scale gathering', 'Seaside atmosphere'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '4 days ago',
      followers: 287,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €80',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'intimate' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 43.4, lng: 3.6 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€80', state: 'current' as const, quota: '45 remaining' }]
      }],
    },
    {
      id: 'baiao-virada',
      name: 'Baião da Virada',
      location: 'Vaumarcus',
      country: 'Switzerland',
      dates: '29 Dec 2026 – 1 Jan 2027',
      image: 'https://images.unsplash.com/photo-1597668905315-d6b45b0ee281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMGZlc3RpdmFsJTIwcG9zdGVyJTIwZXZlbnR8ZW58MXx8fHwxNzc1MTYxMDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '80-120 dancers',
      venue: 'Vaumarcus Retreat',
      description: 'Cozy countryside retreat, winter gathering, chalet atmosphere with warm lights and community energy. Ring in the New Year dancing.',
      highlights: ['Winter retreat', 'Chalet atmosphere', 'New Year celebration', 'Community gathering'],
      verificationStatus: 'likely' as const,
      lastUpdate: '1 week ago',
      followers: 198,
      ticketStatus: 'not_announced' as const,
      experienceType: 'intimate' as const,
      locationType: 'mountain' as const,
      coordinates: { lat: 46.9, lng: 6.7 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'tbd', lotName: 'TBA', price: 'TBA', state: 'unknown' as const }]
      }],
    },

    // IMMERSIVE WEEKS
    {
      id: 'forro-camp',
      name: 'Forro Camp',
      location: 'Frankenblick',
      country: 'Germany',
      dates: '31 Jul – 7 Aug 2026',
      image: 'https://images.unsplash.com/photo-1769723705343-78fc656ebe96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHZXJtYW55JTIwZm9yZXN0JTIwY291bnRyeXNpZGUlMjByZXRyZWF0fGVufDF8fHx8MTc3NTE1OTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '300-400 dancers',
      venue: 'Frankenblick Retreat Center',
      description: 'Retreat setting, forest and countryside, summer camp atmosphere. A full week of deep immersion in forró.',
      highlights: ['Forest retreat', 'Week-long immersion', 'Summer camp vibe', 'Countryside setting'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 892,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €380',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'immersive' as const,
      locationType: 'countryside' as const,
      coordinates: { lat: 50.4, lng: 10.8 },
      duration: 'week' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Week Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€380', state: 'current' as const, quota: '87 remaining' }]
      }],
    },
    {
      id: 'o-fole-roncou',
      name: 'O Fole Roncou',
      location: 'Valencia',
      country: 'Spain',
      dates: '3–10 Aug 2026',
      image: 'https://images.unsplash.com/photo-1666861585494-f34581cf0d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYWxlbmNpYSUyMFNwYWluJTIwTWVkaXRlcnJhbmVhbnxlbnwxfHx8fDE3NzUxNTk3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '400-500 dancers',
      venue: 'Valencia Cultural Center',
      description: 'Mediterranean venue, warm evening light, immersive summer energy. Live the festival fully for a full week.',
      highlights: ['Mediterranean atmosphere', 'Week-long format', 'Valencia summer vibes', 'Warm evening sessions'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 day ago',
      followers: 1124,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €420',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'immersive' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 39.5, lng: -0.4 },
      duration: 'week' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Week Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€420', state: 'current' as const, quota: '65 remaining' }]
      }],
    },
    {
      id: 'forro-bordeaux-camp',
      name: 'Forró Bordeaux Camp',
      location: 'Lacanau',
      country: 'France',
      dates: '28 May – 2 Jun 2026',
      image: 'https://images.unsplash.com/photo-1760394986877-80a41b10f912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBsYWtlJTIwcGluZXMlMjByZXRyZWF0fGVufDF8fHx8MTc3NTE1OTc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '250-350 dancers',
      venue: 'Lacanau Beach Retreat',
      description: 'Pines, lake and ocean proximity, retreat with beach crossover feeling. Multi-day immersion near the Atlantic.',
      highlights: ['Beach and pines', 'Retreat atmosphere', 'Multi-day immersion', 'Lake and ocean proximity'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '3 days ago',
      followers: 678,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €340',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'immersive' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 45.0, lng: -1.2 },
      duration: 'week' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Multi-day Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€340', state: 'current' as const, quota: '54 remaining' }]
      }],
    },
    {
      id: 'pe-na-terra',
      name: 'Festival Pé na Terra',
      location: 'Almancil',
      country: 'Portugal',
      dates: '27–30 Aug 2026',
      image: 'https://images.unsplash.com/photo-1605908082521-58a82edb515b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbGdhcnZlJTIwUG9ydHVnYWwlMjByZXRyZWF0JTIwbmF0dXJhbHxlbnwxfHx8fDE3NzUxNTk3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '200-300 dancers',
      venue: 'Almancil Retreat',
      description: 'Algarve retreat setting, dry landscape, natural luxury, summer rhythm. Extended format in Portugal\'s south.',
      highlights: ['Algarve nature', 'Retreat setting', 'Natural luxury', 'Summer rhythm'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '5 days ago',
      followers: 543,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-06-15',
      nextOpeningTime: '10:00 CET',
      experienceType: 'immersive' as const,
      locationType: 'countryside' as const,
      coordinates: { lat: 37.1, lng: -8.0 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'eb', lotName: 'Early Bird', price: '€180', opensAt: '2026-06-15', opensTime: '10:00 CET', state: 'upcoming' as const }]
      }],
    },

    // COASTAL FESTIVALS
    {
      id: 'forro-frejus',
      name: 'Festival Forró Fréjus',
      location: 'Fréjus',
      country: 'France',
      dates: '10–12 Jul 2026',
      image: 'https://images.unsplash.com/photo-1758840743454-b1783f733d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmVuY2glMjBSaXZpZXJhJTIwcGFsbSUyMHRyZWVzJTIwY29hc3RhbHxlbnwxfHx8fDE3NzUxNTk3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '400-500 dancers',
      venue: 'Fréjus Beach Venue',
      description: 'Riviera light, palm trees, warm coastal city atmosphere. Dance by the Mediterranean in the French Riviera.',
      highlights: ['French Riviera', 'Palm trees', 'Coastal atmosphere', 'Mediterranean charm'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '3 days ago',
      followers: 892,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-04-05',
      nextOpeningTime: '10:00 CET',
      experienceType: 'sea' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 43.4, lng: 6.7 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'eb', lotName: 'Early Bird', price: '€125', opensAt: '2026-04-05', opensTime: '10:00 CET', state: 'upcoming' as const }]
      }],
    },
    {
      id: 'forro-brighton',
      name: 'Forró à Beira Mar Brighton',
      location: 'Brighton',
      country: 'United Kingdom',
      dates: '24–27 Jul 2026',
      image: 'https://images.unsplash.com/photo-1757721030812-c8e91f73373a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmlnaHRvbiUyMHNlYWZyb250JTIwaG9yaXpvbiUyMGJlYWNofGVufDF8fHx8MTc3NTE1OTc4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '300-400 dancers',
      venue: 'Brighton Seafront Venue',
      description: 'Brighton seafront, horizon, breezy social-weekend mood. Dance by the sea on the UK coast.',
      highlights: ['Seafront location', 'Breezy atmosphere', 'UK coastal vibes', 'Extended weekend format'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 day ago',
      followers: 745,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From £95',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'sea' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 50.8, lng: -0.1 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '£95', state: 'current' as const, quota: '78 remaining' }]
      }],
    },
    {
      id: 'baiao-acores',
      name: 'O Baião Vai – Açores',
      location: 'Santa Maria Island',
      country: 'Portugal',
      dates: '28–30 Aug 2026',
      image: 'https://images.unsplash.com/photo-1625752837631-0771d9da8eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBem9yZXMlMjBBdGxhbnRpYyUyMGlzbGFuZCUyMGNsaWZmc3xlbnwxfHx8fDE3NzUxNTk3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '150-200 dancers',
      venue: 'Santa Maria Island Venue',
      description: 'Atlantic island landscape, cliffs, sea, remote escape feeling. A unique island forró experience.',
      highlights: ['Atlantic island', 'Dramatic cliffs', 'Remote escape', 'Island adventure'],
      verificationStatus: 'likely' as const,
      lastUpdate: '1 week ago',
      followers: 421,
      ticketStatus: 'not_announced' as const,
      experienceType: 'sea' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 37.0, lng: -25.1 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'tbd', lotName: 'TBA', price: 'TBA', state: 'unknown' as const }]
      }],
    },
    {
      id: 'forro-utopia',
      name: 'Forró da Utopia',
      location: 'Algarve',
      country: 'Portugal',
      dates: 'Weekend format',
      image: 'https://images.unsplash.com/photo-1635619610074-fb2b74a05619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbGdhcnZlJTIwY29hc3QlMjBnb2xkZW4lMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc1MTU5Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '200-250 dancers',
      venue: 'Algarve Coast',
      description: 'Algarve coast, dry golden landscape, sun, nature and sea. Regular weekend gatherings in Portugal\'s golden coast.',
      highlights: ['Golden coast', 'Algarve nature', 'Sea and sun', 'Weekend format'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '4 days ago',
      followers: 532,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €110',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'sea' as const,
      locationType: 'sea' as const,
      coordinates: { lat: 37.1, lng: -8.5 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Weekend Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€110', state: 'current' as const, quota: '43 remaining' }]
      }],
    },

    // CITY FESTIVALS
    {
      id: 'sereia-barcelona',
      name: 'Festival Sereia Barcelona',
      location: 'Barcelona',
      country: 'Spain',
      dates: '6–8 Feb 2026',
      image: 'https://images.unsplash.com/photo-1616053508777-9179064c92d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYXJjZWxvbmElMjBzdW5zZXQlMjB0ZXJyYWNlJTIwY2l0eXxlbnwxfHx8fDE3NzUxNTk3ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '400-600 dancers',
      venue: 'Barcelona Venue',
      description: 'Barcelona sunset, terraces, warm city energy. Urban weekend with strong local scene and easy city-trip appeal.',
      highlights: ['City festival', 'Barcelona sunset terraces', 'Urban weekend', 'Strong local scene'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 1247,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-01-10',
      nextOpeningTime: '10:00 CET',
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 41.4, lng: 2.2 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'eb', lotName: 'Early Bird', price: '€95', opensAt: '2026-01-10', opensTime: '10:00 CET', state: 'upcoming' as const }]
      }],
    },
    {
      id: 'baiaothon-paname',
      name: 'Baiãothon Paname',
      location: 'Paris',
      country: 'France',
      dates: '13–15 Feb 2026',
      image: 'https://images.unsplash.com/photo-1765049526506-3c2b058c0483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMGRhbmNlJTIwdmVudUxlbnwxfHx8fDE3NzUxNTk3g1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '400-500 dancers',
      venue: 'Paris Dance Hall',
      description: 'Paris dance venue, social energy, indoor urban warmth. A vibrant city weekend in the heart of Paris.',
      highlights: ['Paris urban energy', 'Social dance venue', 'Indoor warmth', 'City atmosphere'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 987,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €85',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 48.9, lng: 2.3 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€85', state: 'current' as const, quota: '92 remaining' }]
      }],
    },
    {
      id: 'tome-forro-berlin',
      name: 'Tome Forró Berlin',
      location: 'Berlin',
      country: 'Germany',
      dates: '5–8 Jun 2026',
      image: 'https://images.unsplash.com/photo-1759013700423-0643f406a910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjB1cmJhbiUyMG5pZ2h0JTIwdmVudUxlbnwxfHx8fDE3NzUxNTk3g1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '500-600 dancers',
      venue: 'Berlin Cultural Space',
      description: 'Berlin urban night, raw stylish venue, creative city feeling. Dance in Germany\'s creative capital.',
      highlights: ['Berlin nightlife', 'Creative urban vibe', 'Raw stylish venue', 'Extended weekend'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '1 day ago',
      followers: 1456,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €95',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 52.5, lng: 13.4 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€95', state: 'current' as const, quota: '112 remaining' }]
      }],
    },
    {
      id: 'turin-forro',
      name: 'Turin Forró Fest',
      location: 'Turin',
      country: 'Italy',
      dates: '13–15 Nov 2026',
      image: 'https://images.unsplash.com/photo-1762698860689-993c1ddf0741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUdXJpbiUyMEl0YWx5JTIwYXJjYWRlcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1MTU5Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '300-400 dancers',
      venue: 'Turin Historic Center',
      description: 'Elegant northern Italian city, arcades, compact city-festival mood. Dance in Turin\'s elegant historic setting.',
      highlights: ['Elegant Italian setting', 'Historic arcades', 'City festival mood', 'Northern Italian charm'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '3 days ago',
      followers: 621,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €90',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 45.1, lng: 7.7 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€90', state: 'current' as const, quota: '67 remaining' }]
      }],
    },

    // MOUNTAIN FESTIVALS
    {
      id: 'forro-diois',
      name: 'Festival ForróDiois',
      location: 'Châtillon-en-Diois',
      country: 'France',
      dates: '17–20 Jul 2026',
      image: 'https://images.unsplash.com/photo-1744275746121-f609ae0ad06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGcmFuY2UlMjBtb3VudGFpbiUyMHZpbGxhZ2UlMjBzdW1tZXJ8ZW58MXx8fHwxNzc1MTU5NzkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '200-300 dancers',
      venue: 'Châtillon Village',
      description: 'Foothills, village, summer mountain-air retreat feeling. Dance in the French mountain foothills.',
      highlights: ['Mountain foothills', 'Village atmosphere', 'Summer mountain air', 'Nature retreat'],
      verificationStatus: 'confirmed' as const,
      lastUpdate: '2 days ago',
      followers: 432,
      ticketStatus: 'open_now' as const,
      currentPrice: 'From €130',
      ticketUrl: 'https://example.com/tickets',
      experienceType: 'mountain' as const,
      locationType: 'mountain' as const,
      coordinates: { lat: 44.7, lng: 5.5 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'reg', lotName: 'Regular', price: '€130', state: 'current' as const, quota: '48 remaining' }]
      }],
    },
    {
      id: 'baerenthal-forro',
      name: 'Baerenthal Forró Wochenende',
      location: 'Baerenthal',
      country: 'Germany',
      dates: 'Date TBA',
      image: 'https://images.unsplash.com/photo-1675862963218-c7239d85a89e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHZXJtYW4lMjBmb3Jlc3QlMjBoaWxscyUyMHJldHJlYXR8ZW58MXx8fHwxNzc1MTU5Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '100-150 dancers',
      venue: 'Baerenthal Forest Retreat',
      description: 'Forest retreat, hills, quiet nature setting, intimate gathering mood. A weekend in the German forest hills.',
      highlights: ['Forest retreat', 'Hills and nature', 'Intimate gathering', 'Quiet setting'],
      verificationStatus: 'likely' as const,
      lastUpdate: '1 week ago',
      followers: 198,
      ticketStatus: 'not_announced' as const,
      experienceType: 'mountain' as const,
      locationType: 'mountain' as const,
      coordinates: { lat: 49.0, lng: 7.5 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'tbd', lotName: 'TBA', price: 'TBA', state: 'unknown' as const }]
      }],
    },

    // ADDITIONAL FESTIVAL FOR TICKETS OPENING SOON STRIP
    {
      id: 'forro-douro',
      name: 'Forró Douro',
      location: 'Porto',
      country: 'Portugal',
      dates: 'Date TBA',
      image: 'https://images.unsplash.com/photo-1713124411405-102025bcb86f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb3J0byUyMFBvcnR1Z2FsJTIwcml2ZXJzaWRlJTIwY2l0eXxlbnwxfHx8fDE3NzUxNTk3ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      attendees: '300-400 dancers',
      venue: 'Porto Venue',
      description: 'Porto riverside city atmosphere. A festival along the Douro river.',
      highlights: ['Porto riverside', 'City atmosphere', 'Douro river'],
      verificationStatus: 'likely' as const,
      lastUpdate: '1 week ago',
      followers: 543,
      ticketStatus: 'opening_soon' as const,
      nextOpeningDate: '2026-03-20',
      nextOpeningTime: '12:00 CET',
      experienceType: 'urban' as const,
      locationType: 'urban' as const,
      coordinates: { lat: 41.1, lng: -8.6 },
      duration: 'weekend' as const,
      passTypes: [{
        id: 'full-pass',
        name: 'Full Pass',
        lots: [{ id: 'eb', lotName: 'Early Bird', price: '€85', opensAt: '2026-03-20', opensTime: '12:00 CET', state: 'upcoming' as const }]
      }],
    },
  ];

  // Calendar events
  const calendarEvents: CalendarEvent[] = [
    // Ticket openings
    {
      type: 'ticket_opening',
      data: {
        festivalId: 'sereia-barcelona',
        festivalName: 'Festival Sereia Barcelona',
        location: 'Barcelona',
        country: 'Spain',
        opensAt: '2026-01-10',
        opensTime: '10:00 CET',
        price: 'From €95',
        lotName: 'Early Bird',
      },
    },
    {
      type: 'ticket_opening',
      data: {
        festivalId: 'forro-douro',
        festivalName: 'Forró Douro',
        location: 'Porto',
        country: 'Portugal',
        opensAt: '2026-03-20',
        opensTime: '12:00 CET',
        price: 'From €85',
        lotName: 'Early Bird',
      },
    },
    {
      type: 'ticket_opening',
      data: {
        festivalId: 'forro-frejus',
        festivalName: 'Festival Forró Fréjus',
        location: 'Fréjus',
        country: 'France',
        opensAt: '2026-04-05',
        opensTime: '10:00 CET',
        price: 'From €125',
        lotName: 'Early Bird',
      },
    },
    {
      type: 'ticket_opening',
      data: {
        festivalId: 'pe-na-terra',
        festivalName: 'Festival Pé na Terra',
        location: 'Almancil',
        country: 'Portugal',
        opensAt: '2026-06-15',
        opensTime: '10:00 CET',
        price: 'From €180',
        lotName: 'Early Bird',
      },
    },
    // Festival dates
    {
      type: 'festival',
      data: {
        festivalId: 'sereia-barcelona',
        festivalName: 'Festival Sereia Barcelona',
        location: 'Barcelona',
        country: 'Spain',
        startDate: '2026-02-06',
        endDate: '2026-02-08',
        image: 'https://images.unsplash.com/photo-1616053508777-9179064c92d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'baiaothon-paname',
        festivalName: 'Baiãothon Paname',
        location: 'Paris',
        country: 'France',
        startDate: '2026-02-13',
        endDate: '2026-02-15',
        image: 'https://images.unsplash.com/photo-1765049526506-3c2b058c0483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'maria-bonita',
        festivalName: 'Maria Bonita Festival',
        location: 'Lisbon',
        country: 'Portugal',
        startDate: '2026-03-06',
        endDate: '2026-03-08',
        image: 'https://images.unsplash.com/photo-1583512604043-c2249f012710?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'vinil-paris',
        festivalName: 'Vinil Em Paris Forró',
        location: 'Paris',
        country: 'France',
        startDate: '2026-05-08',
        endDate: '2026-05-10',
        image: 'https://images.unsplash.com/photo-1647764300599-227144cb3f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'forro-bordeaux-camp',
        festivalName: 'Forró Bordeaux Camp',
        location: 'Lacanau',
        country: 'France',
        startDate: '2026-05-28',
        endDate: '2026-06-02',
        image: 'https://images.unsplash.com/photo-1760394986877-80a41b10f912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'tome-forro-berlin',
        festivalName: 'Tome Forró Berlin',
        location: 'Berlin',
        country: 'Germany',
        startDate: '2026-06-05',
        endDate: '2026-06-08',
        image: 'https://images.unsplash.com/photo-1759013700423-0643f406a910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'forro-frejus',
        festivalName: 'Festival Forró Fréjus',
        location: 'Fréjus',
        country: 'France',
        startDate: '2026-07-10',
        endDate: '2026-07-12',
        image: 'https://images.unsplash.com/photo-1758840743454-b1783f733d73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'forro-diois',
        festivalName: 'Festival ForróDiois',
        location: 'Châtillon-en-Diois',
        country: 'France',
        startDate: '2026-07-17',
        endDate: '2026-07-20',
        image: 'https://images.unsplash.com/photo-1744275746121-f609ae0ad06a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'forro-brighton',
        festivalName: 'Forró à Beira Mar Brighton',
        location: 'Brighton',
        country: 'United Kingdom',
        startDate: '2026-07-24',
        endDate: '2026-07-27',
        image: 'https://images.unsplash.com/photo-1757721030812-c8e91f73373a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'forro-camp',
        festivalName: 'Forro Camp',
        location: 'Frankenblick',
        country: 'Germany',
        startDate: '2026-07-31',
        endDate: '2026-08-07',
        image: 'https://images.unsplash.com/photo-1769723705343-78fc656ebe96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'o-fole-roncou',
        festivalName: 'O Fole Roncou',
        location: 'Valencia',
        country: 'Spain',
        startDate: '2026-08-03',
        endDate: '2026-08-10',
        image: 'https://images.unsplash.com/photo-1666861585494-f34581cf0d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'mais-forro',
        festivalName: 'Mais Forró Por Favor',
        location: 'Mèze',
        country: 'France',
        startDate: '2026-08-14',
        endDate: '2026-08-16',
        image: 'https://images.unsplash.com/photo-1760800579851-f771cbe34584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'pe-na-terra',
        festivalName: 'Festival Pé na Terra',
        location: 'Almancil',
        country: 'Portugal',
        startDate: '2026-08-27',
        endDate: '2026-08-30',
        image: 'https://images.unsplash.com/photo-1605908082521-58a82edb515b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'baiao-acores',
        festivalName: 'O Baião Vai – Açores',
        location: 'Santa Maria Island',
        country: 'Portugal',
        startDate: '2026-08-28',
        endDate: '2026-08-30',
        image: 'https://images.unsplash.com/photo-1625752837631-0771d9da8eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'turin-forro',
        festivalName: 'Turin Forró Fest',
        location: 'Turin',
        country: 'Italy',
        startDate: '2026-11-13',
        endDate: '2026-11-15',
        image: 'https://images.unsplash.com/photo-1762698860689-993c1ddf0741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    },
    {
      type: 'festival',
      data: {
        festivalId: 'baiao-virada',
        festivalName: 'Baião da Virada',
        location: 'Vaumarcus',
        country: 'Switzerland',
        startDate: '2026-12-29',
        endDate: '2027-01-01',
        image: 'https://images.unsplash.com/photo-1734258209509-b89d52a4ea08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
    // Parse dates for saved festivals
    let startDate = new Date(2026, 0, 1);
    let endDate = new Date(2026, 0, 1);
    
    // Try to parse the date format "6–8 Mar 2026"
    const dateMatch = festival.dates.match(/(\d+)–(\d+)\s+(\w+)\s+(\d+)/);
    if (dateMatch) {
      const [, startDay, endDay, month, year] = dateMatch;
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
                className="absolute -left-1 -right-1 bottom-0.5 h-2 md:h-3 bg-[#FFD600] opacity-35 rounded-sm"
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