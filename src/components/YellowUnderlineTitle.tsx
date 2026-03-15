interface YellowUnderlineTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function YellowUnderlineTitle({ children, className = '', as: Tag = 'h1' }: YellowUnderlineTitleProps) {
  return (
    <div className="relative inline-block">
      <div className="absolute -left-1 -right-1 bottom-0 h-2.5 md:h-3 bg-[#FFD600] opacity-40" />
      <Tag className={`relative z-10 ${className}`}>
        {children}
      </Tag>
    </div>
  );
}
