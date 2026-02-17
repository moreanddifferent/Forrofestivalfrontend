import { ArrowLeft, MapPin, Calendar, Users, CheckCircle2, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { 
  TicketStatusBadge, 
  TicketTimelineBlock, 
  PassTypeTabs,
  TicketActionPanel,
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
    
    // Ticket data
    ticketStatus: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
    currentPrice?: string;
    nextOpeningDate?: string;
    nextOpeningTime?: string;
    ticketUrl?: string;
    
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
}

export function FestivalPage({ festival, onBack, onFollow }: FestivalPageProps) {
  const getTrustLine = () => {
    const status = festival.verificationStatus === 'confirmed' 
      ? 'Verified by organizers' 
      : festival.verificationStatus === 'likely'
      ? 'Likely confirmed'
      : 'Community reported';
    
    return `${status} · Updated ${festival.lastUpdate}`;
  };

  const getActionVariant = (): 'buy' | 'follow' | 'not_announced' | 'sold_out' => {
    switch (festival.ticketStatus) {
      case 'open_now':
        return 'buy';
      case 'opening_soon':
        return 'follow';
      case 'not_announced':
        return 'not_announced';
      case 'sold_out':
        return 'sold_out';
    }
  };

  const passTypeTabs: PassTypeTab[] = festival.passTypes.map(passType => ({
    id: passType.id,
    label: passType.name,
    description: passType.description,
    content: <TicketTimelineBlock lots={passType.lots} />,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      {onBack && (
        <div className="border-b border-border">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="gap-2 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to festivals</span>
            </Button>
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
          <div className="px-6 py-8 space-y-6">
            {/* Title and actions */}
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl font-bold mb-3">{festival.name}</h1>
                
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
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
              
              {/* Ticket status and follow button */}
              <div className="flex items-center gap-3 shrink-0">
                <TicketStatusBadge 
                  variant={festival.ticketStatus}
                  price={festival.currentPrice}
                  opensAt={festival.nextOpeningDate}
                  opensTime={festival.nextOpeningTime}
                />
                
                <Button 
                  variant={festival.isFollowing ? "default" : "outline"}
                  size="default"
                  onClick={onFollow}
                  className="gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>{festival.isFollowing ? 'Following' : 'Follow'}</span>
                </Button>
              </div>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {festival.verificationStatus === 'confirmed' && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900 rounded-md">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified by organizers</span>
                </div>
              )}
              
              <div className="text-muted-foreground">
                Updated {festival.lastUpdate}
              </div>
              
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{festival.followers.toLocaleString()} following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="max-w-3xl space-y-12">
          {/* About section - MORE PROMINENT */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About this festival</h2>
            </div>

            <div className="space-y-6">
              <p className="text-base leading-relaxed">
                {festival.description}
              </p>

              {/* Highlights */}
              {festival.highlights && festival.highlights.length > 0 && (
                <div className="space-y-3 pt-2">
                  {festival.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                      <p className="text-base leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Tickets section - PRIMARY CONTENT */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Tickets</h2>
              <p className="text-muted-foreground">
                Tickets are sold in lots with progressive pricing
              </p>
            </div>

            <div className="border border-border rounded-2xl p-6 bg-muted/20">
              <PassTypeTabs tabs={passTypeTabs} />
              
              {/* Action panel */}
              <div className="mt-8 pt-6 border-t border-border">
                <TicketActionPanel 
                  variant={getActionVariant()}
                  purchaseUrl={festival.ticketUrl}
                  trustLine={getTrustLine()}
                  followers={festival.followers}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}