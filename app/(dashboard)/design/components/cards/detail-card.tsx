interface DetailCardProps {
  title: string;
  items: string[];
}

export default function DetailCard({ title, items }: DetailCardProps) {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="space-y-1 text-muted-foreground">
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
} 