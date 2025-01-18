interface SectionHeaderProps {
    title: string
    subtitle?: string
  }
  
  export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4 text-primary">{title}</h2>
        {subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )
  }
  
  