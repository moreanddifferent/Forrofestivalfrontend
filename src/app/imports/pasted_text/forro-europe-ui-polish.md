Polish the current Saved festivals page and Add to calendar modal for Forró Europe. This is not a redesign. Treat it as a final UI refinement pass before MVP handoff.

Scope

Work only on:

Saved festivals page
Add to calendar modal

Do not change the overall structure, flows, or content model.

1. General intent

Make the experience feel more:

product-ready
calm
premium
intentional

The UI should stay minimal and airy, but less rough. Improve:

spacing consistency
grouping
alignment
hierarchy
button rhythm
copy clarity

Keep the existing visual language:

electric blue primary accent
soft yellow underline accent
soft mint status tags
warm light neutrals
2. Saved festivals page
Keep the existing structure

Keep:

title: My Summer 2026
saved count
secondary line about upcoming ticket openings
action row on the right:
List / Map
Add to calendar
Share
current card grid and card content

Do not add new features.

Refine the top copy

Replace:

“2 ticket openings coming up”

With:

2 saved festivals have ticket openings coming up

This line should read as useful planning info, not marketing copy.

Style:

muted secondary text
same alignment as saved count
slightly more breathing room between title, count, and planning line
Refine the action row

Keep the same controls, but make the grouping clearer.

Desired grouping:

view controls = List / Map
actions = Add to calendar / Share

Adjustments:

increase spacing between the two groups
keep all controls on one clean horizontal line
preserve compact size
keep Add to calendar as the primary button in electric blue
keep Share as secondary / ghost
Refine the cards

Do not redesign cards.
Do not add more information.

Only polish:

internal spacing
alignment of title, metadata, and status pill
consistency of card padding
selected state blue outline
visual balance between image and text block

Keep existing status labels:

Opens Mar 20
Tickets available
Tickets not announced
Sold out

The page must stay clearly different from the homepage:
this is a personal shortlist / planning page, not a browse page.

3. Add to calendar modal
Keep the modal architecture

Keep:

title
intro line
include section with two checkboxes
small summary box
export section
footer note

No extra settings.
No advanced options.
No new export complexity.

Title

Keep:

Add saved festivals to calendar

Make sure the title is the strongest element in the modal.

Intro summary banner

Current message:

“All 3 saved festivals will be exported”

Keep the content, but reduce its visual dominance.
It should feel like a small confirmation banner, not a second heading.

Refine by:

reducing padding
softening background contrast
making it more compact
Explanatory paragraph

Use:

Export your saved festivals as calendar events to plan the season and keep track of ticket openings.

Make this line clean and readable, with comfortable line length.

Include section

Keep the two options:

Festival dates
Ticket opening reminders

Use this helper copy:

For Festival dates

Add one calendar event for each saved festival.

For Ticket opening reminders

Add reminder events for festivals with confirmed ticket opening dates.

Make label + helper copy alignment very clean.

Summary block

Keep:

Festivals selected — 3
Ticket opening reminders available — 2

Style:

compact
neutral
very scannable
low noise
Export buttons

Keep:

Open in Google Calendar as primary
Download .ics as secondary

Requirements:

full-width buttons
strong vertical rhythm
clear separation
slightly more premium spacing
Google Calendar button stays electric blue
.ics button stays outlined / secondary
Footer note

Keep:

Ticket opening reminders are only added for festivals with confirmed opening dates.

Style:

muted
smaller
visually separated with a thin divider
low emphasis
4. Visual quality rules

Apply a final polish pass across both screens:

normalize spacing increments
align text baselines
remove any accidental visual heaviness
improve edge-to-edge balance
tighten interaction states
make components feel consistent with one another

The whole result should feel:

simpler
sharper
more usable
more mature
still light and friendly
5. Constraints

Do not:

redesign the page
change layout logic
add compare features
add group planning logic
add more filters
add extra calendar settings
add technical complexity

This is an MVP polish pass only.

6. Target outcome

Final result should communicate:

“this is my saved shortlist”
“I can quickly review it”
“I can export it to my calendar in one step”
“the interface feels finished and trustworthy”