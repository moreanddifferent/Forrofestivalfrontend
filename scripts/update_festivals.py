#!/usr/bin/env python3
import hashlib
import json
import os
import pathlib

from dotenv import load_dotenv
from google import genai
from google.genai import types

ROOT = pathlib.Path(__file__).parent.parent
load_dotenv(ROOT / ".env")

MODEL = "gemini-2.5-flash-lite"

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise SystemExit("GEMINI_API_KEY not found in .env.local")

client = genai.Client(api_key=api_key)

mock_festivals = json.loads((ROOT / "src" / "data" / "mock_festivals.json").read_text())
schema = json.dumps(mock_festivals[0], indent=2)

prompt = f"""Search the web for real European Forró dance festivals happening in 2026.

Use these sources:
- https://www.oop-trainer.de/tucano/
- https://forro.events/events/
- https://www.forro-festivals.com/
- site:instagram.com "forró festival" 2026
- site:eventbrite.com "forro" 2026 europe
- site:helloasso.com "forro" 2026

For every festival found, return one JSON entry matching this schema exactly:

{schema}

Field rules:
- "id": leave as empty string — will be set automatically
- "url": registration/ticket page, or official site, or Instagram profile URL — null if not found
- "image": a relevant Unsplash photo URL, or empty string
- "ticketStatus": "open" | "opening-soon" | "not-announced" | "sold-out"
- "verificationStatus": "confirmed" (official site found) | "likely" (Instagram/social only) | "unconfirmed"
- "festivalLength": "weekend" (≤3 days) | "short" (4–5 days) | "long" (6+ days)
- "category": "coastal" | "city" | "intimate" | "big-gathering"
- "followers": integer from social media, or null if unknown
- "lastUpdate": "April 2, 2026"
- Unknown tickets → ticketStatus "not-announced", one passType with status "not_announced"

STRICT ACCURACY RULES — these override everything else:
- Do NOT invent, guess, or hallucinate any field values.
- If a venue, date, attendee count, or price cannot be confirmed from a real source, set it to null.
- If a festival cannot be found via search at all, omit it entirely.
- "url" must be a real URL you retrieved — not constructed or guessed.
- "dates", "startDate", "endDate" must come from the actual event page — null if not found.

Only include festivals actually found via search. Return ONLY the raw JSON array, no markdown."""

print("Searching…")
response = client.models.generate_content(
    model=MODEL,
    contents=[prompt],
    config=types.GenerateContentConfig(
        tools=[types.Tool(google_search=types.GoogleSearch())]
    ),
)

text = response.text.strip()
if text.startswith("```"):
    text = text.split("\n", 1)[1].rsplit("```", 1)[0].strip()

try:
    data = json.loads(text)
    for entry in data:
        src = (entry.get("url") or entry.get("name") or str(entry))
        entry["id"] = hashlib.sha1(src.encode()).hexdigest()[:8]
    out = ROOT / "src" / "data" / "festivals.json"
    out.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"✓ Written {len(data)} festivals to {out}")
except json.JSONDecodeError:
    print("⚠ Response was not valid JSON:")
    print(text)

