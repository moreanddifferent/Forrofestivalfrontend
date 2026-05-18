import { ExternalLink, Bell, Shield } from 'lucide-react';
import { Button } from '../ui/button';

type ActionPanelVariant = 'buy' | 'follow' | 'not_announced' | 'sold_out';

interface TicketActionPanelProps {
  variant: ActionPanelVariant;
  purchaseUrl?: string;
  trustLine?: string;
  followers?: number;
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
        <Button size="lg" className="w-full gap-2 bg-[#0E7C66] hover:bg-[#0A6353]" asChild>
          <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
            <span>Buy tickets</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      )}

      {variant === 'follow' && (
        <Button size="lg" variant="outline" className="w-full gap-2 border-[#0E7C66] text-[#0E7C66] hover:bg-[#0E7C66] hover:text-white">
          <Bell className="w-4 h-4" />
          <span>Follow ticket alerts</span>
        </Button>
      )}

      {variant === 'not_announced' && (
        <Button size="lg" variant="outline" className="w-full gap-2 border-[#0E7C66] text-[#0E7C66] hover:bg-[#0E7C66] hover:text-white">
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
