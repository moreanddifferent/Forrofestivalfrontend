export type TicketEntryStatus = 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
export type FestivalTicketStatus = 'open' | 'opening-soon' | 'not-announced' | 'sold-out';
export type LocationCategory = 'coastal' | 'city' | 'intimate' | 'big-gathering';

export interface TicketEntry {
  id: string;
  lotName: string; // "Early Bird", "Standard Tier", "Solidarity contribution", etc.
  priceAmount?: number; // Single price
  priceRange?: { min: number; max: number }; // For ranges or tiers
  currency: string;
  status: TicketEntryStatus;
  opensAt?: string; // ISO date string
  opensTime?: string; // "12:00 CET"
  purchaseLink?: string;
  quota?: string; // "Limited to 50 spots", "100 remaining"
  tierDescription?: string; // "Includes accommodation", "Workshop only"
  isCatalogEntry?: boolean; // True for HelloAsso-style always-open entries
}

export interface PassType {
  id: string;
  name: string; // "Full Pass", "Party Pass", "Workshop Pass", "Contribution"
  description?: string; // Optional description
  ticketEntries: TicketEntry[];
}

export interface Festival {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  startDate: string; // ISO date for filtering/sorting
  endDate: string; // ISO date
  image: string;
  attendees: string;
  ticketStatus: FestivalTicketStatus;
  passTypes: PassType[]; // Updated from ticketLots
  description: string;
  venue: string;
  followers: number;
  lastUpdate: string;
  verificationStatus: 'confirmed' | 'likely' | 'unconfirmed';
  highlights: string[];
  category: LocationCategory;
  festivalLength: 'weekend' | 'short' | 'long';
}
