interface ModelOverviewCardProps {
  title: string;
  value: string;
}

export default function ModelOverviewCard({ title, value }: ModelOverviewCardProps) {
  return (
    <div className="p-4 bg-background/60 border border-border rounded-lg text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
}