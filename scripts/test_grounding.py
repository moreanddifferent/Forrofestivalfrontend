#!/usr/bin/env python3
"""Test whether Google Search grounding is actually being used."""
import os, pathlib
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv(pathlib.Path(__file__).parent.parent / ".env.local")
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

response = client.models.generate_content(
    model="gemini-2.5-flash-lite",
    contents=["What is the top news story right now, today April 2 2026? Be specific with headlines and sources."],
    config=types.GenerateContentConfig(
        tools=[types.Tool(google_search=types.GoogleSearch())]
    ),
)

print("=== RESPONSE ===")
print(response.text[:600])
print()
print("=== GROUNDING METADATA ===")
meta = response.candidates[0].grounding_metadata if response.candidates else None
if meta:
    queries = getattr(meta, "web_search_queries", None)
    chunks = getattr(meta, "grounding_chunks", None)
    print("Search queries fired:", queries)
    if chunks:
        print(f"Grounding sources ({len(chunks)} total):")
        for c in chunks[:5]:
            web = getattr(c, "web", None)
            print(" -", getattr(web, "uri", None), "|", getattr(web, "title", None))
    else:
        print("No grounding chunks — search was NOT actually used")
else:
    print("No grounding metadata — search was NOT used")
