# Calendar View

A dual-mode calendar system for tracking ticket openings and festival dates. Designed for planning-first discovery with travel-grade aesthetics.

## Philosophy

The Calendar View solves a critical problem: **When should I act?**

Unlike traditional event calendars, this system prioritizes **ticket intelligence** over festival dates:
- Ticket openings are more important than festival dates
- Urgency is communicated through visual prominence, not aggressive CTAs
- Planning is calm and breathable, not stressful

## Two Event Types

### 1. Ticket Opening Events (Primary)
**What they represent:** A specific moment when tickets become available for purchase.

```typescript
{
  type: 'ticket_opening',
  data: {
    festivalId: '1',
    festivalName: 'Forró do Sol',
    location: 'Cascais',
    country: 'Portugal',
    opensAt: '2026-03-15', // ISO 8601
    opensTime: '10:00 CET',
    price: 'From €120',
    lotName: 'Early Bird', // Optional
  }
}
```

**Visual treatment:**
- ✅ **More prominent** than festival dates
- ✅ Pulsing dot indicator
- ✅ Highlighted background (primary/5)
- ✅ Shows specific time
- ✅ Alert button available

### 2. Festival Date Events (Secondary)
**What they represent:** The actual days when the festival takes place.

```typescript
{
  type: 'festival',
  data: {
    festivalId: '1',
    festivalName: 'Forró do Sol',
    location: 'Cascais',
    country: 'Portugal',
    startDate: '2026-06-20', // ISO 8601
    endDate: '2026-06-23', // ISO 8601
    image: 'https://...',
  }
}
```

**Visual treatment:**
- ✅ **Less prominent** than ticket openings
- ✅ Soft background (muted)
- ✅ No urgency indicators
- ✅ Date range format

## Two Viewing Modes

### Month View (Visual Planning)

**Purpose:** Get a bird's-eye view of upcoming activity.

**Design principles:**
- Calendar grid (Monday-Sunday)
- Festival dates shown as soft horizontal bars
- Ticket openings shown as prominent dots/badges
- Minimal density—breathable, not cluttered
- Today's date highlighted subtly

**Visual hierarchy:**
```
┌─────────────────────────────┐
│ Mon  Tue  Wed  Thu  Fri ... │
├─────────────────────────────┤
│  1    2    3    4    5  ... │
│                             │
│  📍 10:00 CET               │  ← Ticket opening (pulsing dot)
│  Forró do Sol               │
│                             │
│  [Forró in Alps]            │  ← Festival dates (soft bar)
│                             │
└─────────────────────────────┘
```

**Interaction:**
- Click any event → Open Festival Page
- Navigate months with arrow buttons
- Today is highlighted with primary tint

**What's NOT shown:**
- ❌ Multiple events stacked densely
- ❌ Event descriptions in cells
- ❌ Buy buttons
- ❌ Countdown timers

### List View (Action-Oriented)

**Purpose:** Chronological feed optimized for taking action.

**Design principles:**
- Events grouped by month
- Ticket openings appear **first** (sorted by type, then date)
- Each event is a card with full context
- Alert buttons for upcoming ticket openings
- View buttons link to Festival Page

**Visual hierarchy:**
```
March 2026
┌──────────────────────────────────────┐
│ 📍 TICKET OPENING                    │  ← Primary (highlighted)
│    Forró do Sol                      │
│    Mar 15 · 10:00 CET · From €120   │
│    [Alert] [View]                    │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 📅 FESTIVAL DATES                    │  ← Secondary (muted)
│    Forró in the Alps                 │
│    Mar 20 – Mar 23                   │
│    [View]                            │
└──────────────────────────────────────┘
```

**Event cards:**
- **Ticket openings:** 
  - Pulsing dot icon
  - Primary-tinted background (if upcoming)
  - Shows date, time, price, lot name
  - Alert + View buttons
- **Festival dates:**
  - Calendar icon
  - Muted background
  - Shows date range
  - View button only

**Sorting logic:**
1. Type: Ticket openings before festival dates
2. Date: Chronological within each type

## Key Design Features

### 1. Visual Prominence Hierarchy

**Ticket Openings > Festival Dates**

| Feature | Ticket Opening | Festival Date |
|---------|---------------|---------------|
| Background | `primary/10` (highlighted) | `muted` (subtle) |
| Icon | Pulsing dot | Static calendar |
| Border | `primary/30` | `border` |
| Actions | Alert + View | View only |
| Typography | Bold, prominent | Standard |

### 2. Calm, Breathable Layout

✅ **Generous spacing** - No cramped grids  
✅ **Minimal density** - Only essential info shown  
✅ **Soft colors** - Muted backgrounds, no aggressive highlights  
✅ **Subtle animations** - Gentle pulse, no timers  
✅ **Clean typography** - Readable hierarchy  

### 3. Planning-First Mindset

The calendar answers these questions:
- ⏰ **When do tickets open?** (Primary signal)
- 📅 **When is the festival?** (Context)
- 🎫 **What's the price?** (Decision factor)
- 🔔 **Can I get an alert?** (Proactive planning)

### 4. No Spreadsheet Aesthetics

❌ **Avoid:**
- Dense grids with tiny text
- Admin panel vibes
- Multiple font weights
- Aggressive borders
- Cluttered cells

