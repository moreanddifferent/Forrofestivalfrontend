# Festival Page

A complete festival detail page designed around **ticket decision-making**.

## Philosophy

This page is not a generic event listing. It's a **ticket timeline + anticipation product** that helps dancers make informed ticket purchasing decisions.

### Design Principles

1. **Hierarchy for Decision-Making**
   - Hero establishes desire + ticket status at a glance
   - Tickets section is the primary content block
   - Supporting information (about, venue) is secondary

2. **Ticket Timeline is Central**
   - Multiple lots per pass type shown chronologically
   - Past lots remain visible to build trust and transparency
   - Current lot gets hero treatment
   - Future lots help with planning

3. **Dual CTAs Have Equal Weight**
   - "Buy tickets" for immediate action
   - "Follow ticket alerts" for future planning
   - Both are first-class citizens in the UI

4. **Trust Signals Are Visible**
   - Verification status (confirmed by organizers)
   - Last updated timestamp
   - Follower count as social proof
   - No aggressive sales language

5. **Tone: Calm, Travel-Grade**
   - No community noise or hype
   - No sales pressure
   - Factual, editorial language
   - Premium aesthetic inspired by Airbnb

## Page Structure

```
┌─────────────────────────────────────┐
│ Back navigation                     │
├─────────────────────────────────────┤
│                                     │
│ Hero Image (21:9 aspect ratio)     │
│                                     │
├─────────────────────────────────────┤
│ Festival Name          [Badge]      │
│ Location · Dates · Attendance       │
│ [Verification badge]                │
├─────────────────────────────────────┤
│                                     │
│ ┌──────────────┬──────────────────┐ │
│ │ TICKETS      │ Details sidebar  │ │
│ │ (PRIMARY)    │ • Venue info     │ │
│ │              │ • Trust signals  │ │
│ │ [Timeline]   │                  │ │
│ │ [Action CTA] │                  │ │
│ │              │                  │ │
│ │ About        │                  │ │
│ │ Highlights   │                  │ │
│ └──────────────┴──────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

## Component Hierarchy

```tsx
<FestivalPage>
  {/* Hero Section */}
  <Hero>
    <HeroImage />
    <FestivalHeader>
      <Title + Meta info />
      <TicketStatusBadge />
    </FestivalHeader>
    <VerificationBadge />
  </Hero>

  {/* Main Content */}
  <MainContent>
    <PrimaryColumn>
      {/* TICKETS - PRIMARY CONTENT */}
      <TicketsSection>
        <PassTypeTabs>
          <TicketTimelineBlock />
        </PassTypeTabs>
        <TicketActionPanel />
      </TicketsSection>

      {/* About - Secondary */}
      <AboutSection>
        <Description />
        <Highlights />
      </AboutSection>
    </PrimaryColumn>

    <Sidebar>
      <VenueDetails />
      <TrustSignals />
    </Sidebar>
  </MainContent>
</FestivalPage>
```

## Usage Example

```tsx
import { FestivalPage } from './components/FestivalPage';

function App() {
  const festival = {
    // Basic info
    name: 'Forró do Sol',
    location: 'Cascais',
    country: 'Portugal',
    dates: 'June 20-23, 2026',
    image: 'https://...',
    attendees: '400-500 dancers',
    venue: 'Casa da Guia Cultural Center',
    description: '...',
    highlights: [...],
    
    // Trust signals
    verificationStatus: 'confirmed',
    lastUpdate: '2 days ago',
    followers: 1247,
    
    // Ticket status (derived from timeline)
    ticketStatus: 'open_now',
    currentPrice: 'From €120',
    ticketUrl: 'https://tickets.example.com',
    
    // Pass types with lot timelines
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
            state: 'past', // Shows "Sold out"
          },
          {
            id: 'lot-2',
            lotName: '2nd Lot',
            price: '€120',
            opensAt: '2026-03-01',
            opensTime: '12:00 CET',
            state: 'current', // Hero treatment
            quota: '45 remaining',
          },
          {
            id: 'lot-3',
            lotName: '3rd Lot',
            price: '€145',
            opensAt: '2026-04-20',
            opensTime: '10:00 CET',
            state: 'upcoming',
          },
        ],
      },
    ],
  };

  return <FestivalPage festival={festival} />;
}
```

## Ticket States

The page adapts based on the festival's ticket status:

### 1. Tickets Open (`open_now`)
- **Badge:** "Tickets open · From €120"
- **Timeline:** Past lots + Current lot (hero) + Future lots
- **Action:** "Buy tickets now" button with external link
- **Trust:** Verification + follower count

### 2. Opening Soon (`opening_soon`)
- **Badge:** "Opens Mar 15 · 10:00 CET"
- **Timeline:** All upcoming lots
- **Action:** "Follow next opening" button
- **Trust:** Verification + follower count

### 3. Not Announced (`not_announced`)
- **Badge:** "Not announced"
- **Timeline:** Estimated lots with "TBA" or ranges
- **Action:** "Get notified" button
- **Trust:** Verification status (likely confirmed)

### 4. Sold Out (`sold_out`)
- **Badge:** "Sold out"
- **Timeline:** All past lots showing progression
- **Action:** "All tickets are sold out" message
- **Trust:** Full history for transparency

## Key Features

### Past Lots Visibility
Past lots remain visible to:
- Show price progression
- Build trust through transparency
- Help users understand lot structure
- Provide context for future lots

### Chronological Timeline
Lots are always shown in chronological order:
- Past → Present → Future
- Never sorted by status or price
- Creates temporal narrative
- Helps with planning

### Hero Current Lot
When tickets are open:
- Current lot gets visual emphasis
- Larger text and enhanced shadow
- Animated pulsing dot
- Clear "Buy now" CTA

### Equal CTA Weight
"Follow alerts" is as important as "Buy tickets":
- Prominent button placement
- Same visual hierarchy
- Acknowledges users in planning mode
- Anticipation is part of the product

### Trust Signals
Always visible:
- Verification badge (confirmed by organizers)
- Last update timestamp
- Follower count
- No fake urgency or scarcity tactics

## Responsive Behavior

- **Desktop (lg+):** Two-column layout (2/3 content + 1/3 sidebar)
- **Tablet/Mobile:** Single column, sidebar stacks below
- **Hero image:** Maintains 21:9 aspect ratio on all screens

## Visual Language

### Colors
- Primary accent for current lot and CTAs
- Blue accent for upcoming lots
- Muted grays for past lots
- Green for verification badges
- No red, no urgency colors

### Typography
- Large, clear headings
- Generous line-height for readability
- Muted foreground for secondary text
- No all-caps, no exclamation marks

### Spacing
- Generous padding and margins
- Clear visual separation between sections
- Breathing room around CTAs

### Borders and Cards
- Soft border radius (rounded-xl)
- Subtle shadows on current lot only
- Muted backgrounds (bg-muted/20)

## Reference

Inspired by:
- **O Fole Roncou:** Multi-lot ticket structure
- **Airbnb:** Travel-grade reliability and trust
- **Editorial design:** Calm, factual presentation
- **Travel booking platforms:** Decision-focused hierarchy
