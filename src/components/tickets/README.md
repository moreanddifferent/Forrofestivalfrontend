# Ticket Timeline Components

Reusable, premium components for displaying ticket information with temporal intelligence. Designed for the Forró Festival platform using O Fole Roncou as a reference.

## Philosophy

This is **not** a generic event ticketing UI. This is a **ticket timeline + anticipation product** that:

- Shows chronological progression of ticket lots (past → present → future)
- Displays past lots for transparency and trust
- Highlights the current lot as the hero
- Supports multiple pass types with independent timelines
- Maintains a calm, premium, travel-grade aesthetic

## Components

### 1. TicketStatusBadge

**Purpose:** Display festival-level ticket status at a glance

**Variants:**
- `open_now` - Tickets currently available (with price)
- `opening_soon` - Next opening date and time
- `not_announced` - No dates available yet
- `sold_out` - All tickets sold

**Usage:**
```tsx
import { TicketStatusBadge } from './components/tickets';

<TicketStatusBadge 
  variant="open_now" 
  price="From €120" 
/>

<TicketStatusBadge 
  variant="opening_soon" 
  opensAt="2026-04-20" 
  opensTime="10:00 CET" 
/>
```

### 2. TicketLotRow

**Purpose:** Display a single ticket lot in the timeline

**States:**
- `past` - Previously sold lot (muted, shows "Sold out")
- `current` - Currently available lot (highlighted, pulsing dot)
- `upcoming` - Future lot (blue accent)
- `unknown` - Lot without announced date (dashed border)

**Usage:**
```tsx
import { TicketLotRow } from './components/tickets';

<TicketLotRow
  lotName="2nd Lot"
  price="€120"
  opensAt="2026-03-01"
  opensTime="12:00 CET"
  state="current"
  quota="45 remaining"
/>
```

### 3. TicketTimelineBlock

**Purpose:** Display a chronological timeline of all lots for a pass type

**Features:**
- Automatic chronological sorting
- Visual timeline with connecting line
- Responsive to lot count

**Usage:**
```tsx
import { TicketTimelineBlock } from './components/tickets';

const lots = [
  {
    id: 'lot-1',
    lotName: '1st Lot',
    price: '€95',
    opensAt: '2026-01-15',
    opensTime: '10:00 CET',
    state: 'past',
  },
  {
    id: 'lot-2',
    lotName: '2nd Lot',
    price: '€120',
    opensAt: '2026-03-01',
    opensTime: '12:00 CET',
    state: 'current',
    quota: '45 remaining',
  },
  // ... more lots
];

<TicketTimelineBlock lots={lots} />
```

### 4. PassTypeTabs

**Purpose:** Switch between different pass types (Full Pass, Party Pass, etc.)

**Features:**
- Single tab renders without tabs UI
- Multiple tabs render with tab interface
- Optional descriptions per tab

**Usage:**
```tsx
import { PassTypeTabs, PassTypeTab } from './components/tickets';

const tabs: PassTypeTab[] = [
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

<PassTypeTabs tabs={tabs} />
```

### 5. TicketActionPanel

**Purpose:** Primary CTA and trust signals

**Variants:**
- `buy` - Purchase button with external link
- `follow` - Follow next opening button
- `not_announced` - Get notified button
- `sold_out` - Sold out message

**Features:**
- Trust line (verification, last update)
- Social proof (follower count)
- Contextual CTAs

**Usage:**
```tsx
import { TicketActionPanel } from './components/tickets';

<TicketActionPanel 
  variant="buy" 
  purchaseUrl="https://tickets.example.com"
  trustLine="Verified by organizers · Updated 2 days ago"
  followers={1247}
/>
```

## Composition Example

Complete festival detail view:

```tsx
import { 
  TicketStatusBadge, 
  TicketTimelineBlock, 
  PassTypeTabs,
  TicketActionPanel 
} from './components/tickets';

function FestivalDetail({ festival }) {
  const passTypeTabs = festival.passTypes.map(passType => ({
    id: passType.id,
    label: passType.name,
    description: passType.description,
    content: <TicketTimelineBlock lots={passType.lots} />,
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>{festival.name}</h1>
          <p>{festival.dates} · {festival.location}</p>
        </div>
        <TicketStatusBadge 
          variant={festival.ticketStatus} 
          price={festival.currentPrice}
        />
      </div>

      {/* Tickets */}
      <div className="mt-8">
        <PassTypeTabs tabs={passTypeTabs} />
        
        <div className="mt-6">
          <TicketActionPanel 
            variant={festival.actionVariant}
            purchaseUrl={festival.ticketUrl}
            trustLine={festival.trustLine}
            followers={festival.followers}
          />
        </div>
      </div>
    </div>
  );
}
```

## Design Principles

1. **Chronological Truth:** Lots are always displayed in time order, never by status priority
2. **Transparency:** Past lots remain visible to build trust
3. **Hero Current Lot:** The available lot gets visual prominence
4. **Calm Premium:** No aggressive colors, exclamation marks, or hype language
5. **Travel-Grade:** Inspired by Airbnb's reliability and editorial aesthetic

## Data Model

```typescript
interface TicketLot {
  id: string;
  lotName: string; // "1st Lot", "Early Bird", "Standard Tier"
  price: string; // "€95" or "€120-€150"
  opensAt?: string; // ISO date string
  opensTime?: string; // "12:00 CET"
  state: 'past' | 'current' | 'upcoming' | 'unknown';
  tierDescription?: string; // Additional context
  quota?: string; // "45 remaining"
}

interface PassType {
  id: string;
  label: string; // "Full Pass", "Party Pass"
  description?: string;
  lots: TicketLot[];
}
```

## Notes

- All dates are in ISO 8601 format
- Times include timezone (e.g., "12:00 CET")
- Price strings should be pre-formatted (e.g., "€120" or "From €95")
- Quotas are free-form strings for flexibility ("45 remaining", "Limited to 50 spots")
