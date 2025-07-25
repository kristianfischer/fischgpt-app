"use client"

import Md from "react-markdown";
import "../../app/markdown-style.css";
import remarkGemoji from "remark-gemoji";
import { CodeBlock } from "../../components/ui/code-block";
import { formatMarkdown } from "../../lib/markdown-formatter";

interface CodeProps {
  className?: string; 
  children?: React.ReactNode;
}

export function Markdown({ children }: { children: string }) {
  const markdown = formatMarkdown(children);

  return (
    <div className="markdown">
      <Md
        remarkPlugins={[remarkGemoji]}
        components={{
          code(props: CodeProps) {
            const language = props.className?.replace("language-", "");
            return (
              <CodeBlock
                code={props.children as string}
                language={language || "text"}
              />
            );
          },
        }}
      >
        {markdown}
      </Md>
    </div>
  );
}
