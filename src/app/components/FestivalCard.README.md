# Festival Card

The core discovery unit for browsing festivals. Clean, travel-inspired, and designed around ticket intelligence.

## Philosophy

The Festival Card is **not** an event listing card. It's a **ticket-aware discovery unit** that:

- Reduces complex ticket information to one simple, reliable signal
- Communicates urgency without pressure
- Feels like a travel product (Airbnb-inspired)
- Maintains calm, trustworthy aesthetics

## Design Principles

### 1. One Festival = One Card = One Badge

Every card shows **exactly one ticket status badge** overlaid on the image. This badge is the primary signal for decision-making:

- **Tickets open · From €X** - Available now
- **Opens {date} · {time}** - Coming soon
- **Tickets not announced** - No dates yet
- **Sold out** - All gone

### 2. Ticket Complexity is Hidden

Behind a simple badge like "From €120" might be:
- 4 different lots (Early Bird, 2nd, 3rd, 4th)
- 2 pass types (Full Pass, Party Pass)
- Different pricing tiers
- Progressive price increases

**None of this appears on the card.** The complexity lives on the festival detail page.

### 3. Communicate: Where, When, Urgency

Every card answers three questions at a glance:
- **Where?** Location + Country (MapPin icon)
- **When?** Dates (Calendar icon)
- **How urgent?** Ticket status badge (on image)

### 4. No Direct Actions

The card does **NOT** include:
- ❌ Buy buttons
- ❌ Ticket platform links
- ❌ "More info" buttons
- ❌ Attendance numbers
- ❌ Venue details
- ❌ Lot breakdown

The entire card is clickable. One action: view details.

## Visual Structure

```
┌──────────────────────────┐
│   IMAGE (4:3 ratio)      │
│   [Badge overlay]        │
│   (subtle gradient)      │
├──────────────────────────┤
│ Festival Name            │
│                          │
│ 📍 Location, Country     │
│ 📅 Dates                 │
└──────────────────────────┘
```

### Badge Placement

- **Position:** Top-left, 16px from edges
- **Always visible** on image
- **Gradient overlay** ensures readability
- **No background dimming** of entire image

### Image

- **Aspect ratio:** 4:3 (travel-booking standard)
- **Hover effect:** Subtle scale (1.05x)
- **Transition:** Smooth 500ms
- **Quality:** High-resolution, editorial style

### Content Area

- **Padding:** 20px
- **Name:** Large (text-lg), semibold, one line
- **Meta:** Small (text-sm), muted, icons for clarity
- **Hover:** Name color shifts to primary

## Usage Example

```tsx
import { FestivalCard } from './components/FestivalCard';

function FestivalListing() {
  const festivals = [
    {
      id: '1',
      name: 'Forró do Sol',
      location: 'Cascais',
      country: 'Portugal',
      dates: 'June 20-23, 2026',
      image: 'https://...',
      ticketStatus: 'open_now',
      currentPrice: 'From €120',
    },
    // ... more festivals
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {festivals.map(festival => (
        <FestivalCard
          key={festival.id}
          festival={festival}
          onClick={() => navigateToFestival(festival.id)}
        />
      ))}
    </div>
  );
}
```

## Badge Variants

### 1. Tickets Open (`open_now`)
```
Tickets open · From €120
```
- Shows current minimum price
- Green dot indicator
- Most urgent state

### 2. Opening Soon (`opening_soon`)
```
Opens Mar 15 · 10:00 CET
```
- Shows specific date and time
- Clock icon
- Creates anticipation

### 3. Not Announced (`not_announced`)
```
Tickets not announced
```
- Muted styling
- Clock icon
- Signals "follow for updates"

### 4. Sold Out (`sold_out`)
```
Sold out
```
- Muted styling
- No icon
- Signals "too late"

## Grid Layouts

### Desktop (lg+)
```
3 columns, 24px gap
[Card] [Card] [Card]
[Card] [Card] [Card]
```

### Tablet (md)
```
2 columns, 24px gap
[Card] [Card]
[Card] [Card]
```

### Mobile
```
1 column, 24px gap
[Card]
[Card]
```

## Responsive Behavior

- **Image ratio:** Always 4:3 on all screens
- **Card width:** Fluid, fills grid column
- **Badge:** Always visible, readable on mobile
- **Touch target:** Entire card is tappable

## Visual Language

### Colors
- **Background:** bg-background (system)
- **Border:** None (shadow on hover only)
- **Text:** Foreground + muted-foreground
- **Badge:** Context-dependent (see TicketStatusBadge)

### Typography
- **Name:** text-lg, font-semibold
- **Meta:** text-sm, text-muted-foreground
- **Line clamp:** 1 line for name, 1 line for location/dates

### Shadows
- **Default:** None
- **Hover:** xl shadow (dramatic lift)
- **Transition:** All 300ms

### Borders
- **Radius:** rounded-xl (12px)
- **Color:** None (clean edges)

## Interaction

### Hover State
- Image scales to 105%
- Card lifts with xl shadow
- Name color shifts to primary
- Smooth 300ms transition

### Click Action
- Entire card is clickable
- Opens festival detail page
- No button chrome needed

### Focus State
- Keyboard accessible
- Focus ring follows system defaults

## Reference: O Fole Roncou

O Fole Roncou sells tickets in 4 lots:
- 1st Lot: €95
- 2nd Lot: €120
- 3rd Lot: €145
- 4th Lot: €165

On the **Festival Card**, this appears as:
```
Tickets open · From €120
```

Simple. Reliable. The user clicks to learn about lots, history, and timing.

## Travel-Grade Aesthetic

Inspired by Airbnb and modern travel booking:

✅ **Clean imagery** - No text overlays except badge  
✅ **Calm colors** - Muted, professional palette  
✅ **Generous whitespace** - Breathing room  
✅ **Subtle interactions** - No jarring animations  
✅ **Editorial photos** - High-quality, curated images  
✅ **Trustworthy signals** - Verified badge, clear dates  
✅ **Product-grade** - Not DIY, not event-blog  

## Data Model

```typescript
interface FestivalCardData {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string; // "June 20-23, 2026"
  image: string; // URL
  
  // Ticket intelligence (derived from lot timeline)
  ticketStatus: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  currentPrice?: string; // "From €120"
  nextOpeningDate?: string; // ISO 8601
  nextOpeningTime?: string; // "10:00 CET"
}
```

## Key Insights

1. **Simplicity wins** - One badge beats a table of lots
2. **Status > Details** - Where and when tickets open matters more than specific pricing
3. **Trust through clarity** - Honest, straightforward signals
4. **Travel mindset** - Users are browsing destinations, not buying event tickets
5. **Anticipation is valuable** - "Opens soon" is as important as "Buy now"

## Anti-Patterns

❌ **Don't** add "Buy Now" buttons to cards  
❌ **Don't** show lot breakdowns  
❌ **Don't** use countdown timers  
❌ **Don't** add star ratings or reviews  
❌ **Don't** show follower counts  
❌ **Don't** use urgent language ("Last chance!")  
❌ **Don't** add multiple badges per card  
❌ **Don't** cover the entire image with overlays  

## Evolution Path

Current: Simple ticket status badge  
Future possibilities:
- Saved/favorited indicator
- Distance from user location
- Price trend indicators (↑ ↓)
- Verification badge (separate from ticket badge)

Always maintain: **One card = One clear signal**
