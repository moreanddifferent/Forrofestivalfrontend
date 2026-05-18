import { X, Globe, ExternalLink, Instagram, MapPin, Calendar, Users, Ticket } from 'lucide-react';
import { Button } from './ui/button';

interface CompareFestival {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  image: string;
  locationType?: string;
  attendees?: string;
  ticketStatus: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  currentPrice?: string;
  nextOpeningDate?: string;
  nextOpeningTime?: string;
  ticketUrl?: string;
}

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  festivals: CompareFestival[];
  onRemove: (festivalId: string) => void;
  onFestivalClick: (festivalId: string) => void;
}

const LOCATION_TYPE_LABELS: Record<string, string> = {
  sea: 'Sea',
  countryside: 'Countryside',
  urban: 'Urban',
  mountain: 'Mountain',
};

const TICKET_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  open_now: { label: 'Open now', color: 'bg-[#0E7C66] text-white' },
  opening_soon: { label: 'Opens soon', color: 'bg-[#2F5BFF] text-white' },
  not_announced: { label: 'Not announced', color: 'bg-muted text-muted-foreground' },
  sold_out: { label: 'Sold out', color: 'bg-gray-200 text-foreground' },
};

function getDuration(dates: string): string {
  const match = dates.match(/(\w+)\s+(\d+)-(\d+)/);
  if (match) {
    const days = parseInt(match[3]) - parseInt(match[2]) + 1;
    return `${days} days`;
  }
  return '—';
}

export function CompareDrawer({ isOpen, onClose, festivals, onRemove, onFestivalClick }: CompareDrawerProps) {
  if (!isOpen || festivals.length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col md:inset-x-auto md:inset-y-4 md:right-4 md:w-[680px] md:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-lg font-bold">Compare festivals ({festivals.length})</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Festival columns */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${festivals.length}, 1fr)` }}>
            {/* Headers: image + name */}
            {festivals.map(f => (
              <div key={`header-${f.id}`} className="text-center">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-2">
                  <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => onRemove(f.id)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
                <button
                  onClick={() => { onFestivalClick(f.id); onClose(); }}
                  className="font-bold text-sm hover:text-[#2F5BFF] transition-colors line-clamp-2 leading-tight"
                >
                  {f.name}
                </button>
              </div>
            ))}
          </div>

          {/* Comparison rows */}
          <div className="mt-5 space-y-0 divide-y divide-border">
            {/* Dates + Duration */}
            <CompareRow
              label="Dates"
              icon={<Calendar className="w-3.5 h-3.5" />}
              values={festivals.map(f => (
                <div key={f.id}>
                  <span className="text-sm">{f.dates}</span>
                  <span className="block text-[11px] text-muted-foreground">{getDuration(f.dates)}</span>
                </div>
              ))}
            />

            {/* City / Country */}
            <CompareRow
              label="Location"
              icon={<MapPin className="w-3.5 h-3.5" />}
              values={festivals.map(f => (
                <span key={f.id} className="text-sm">{f.location}, {f.country}</span>
              ))}
            />

            {/* Location type */}
            <CompareRow
              label="Setting"
              values={festivals.map(f => (
                <span key={f.id} className="text-sm">
                  {f.locationType ? LOCATION_TYPE_LABELS[f.locationType] || '—' : '—'}
                </span>
              ))}
            />

            {/* Size */}
            <CompareRow
              label="Size"
              icon={<Users className="w-3.5 h-3.5" />}
              values={festivals.map(f => (
                <span key={f.id} className="text-sm">{f.attendees || '—'}</span>
              ))}
            />

            {/* Ticket status + next opening */}
            <CompareRow
              label="Tickets"
              icon={<Ticket className="w-3.5 h-3.5" />}
              values={festivals.map(f => {
                const status = TICKET_STATUS_LABELS[f.ticketStatus];
                return (
                  <div key={f.id}>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${status.color}`}>
                      {status.label}
                    </span>
                    {f.ticketStatus === 'opening_soon' && f.nextOpeningDate && (
                      <span className="block text-[11px] text-muted-foreground mt-1">
                        {new Date(f.nextOpeningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {f.nextOpeningTime ? ` · ${f.nextOpeningTime}` : ''}
                      </span>
                    )}
                    {f.currentPrice && (
                      <span className="block text-xs font-medium mt-0.5">{f.currentPrice}</span>
                    )}
                  </div>
                );
              })}
            />

            {/* Official links */}
            <CompareRow
              label="Links"
              values={festivals.map(f => (
                <div key={f.id} className="flex items-center gap-2.5">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link text-muted-foreground hover:text-[#2F5BFF] transition-colors"
                    title="Website"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={f.ticketUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link text-muted-foreground hover:text-[#2F5BFF] transition-colors"
                    title="Tickets"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link text-muted-foreground hover:text-[#2F5BFF] transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface CompareRowProps {
  label: string;
  icon?: React.ReactNode;
  values: React.ReactNode[];
}

function CompareRow({ label, icon, values }: CompareRowProps) {
  return (
    <div className="py-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
        {values}
      </div>
    </div>
  );
}