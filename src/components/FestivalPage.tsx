import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, CheckCircle2, Bell, ExternalLink, ChevronDown, Shield, Globe, Instagram, BarChart3, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { UnifiedTicketChip } from './UnifiedTicketChip';
import { 
  TicketTimelineBlock, 
  PassTypeTabs,
  PassTypeTab 
} from './tickets';

interface FestivalPageProps {
  festival: {
    id: string;
    name: string;
    location: string;
    country: string;
    dates: string;
    image: string;
    attendees: string;
    venue: string;
    description: string;
    highlights: string[];
    verificationStatus: 'confirmed' | 'likely' | 'unconfirmed';
    lastUpdate: string;
    followers: number;
    isFollowing?: boolean;
    
    ticketStatus: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
    currentPrice?: string;
    nextOpeningDate?: string;
    nextOpeningTime?: string;
    ticketUrl?: string;

    coordinates?: { lat: number; lng: number };
    
    passTypes: Array<{
      id: string;
      name: string;
      description?: string;
      lots: Array<{
        id: string;
        lotName: string;
        price: string;
        opensAt?: string;
        opensTime?: string;
        state: 'past' | 'current' | 'upcoming' | 'unknown';
        tierDescription?: string;
        quota?: string;
      }>;
    }>;
  };
  onBack?: () => void;
  onFollow?: () => void;
  isInCompare?: boolean;
  onToggleCompare?: (festivalId: string) => void;
}

