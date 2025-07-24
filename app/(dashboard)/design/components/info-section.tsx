import { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  columns?: 1 | 2 | 3;
}

export default function InfoSection({ title, children, columns = 1 }: InfoSectionProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2", 
    3: "grid-cols-1 md:grid-cols-3"
  }[columns];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className={`grid ${gridClass} gap-4 text-sm`}>
        {children}
      </div>
    </div>
  );
} 