✅ **Instead:**
- Breathing room
- Travel-booking aesthetics
- Clear hierarchy
- Soft borders
- Focused content

## Usage Example

```tsx
import { CalendarView } from './components/calendar';

function CalendarPage() {
  const events = [
    {
      type: 'ticket_opening',
      data: {
        festivalId: '1',
        festivalName: 'Forró do Sol',
        location: 'Cascais',
        country: 'Portugal',
        opensAt: '2026-03-15',
        opensTime: '10:00 CET',
        price: 'From €120',
        lotName: 'Early Bird',
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
        image: 'https://...',
      },
    },
  ];

  return (
    <CalendarView
      events={events}
      onEventClick={(festivalId) => navigate(`/festival/${festivalId}`)}
      onSetAlert={(festivalId) => subscribeToAlerts(festivalId)}
    />
  );
}
```

## Mode Switching

**Toggle between Month and List views:**
- Switch button in header
- State persists during session
- Both modes show same events
- Different visual treatments optimized for use case

```tsx
const [mode, setMode] = useState<'month' | 'list'>('month');

// User can toggle freely
<Button onClick={() => setMode('month')}>Month</Button>
<Button onClick={() => setMode('list')}>List</Button>
```

## Integration with Filters

The Calendar View is **filter-aware**:
- Country filters apply
- Date range filters apply
- Ticket status filters apply
- Results update in real-time

Example:
```
Filter: Country = "Portugal" 
Result: Only shows ticket openings and festivals in Portugal

Filter: Month = "June 2026"
Result: Only shows events in June 2026
```

## Interaction Patterns

### Month View
1. **Navigate months:** Arrow buttons change month
2. **Click event:** Opens Festival Page
3. **Visual scan:** Quickly see when tickets open

### List View
1. **Scroll chronologically:** Events ordered by date
2. **Set alert:** Click bell icon on ticket opening
3. **View festival:** Click View button
4. **Filter context:** See month groupings

## Trust Signals

### Past Events
- Muted styling (no pulse)
- "Past" or no alert button
- Still visible for context

### Upcoming Events
- Highlighted styling
- Pulsing indicator
- Alert button available
- Clear date/time

### Today
- Subtle background tint in Month View
- Bold date number
- Primary color accent

## Responsive Design

### Desktop (lg+)
- Month View: Full calendar grid (7 columns)
- List View: Wide cards with side-by-side layout
- Comfortable spacing

### Tablet (md)
- Month View: Full calendar, smaller cells
- List View: Cards stack content vertically
- Readable at all sizes

### Mobile
- Month View: Scroll horizontally if needed
- List View: Full-width cards
- Touch-friendly targets

## Data Flow

```
Backend Data → Calendar Events Array → CalendarView Component

CalendarView
├─ Mode: Month | List
├─ MonthView (if mode = month)
│  ├─ Render calendar grid
│  ├─ Show ticket openings (prominent)
│  └─ Show festival dates (subtle)
└─ ListView (if mode = list)
   ├─ Sort events (tickets first)
   ├─ Group by month
   ├─ Render cards (tickets highlighted)
   └─ Show alert buttons
```

## Key Insights

### 1. Urgency Without Pressure
Ticket openings are urgent, but we communicate this through:
- ✅ Visual prominence (not timers)
- ✅ Clear dates (not "Hurry!")
- ✅ Pulsing dots (not flashing warnings)

### 2. Context Matters
Festival dates provide context for ticket openings:
- "Tickets open Mar 15 for festival Jun 20-23"
- Both events shown, different prominence
- User can plan full journey

### 3. Two Use Cases = Two Modes
- **Month View:** "What's coming up?"
- **List View:** "What should I do?"

Each mode optimized for its use case.

### 4. Travel-Grade Means Trustworthy
- No dark patterns
- No artificial urgency
- Clear, honest information
- Calm, professional design

## Anti-Patterns

❌ **Don't** use countdown timers  
❌ **Don't** show "Only X tickets left!"  
❌ **Don't** use red/urgent colors everywhere  
❌ **Don't** make every event look equally important  
❌ **Don't** clutter cells with too much info  
❌ **Don't** use spreadsheet/admin aesthetics  
❌ **Don't** hide ticket openings below festivals  

## Evolution Path

Current: Two event types, two viewing modes

Future possibilities:
- Filter by ticket status
- Price range indicators
- "Following" festivals highlighted
- Multi-month view
- Export to personal calendar
- Timezone conversion

Always maintain: **Calm, planning-first, ticket-intelligent**

## Reference Implementation

**O Fole Roncou Example:**

Calendar shows:
1. **Mar 1, 12:00 CET** - Ticket opening (2nd Lot, €120)
2. **Apr 20, 10:00 CET** - Ticket opening (3rd Lot, €145)
3. **May 15, 10:00 CET** - Ticket opening (4th Lot, €165)
4. **Jun 20-23** - Festival dates (secondary)

**Visual treatment:**
- Ticket openings = Prominent, pulsing, highlighted
- Festival dates = Soft bar, muted, contextual

User can:
- See all ticket openings at a glance
- Set alerts for upcoming lots
- Plan travel around festival dates
- Compare multiple festivals' timelines
