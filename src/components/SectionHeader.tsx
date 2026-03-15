interface SectionHeaderProps {
  title: string;
  description?: string;
  isAnchor?: boolean;
}

export function SectionHeader({ title, description, isAnchor = false }: SectionHeaderProps) {
  return (
    <div className="mb-3 md:mb-6 relative">
      <div className="relative inline-block group cursor-default">
        {/* Yellow underline ONLY for anchor section titles */}
        {isAnchor && (
          <div
            className="absolute -left-0.5 -right-0.5 bottom-0 h-[2px] md:h-2 bg-[#FFD600] opacity-30 group-hover:opacity-50 transition-opacity duration-150 ease-out rounded-full"
          />
        )}
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