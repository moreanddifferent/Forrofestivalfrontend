import { Share2, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { FestivalCard } from './FestivalCard';
import { useState } from 'react';

interface FestivalCardData {
  id: string;
  name: string;
  location: string;
  country: string;
  dates: string;
  image: string;
  ticketStatus: 'open_now' | 'opening_soon' | 'not_announced' | 'sold_out';
  currentPrice?: string;
  nextOpeningDate?: string;
  nextOpeningTime?: string;
}

interface WishlistPageProps {
  savedFestivals: FestivalCardData[];
  onFestivalClick: (festivalId: string) => void;
  onShare: () => void;
  isSignedIn: boolean;
}

export function WishlistPage({ 
  savedFestivals, 
  onFestivalClick, 
  onShare,
  isSignedIn 
}: WishlistPageProps) {
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);

  const handleShare = () => {
    onShare();
    setShowShareConfirmation(true);
    setTimeout(() => setShowShareConfirmation(false), 3000);
  };

  // Empty state
  if (savedFestivals.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-3">Saved Festivals</h1>
            <p className="text-lg text-muted-foreground">
              Your personal planning space for festival trips
            </p>
          </div>

          {/* Empty state */}
          <div className="max-w-xl mx-auto text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">No saved festivals yet</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Browse festivals and click the save button to build your personal wishlist. Use it to compare dates, track ticket openings, and plan your trips.
            </p>
            <Button size="lg" onClick={() => window.history.back()}>
              Explore Festivals
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Wishlist with saved festivals
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-3">Saved Festivals</h1>
            <p className="text-lg text-muted-foreground">
              {savedFestivals.length} {savedFestivals.length === 1 ? 'festival' : 'festivals'} saved
            </p>
          </div>

          {/* Share button - only if signed in */}
          {isSignedIn && (
            <div className="relative">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Wishlist</span>
              </Button>

              {/* Share confirmation tooltip */}
              {showShareConfirmation && (
                <div className="absolute top-full right-0 mt-2 px-4 py-2 bg-foreground text-background text-sm rounded-lg shadow-lg whitespace-nowrap">
                  Link copied to clipboard
                </div>
              )}
            </div>
          )}
        </div>

        {/* Saved festivals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedFestivals.map(festival => (
            <FestivalCard
              key={festival.id}
              festival={festival}
              onClick={() => onFestivalClick(festival.id)}
            />
          ))}
        </div>

        {/* Planning tips */}
        <div className="mt-16 pt-12 border-t border-border">
          <h3 className="text-xl font-semibold mb-6">Planning tips</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <p className="font-medium">Compare dates</p>
              <p className="text-muted-foreground leading-relaxed">
                Use the calendar view to see how saved festivals fit into your schedule
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Track ticket openings</p>
              <p className="text-muted-foreground leading-relaxed">
                Set alerts for festivals you're interested in to get notified when tickets become available
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Share with travel companions</p>
              <p className="text-muted-foreground leading-relaxed">
                Send your wishlist link to friends so you can plan trips together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
