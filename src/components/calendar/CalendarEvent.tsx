export interface FestivalEvent {
  festivalId: string;
  festivalName: string;
  location: string;
  country: string;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  image: string;
}

export interface TicketOpeningEvent {
  festivalId: string;
  festivalName: string;
  location: string;
  country: string;
  opensAt: string; // ISO 8601
  opensTime: string; // "10:00 CET"
  price?: string; // "From €120"
  lotName?: string; // "Early Bird", "2nd Lot"
}

export type CalendarEvent = 
  | { type: 'festival'; data: FestivalEvent }
  | { type: 'ticket_opening'; data: TicketOpeningEvent };
