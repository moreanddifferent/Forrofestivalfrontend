import { X, MapPin, Calendar, Users, ExternalLink, Bell, Bookmark, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Festival } from '../types/festival';
import { Button } from './ui/button';
import { TicketTimeline } from './TicketTimeline';

interface FestivalDetailProps {
  festival: Festival;
  onClose: () => void;
}

export function FestivalDetail({ festival, onClose }: FestivalDetailProps) {
  const getVerificationBadge = () => {
    switch (festival.verificationStatus) {
      case 'confirmed':
        return (
          <div className="inline-flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmed</span>
          </div>
        );
      case 'likely':
        return (
          <div className="inline-flex items-center gap-1.5 text-sm text-yellow-700 dark:text-yellow-400">
            <Clock className="w-4 h-4" />
            <span>Likely</span>
          </div>
        );
      case 'unconfirmed':
        return (
          <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4" />
            <span>Unconfirmed</span>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-medium">{festival.name}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </Button>
            <Button size="sm" className="gap-2">
              <Bell className="w-4 h-4" />
              <span>Follow alerts</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-4xl mx-auto px-6 py-4 md:py-6">
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-muted">
          <img
            src={festival.image}
            alt={festival.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Quick info */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">{festival.location}, {festival.country}</div>
                  <div className="text-sm">{festival.venue}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5 shrink-0" />
                <span className="font-medium text-foreground">{festival.dates}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 shrink-0" />
                <span className="font-medium text-foreground">{festival.attendees}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-medium mb-3">About this festival</h2>
              <p className="text-muted-foreground leading-relaxed">
                {festival.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-lg font-medium mb-3">What to expect</h2>
              <ul className="space-y-2">
                {festival.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tickets section */}
            <div className="border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Tickets</h2>
              </div>
              
              <TicketTimeline passTypes={festival.passTypes} />
            </div>

            {/* Trust signals */}
            <div className="border border-border rounded-xl p-5 space-y-4">
              <h3 className="font-medium">Information</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Followers</span>
                  <span className="font-medium">{festival.followers.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last updated</span>
                  <span className="font-medium">{festival.lastUpdate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  {getVerificationBadge()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}