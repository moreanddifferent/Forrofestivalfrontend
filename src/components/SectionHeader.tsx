import { useEffect, useRef, useState } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div ref={headerRef} className="mb-3 md:mb-6 relative">
      <div className="relative inline-block">
        {/* Animated yellow highlight bar - thicker on mobile */}
        <div
          className={`absolute -left-2 -right-2 top-1/2 -translate-y-1/2 h-4 md:h-3 bg-[#F5FF00] transition-all duration-250 ease-out ${
            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{ transformOrigin: 'left' }}
        />
        <h2 className="text-xl md:text-3xl font-black text-foreground relative z-10 tracking-tight">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
          {description}
        </p>
      )}
    </div>
  );
}