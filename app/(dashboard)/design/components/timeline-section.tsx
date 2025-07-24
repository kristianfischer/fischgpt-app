import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { ReactNode } from "react";

interface TimelineSectionProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  isLast?: boolean;
}

export default function TimelineSection({
  stepNumber,
  title,
  description,
  icon,
  isExpanded,
  onToggle,
  children,
  isLast = false
}: TimelineSectionProps) {
  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-6 top-0 w-px h-full hidden md:block"></div>
      )}
      {isLast && (
        <div className="absolute left-6 top-0 w-px h-8 bg-border hidden md:block"></div>
      )}
      
      <div className="border border-border rounded-lg bg-background/50 relative">
        <div className="absolute -left-3 top-8 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm hidden md:flex">
          {stepNumber}
        </div>
        
        <button
          onClick={onToggle}
          className="w-full p-6 flex items-center justify-between hover:bg-muted/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            {icon}
            <div className="text-left">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
        </button>
      
        {isExpanded && (
          <div className="px-6 pb-6 space-y-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
} 