export function FestivalPage({ festival, onBack, onFollow, isInCompare, onToggleCompare }: FestivalPageProps) {
  const [showTimeline, setShowTimeline] = useState(false);
  const [showOfficialLinks, setShowOfficialLinks] = useState(false);

  const hasLotData = festival.passTypes.some(pt => pt.lots.length > 1);

  const passTypeTabs: PassTypeTab[] = festival.passTypes.map(passType => ({
    id: passType.id,
    label: passType.name,
    description: passType.description,
    content: <TicketTimelineBlock lots={passType.lots} />,
  }));

  const sourceLabel = festival.verificationStatus === 'confirmed'
    ? 'Official site'
    : festival.verificationStatus === 'likely'
    ? 'Ticket platform'
    : 'Community reported';

  // Contextual primary CTA
  const getPrimaryCTA = () => {
    switch (festival.ticketStatus) {
      case 'open_now':
        return {
          label: 'Buy tickets',
          icon: <ExternalLink className="w-4 h-4" />,
          isLink: true,
          href: festival.ticketUrl || '#',
        };
      case 'opening_soon':
        return {
          label: 'Set alert',
          icon: <Bell className="w-4 h-4" />,
          isLink: false,
          onClick: onFollow,
        };
      case 'sold_out':
        return {
          label: 'Alert if spots open',
          icon: <Bell className="w-4 h-4" />,
          isLink: false,
          onClick: onFollow,
        };
      case 'not_announced':
        return {
          label: 'Follow updates',
          icon: <Bell className="w-4 h-4" />,
          isLink: false,
          onClick: onFollow,
        };
    }
  };

  const primaryCTA = getPrimaryCTA();

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      {onBack && (
        <div className="border-b border-border">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="gap-2 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            {/* Compare toggle */}
            {onToggleCompare && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleCompare(festival.id)}
                className={`gap-2 transition-colors ${
                  isInCompare
                    ? 'bg-[#2F5BFF] text-white border-[#2F5BFF] hover:bg-[#1A44E0]'
                    : 'text-muted-foreground hover:border-[#2F5BFF] hover:text-[#2F5BFF]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{isInCompare ? 'In compare' : 'Compare'}</span>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto">
          {/* Hero image */}
          <div className="aspect-[21/9] overflow-hidden bg-muted">
            <img 
              src={festival.image} 
              alt={festival.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hero content */}
          <div className="px-4 md:px-6 py-5 md:py-8 space-y-3 md:space-y-4">
            {/* Title with yellow underline */}
            <div className="flex-1 min-w-0">
              <div className="mb-2 md:mb-3">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                  {festival.name}
                </h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{festival.location}, {festival.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{festival.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{festival.attendees}</span>
                </div>
              </div>
            </div>

            {/* Official links — small row under metadata */}
            <div className="hidden md:flex items-center gap-4 pt-1">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2F5BFF] transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </a>
              <a
                href={festival.ticketUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2F5BFF] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Tickets</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2F5BFF] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Mobile: collapsed links menu */}
            <div className="md:hidden">
              <button
                onClick={() => setShowOfficialLinks(!showOfficialLinks)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2F5BFF] transition-colors"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
                <span>Official links</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showOfficialLinks ? 'rotate-180' : ''}`} />
              </button>
              {showOfficialLinks && (
                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-border/50">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2F5BFF] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Website</span>
                  </a>
                  <a
                    href={festival.ticketUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2F5BFF] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Tickets</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#2F5BFF] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>IG</span>
                  </a>
                </div>
              )}
            </div>
            
            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm">
              {festival.verificationStatus === 'confirmed' && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0E7C66]/10 text-[#0E7C66] border border-[#0E7C66]/20 rounded-md">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-medium">Verified by organizers</span>
                </div>
              )}
              
              <div className="text-muted-foreground text-xs">
                Updated {festival.lastUpdate}
              </div>
              
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Users className="w-3.5 h-3.5" />
                <span>{festival.followers.toLocaleString()} following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="max-w-3xl space-y-6 md:space-y-10">
          
          {/* COMPACT TICKET SUMMARY CARD */}
          <section>
            <div className="mb-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                Tickets
              </h2>
            </div>

            <div className="border border-border rounded-xl p-3.5 md:p-4 bg-card">
              {/* Row 1: Unified status chip + price + primary CTA */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <UnifiedTicketChip
                    status={festival.ticketStatus}
                    currentPrice={festival.currentPrice}
                    nextOpeningDate={festival.nextOpeningDate}
                    size="md"
                  />
                </div>

                {/* Primary CTA — contextual */}
                {primaryCTA.isLink ? (
                  <Button size="sm" className="gap-2 bg-[#2F5BFF] hover:bg-[#1A44E0] text-white font-bold" asChild>
                    <a href={primaryCTA.href} target="_blank" rel="noopener noreferrer">
                      {primaryCTA.icon}
                      <span>{primaryCTA.label}</span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="gap-2 bg-[#2F5BFF] hover:bg-[#1A44E0] text-white font-bold"
                    onClick={primaryCTA.onClick}
                  >
                    {primaryCTA.icon}
                    <span>{primaryCTA.label}</span>
                  </Button>
                )}
              </div>

              {/* Row 2: Next opening datetime (only if known, compact) */}
              {festival.ticketStatus === 'opening_soon' && festival.nextOpeningDate && (
                <p className="text-xs text-muted-foreground mt-2.5">
                  <span className="font-bold text-[#2F5BFF]">Opens: </span>
                  {new Date(festival.nextOpeningDate).toLocaleDateString('en-US', { 
                    weekday: 'short', month: 'short', day: 'numeric'
                  })}
                  {festival.nextOpeningTime && ` at ${festival.nextOpeningTime}`}
                </p>
              )}

              {/* Sold out microcopy */}
              {festival.ticketStatus === 'sold_out' && (
                <p className="text-[11px] text-muted-foreground mt-2 italic">
                  Sometimes additional passes are released later.
                </p>
              )}

              {/* Row 3: Trust line + expand */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Verified {festival.lastUpdate}</span>
                  <span className="text-border">·</span>
                  <span>{sourceLabel}</span>
                </div>

                {/* Expand ticket timeline */}
                {hasLotData && (
                  <button
                    onClick={() => setShowTimeline(!showTimeline)}
                    className="flex items-center gap-1 text-[11px] font-medium text-[#2F5BFF] hover:underline"
                  >
                    <span>{showTimeline ? 'Hide' : 'View'} ticket details</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showTimeline ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {/* Expanded ticket timeline */}
              {showTimeline && hasLotData && (
                <div className="mt-3 pt-3 border-t border-border">
                  <PassTypeTabs tabs={passTypeTabs} />
                </div>
              )}
            </div>
          </section>

          {/* About section */}
          <section className="space-y-4 md:space-y-6">
            <h2 className="text-lg md:text-xl font-bold text-foreground">
              About this festival
            </h2>

            <div className="space-y-4 md:space-y-6">
              <p className="text-base leading-relaxed">
                {festival.description}
              </p>

              {festival.highlights && festival.highlights.length > 0 && (
                <div className="space-y-3 pt-2">
                  {festival.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0E7C66] mt-2.5 shrink-0" />
                      <p className="text-base leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Location map section */}
          {festival.coordinates && (
            <section className="space-y-4 md:space-y-6">
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                Location
              </h2>

              <div className="space-y-3">
                {/* Venue & address info */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#2F5BFF] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold">{festival.venue}</p>
                    <p className="text-sm text-muted-foreground">{festival.location}, {festival.country}</p>
                  </div>
                </div>

                {/* OpenStreetMap embed */}
                <div className="rounded-xl overflow-hidden border border-border bg-muted">
                  <iframe
                    title={`Map of ${festival.venue}`}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${festival.coordinates.lng - 0.03}%2C${festival.coordinates.lat - 0.015}%2C${festival.coordinates.lng + 0.03}%2C${festival.coordinates.lat + 0.015}&layer=mapnik&marker=${festival.coordinates.lat}%2C${festival.coordinates.lng}`}
                    className="w-full h-[240px] md:h-[320px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Open in maps link */}
                <a
                  href={`https://www.openstreetmap.org/?mlat=${festival.coordinates.lat}&mlon=${festival.coordinates.lng}#map=15/${festival.coordinates.lat}/${festival.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#2F5BFF] hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open in maps</span>
                </a>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}