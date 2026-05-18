interface SectionHeaderProps {
  title: string;
  description?: string;
  isAnchor?: boolean;
}

export function SectionHeader({ title, description, isAnchor = false }: SectionHeaderProps) {
  return (
    <div className="mb-3 md:mb-6 relative">
      <h2 className={`${isAnchor ? 'text-[26px] md:text-[44px]' : 'text-[22px] md:text-[36px]'} text-foreground tracking-tight leading-[1.05]`}>
        <span className="forro-script">
          <span className="organic-underline">{title}</span>
        </span>
      </h2>
      {description && (
        <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2 micro-note">
          {description}
        </p>
      )}
    </div>
  );
}