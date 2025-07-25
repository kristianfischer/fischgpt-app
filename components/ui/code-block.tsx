import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border border-b-0">
        <span className="text-xs text-muted-foreground font-mono">
          {language || 'text'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <CheckIcon className="h-3 w-3 text-green-500" />
          ) : (
            <CopyIcon className="h-3 w-3" />
          )}
        </Button>
      </div>
      <pre className="bg-muted border rounded-b-lg rounded-t-none p-4 overflow-x-auto">
        <code className="text-sm font-mono whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
} 