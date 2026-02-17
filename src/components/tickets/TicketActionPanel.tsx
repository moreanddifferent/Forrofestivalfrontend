import { ExternalLink, Bell, Shield } from 'lucide-react';
import { Button } from '../ui/button';

type ActionPanelVariant = 'buy' | 'follow' | 'not_announced' | 'sold_out';

interface TicketActionPanelProps {
  variant: ActionPanelVariant;
  purchaseUrl?: string;
  trustLine?: string; // "Verified by organizers · Last updated 2 days ago"
  followers?: number; // Number of people following
}

export function TicketActionPanel({ 
  variant, 
  purchaseUrl,
  trustLine,
  followers 
}: TicketActionPanelProps) {
  const formatFollowers = (count?: number) => {
    if (!count) return null;
    if (count < 1000) return `${count} following`;
    return `${(count / 1000).toFixed(1)}k following`;
  };

  return (
    <div className="space-y-4">
      {/* Primary action */}
      {variant === 'buy' && purchaseUrl && (
        <Button size="lg" className="w-full gap-2" asChild>
          <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
            <span>Buy tickets now</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      )}

      {variant === 'follow' && (
        <Button size="lg" variant="outline" className="w-full gap-2">
          <Bell className="w-4 h-4" />
          <span>Follow next opening</span>
        </Button>
      )}

      {variant === 'not_announced' && (
        <Button size="lg" variant="outline" className="w-full gap-2">
          <Bell className="w-4 h-4" />
          <span>Get notified</span>
        </Button>
      )}

      {variant === 'sold_out' && (
        <div className="text-center py-3 text-muted-foreground text-sm">
          All tickets are sold out
        </div>
      )}

      {/* Trust line and social proof */}
      {(trustLine || followers) && (
        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground border-t border-border pt-4">
          {trustLine && (
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>{trustLine}</span>
            </div>
          )}
          
          {followers && (
            <div className="flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" />
              <span>{formatFollowers(followers)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
