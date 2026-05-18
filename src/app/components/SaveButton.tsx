import { Bookmark } from 'lucide-react';
import { Button } from './ui/button';

interface SaveButtonProps {
  isSaved: boolean;
  onSave: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'overlay';
}

export function SaveButton({ isSaved, onSave, size = 'md', variant = 'default' }: SaveButtonProps) {
  if (variant === 'overlay') {
    // Floating overlay button for cards
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSave();
        }}
        className={`
          absolute top-3 right-3 z-10
          w-9 h-9 rounded-full
          flex items-center justify-center
          transition-all
          ${isSaved 
            ? 'bg-background text-primary shadow-sm' 
            : 'bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-background'
          }
        `}
        aria-label={isSaved ? 'Remove from saved' : 'Save festival'}
      >
        <Bookmark 
          className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} 
        />
      </button>
    );
  }

  // Standard button variant
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 gap-2',
    lg: 'h-11 px-5 gap-2',
  };

  return (
    <Button
      variant={isSaved ? 'default' : 'outline'}
      className={sizeClasses[size]}
      onClick={(e) => {
        e.stopPropagation();
        onSave();
      }}
    >
      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </Button>
  );
}
