Design the full “Saved” section end-to-end (desktop + mobile) as a travel-planning hub that supports:
- saving festivals,
- ticket-opening awareness,
- sharing a read-only list with friends,
- comparing within a list and comparing a friend’s list with “My Saved”.

Keep the existing design system:
- premium calm
- electric blue for primary actions
- electric yellow only for small highlights (never large fills)
No social network features (no feed, no public profiles, no comments, no likes).

────────────────────────────────────────────────────────
A) NAV + ENTRY POINTS
1) Saved icon shows count as a small badge on the icon (not “Saved 0” text).
2) Users can save festivals from anywhere:
- festival cards (bookmark icon)
- festival page (Save button)
Saved state is clearly visible (filled bookmark).

────────────────────────────────────────────────────────
B) “MY SAVED” MAIN PAGE (DEFAULT)
B1) Header
- Title: “Saved”
- Subtext: “{X} festivals saved”
- Right actions:
  • Share (read-only link) (primary secondary action)
  • Filters (mobile only, opens bottom sheet)

B2) Tabs (simple)
- All
- Ticket openings
Ticket openings tab shows only saved festivals with a known upcoming ticket opening datetime.

B3) Sort + Filters
Desktop:
- Sort dropdown:
  • Next ticket opening (default)
  • Festival date
  • Recently saved
- Filter chips:
  • Month
  • Country
  • Setting (Sea / Countryside / Urban / Mountain)
  • Ticket status (Open / Opens soon / Sold out / Tickets not announced)
Mobile:
- Replace chips with a single “Filters” button → opens bottom sheet with the same filters.

B4) “Season snapshot” strip (subtle, optional but recommended)
A small strip above the list showing:
- Next opening: {date}
- Next festival: {date}
- Countries: {count}
Keep it minimal and calm.

B5) Saved list (compact cards)
Use compact cards optimized for scanning, not big posters.
Each card shows:
- Festival name
- City/Country
- Festival dates
- Ticket status chip (consistent global system)
- If Opens soon: show “Opens {Mon DD} • {time}” (or time only if CET is already defined)
Actions on card:
- Bell toggle (ticket alerts)
- Remove (unsave)
- View (open festival)
No external Website/Tickets/Instagram links in this list (keep premium and uncluttered).

B6) Compare within Saved (explicit selection)
- Each saved card has a small “Compare” checkbox/toggle.
- Selected state is unmistakable (blue check badge + subtle outline).
- Sticky compare behavior:
  • 0 selected: no bar
  • 1 selected: helper chip “1 selected — select one more to compare”
  • 2+ selected: sticky bar “Compare (2)” enabled + “Clear”
- Sticky bar never overlaps bottom nav on mobile.

B7) Empty state (improve)
If 0 saved:
- Title: “No saved festivals yet”
- Text: “Save festivals to track ticket openings and compare options.”
- Primary CTA: “Browse festivals”
- Secondary CTA: “View calendar”

────────────────────────────────────────────────────────
C) SHARE FLOW (READ-ONLY LINK) — MVP
C1) Share modal / bottom sheet
When user clicks Share:
- Title: “Share your list”
- Description: “Create a read-only link to plan with friends.”
- Button: “Create link”
After creation:
- Show link field + Copy button
- Secondary actions:
  • “Revoke link”
  • “Regenerate link” (optional)

C2) Shared list page (view-only)
Create a screen: “{Name}’s saved festivals”
- Badge: “View-only”
- Short line: “Track ticket openings • Compare options”
- Actions:
  • Compare with my Saved (primary)
  • Copy to my Saved (secondary)
- Same tabs as My Saved (All / Ticket openings)
- Same sort + filters
- Cards are compact and similar, but:
  • no remove action (view-only)
  • allow viewer to “Save” festivals to their own list
  • allow viewer to set alerts for themselves (prompts sign-in if needed)
No external link rows; keep it clean.

────────────────────────────────────────────────────────
D) “COMPARE WITH MY SAVED” (LIST-TO-LIST COMPARISON) — LIGHTWEIGHT
When viewing a friend’s shared list, “Compare with my Saved” opens a comparison view (drawer or page).

D1) Top summary strip
- In common: {count}
- Only in theirs: {count}
- Only in mine: {count}
- Next openings (across both): show next 3 upcoming openings (compact)

D2) Sections (three)
1) In common
- Festivals in both lists
- Show compact cards
- Highlight upcoming openings subtly (yellow micro-marker)

2) Only in their list
- Show compact cards
- Primary action: “Save to my list”

3) Only in my list
- Show compact cards
- Optional action: “Share with them” (creates suggestion text / optional)

Keep it minimal. No complex merging UI.

────────────────────────────────────────────────────────
E) COMPARE FESTIVALS (2–3 FESTIVALS) — REUSE EXISTING MODAL
From:
- My Saved
- Shared list
- List-to-list sections
Users can select 2–3 festivals and open the existing Compare modal.

Compare modal should show:
- Dates + duration
- City/Country
- Setting
- Size (if available)
- Ticket status + next opening
- Price from (if available)
- Links: Website / Tickets / Instagram (icons with labels/tooltips)
Allow remove festival from compare.

────────────────────────────────────────────────────────
F) MOBILE-SPECIFIC RULES (CRITICAL)
- Filters collapse into a bottom sheet.
- Sticky compare bars never overlap primary CTAs or bottom nav.
- Cards are compact; avoid giant images on mobile.
- Use consistent image aspect ratio (4:3 or 3:2) only when you show images; compact mode can be text-first.

────────────────────────────────────────────────────────
G) COPY / POSITIONING (NO SOCIAL NETWORK)
Use copy that frames this as planning:
- “Share a read-only list to plan with friends.”
- “No feed. No spam.”
Avoid:
- “Follow”, “Friends feed”, “Community posts”.

DELIVERABLES
Create/Update these screens:
1) Saved (My Saved) — empty + populated
2) Share modal / bottom sheet
3) Shared list (view-only)
4) Compare with my Saved (list-to-list view)
5) Compare festivals modal (reuse, ensure consistent links labeling)