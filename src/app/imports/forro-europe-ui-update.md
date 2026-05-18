Refine the current “FORRÓ EUROPE — Festival Guide” UI with a focused Round 2 update.
Do NOT redesign from scratch. Keep what works (hero search bar, tickets opening soon cards, editorial tone).
Implement ONLY these 5 improvements: (1) status consistency, (2) simplify ticket block + move links, (3) strengthen category curation, (4) align map styling with brand colors, (5) add compare on search results.

────────────────────────────────────────────────────────
1) STANDARDIZE TICKET STATUS CHIPS (GLOBAL CONSISTENCY)
Unify status labels and visual style across:
- Homepage festival cards
- “Tickets opening soon” mini-cards
- Calendar list items
- Festival page ticket summary

Use the same 4 statuses everywhere:
- Open → “Open • From €X” (if price known; otherwise “Open”)
- Opens soon → “Opens {Mon DD}” (or “Opens {date}”)
- Sold out → “Sold out”
- Not announced → “Tickets not announced”

Visual rules:
- Chips are compact and consistent in size and padding.
- Use electric yellow only as a subtle accent (e.g., small dot or thin underline) for “Opens soon” or date chips.
- Avoid multiple chip styles (no different shapes on different pages).

────────────────────────────────────────────────────────
2) FESTIVAL PAGE — SIMPLIFY THE TICKETS AREA + MOVE OFFICIAL LINKS OUT
The current ticket block still feels too heavy and redundant.

Replace the ticket section with a compact “Ticket summary” card:
- Top: status chip (Open / Opens soon / Sold out / Tickets not announced)
- Middle: next opening line only if known (single line)
- Primary CTA is contextual (single dominant action):
  • Open → “Buy tickets”
  • Opens soon → “Set alert”
  • Sold out → “Alert if spots open” (PRIMARY)
  • Tickets not announced → “Follow updates”
- Secondary action: “View ticket timeline” (only if timeline exists; collapsed by default)
- Trust line (small): “Last verified … • Source: Official site / Ticket platform / Instagram”
- Reduce padding/height so the card is efficient (not a big empty hero block).

IMPORTANT: Move “Website / Tickets / Instagram” OUT of the ticket card.
Place them as a separate “Official links” row under the festival header (near location/dates),
or as a small block directly below the ticket summary card.
Keep them subtle (small icons + labels). No Instagram embeds.

Sold out behavior:
- “Buy tickets” must NOT appear as a large primary button when sold out.
- If kept, it should be a small secondary link under “Official links”.

────────────────────────────────────────────────────────
3) HOMEPAGE EDITORIAL CATEGORIES — SHOW REAL CURATION (NOT SINGLE FEATURE CARDS)
Right now categories feel like one featured card. Make them feel curated and comparable.

For each editorial category section (Intimate gatherings / Immersive weeks / Coastal / City / Mountain):
- Display 3–5 festivals (not 1).
- Use either:
  • a horizontal carousel row (preferred for editorial feel), OR
  • a calm 2-column grid on desktop.
- Keep cards slightly smaller so multiple options are visible at once.
- Keep the yellow underline/marker on anchor titles (Intimate + Immersive) only.

Also tighten vertical spacing between:
- “Tickets opening soon” and the first category section
so the page feels like one continuous narrative.

────────────────────────────────────────────────────────
4) MAP — ALIGN WITH BRAND COLORS (REMOVE RANDOM MULTI-COLOR LOOK)
Current map uses multiple bright colors (blue/green/orange/purple) which breaks the brand system.

Update the map to feel like a premium atlas:
- Use neutral pins by default (grey).
- Encode location type with subtle differentiation:
  • small icon inside pin OR
  • outline style/shape variations OR
  • very muted tints (not saturated).
- Use electric blue only for:
  • selected pin outline
  • active state / hover
- Use electric yellow only for:
  • small highlight on selected/featured marker (optional, minimal)

Keep legend calm and minimal (no loud colors).

────────────────────────────────────────────────────────
5) SEARCH RESULTS — ADD LIGHTWEIGHT “COMPARE” (ADDRESSES SURVEY)
Add comparison ONLY in the Search/Results view (not on homepage).

- Add a small “Compare” checkbox/toggle on each result card.
- When 2–3 festivals are selected, show a sticky bottom bar:
  “Compare (2)” button.
- Clicking opens a comparison drawer/page with 2–3 columns max.

Comparison rows (keep minimal):
- Dates + duration
- City/Country
- Location type
- Size (if available)
- Ticket status + next opening
- Price from (if available)
- Official links: Website / Tickets / Instagram (small)

Allow “Remove” to drop a festival from comparison.

────────────────────────────────────────────────────────
GENERAL RULES
- Keep the travel search bar as the homepage primary entry point.
- Do not add new complex features beyond the 5 items above.
- Maintain premium calm, with electric blue as primary action and electric yellow as a sharp accent.
- Reduce redundancy and visual noise; prioritize clarity and comparability.