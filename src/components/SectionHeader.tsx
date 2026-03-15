interface SectionHeaderProps {
  title: string;
  description?: string;
  isAnchor?: boolean;
}

export function SectionHeader({ title, description, isAnchor = false }: SectionHeaderProps) {
  return (
    <div className="mb-3 md:mb-6 relative">
      <div className="relative inline-block group cursor-default">
        {/* Yellow underline for all section titles */}
        <div
          className="absolute -left-1 -right-1 bottom-0.5 h-[3px] md:h-2.5 bg-[#FFD600] opacity-35 rounded-sm"
          style={{ transform: 'rotate(-0.3deg)' }}
        />
        <h2 className={`${isAnchor ? 'text-xl md:text-4xl' : 'text-lg md:text-3xl'} font-black text-foreground relative z-10 tracking-tight`}>
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