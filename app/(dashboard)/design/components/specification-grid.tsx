interface SpecificationItem {
  label: string;
  value: string;
  isMono?: boolean;
}

interface SpecificationGridProps {
  title: string;
  items: SpecificationItem[];
}

export default function SpecificationGrid({ title, items }: SpecificationGridProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between p-3 bg-muted/40 rounded-lg">
            <span className="text-muted-foreground">{item.label}:</span>
            <span className={`${item.isMono ? 'font-mono' : ''} ${item.label.includes('Cost') || item.label.includes('Parameters') ? 'font-bold' : ''}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 