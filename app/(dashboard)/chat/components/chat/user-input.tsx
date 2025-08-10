import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { useState } from "react";

export default function UserInput({ inputRef, onSend, isLoading }: { inputRef: React.RefObject<HTMLInputElement>, onSend: () => void, isLoading: boolean }) {

    const [input, setInput] = useState("");

    
      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSend();
        }
      };


    return (
        <div className="border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message FischGPT..."
              disabled={isLoading}
              className="pr-12 py-3 text-sm rounded-xl border-primary/20 bg-background/50 placeholder:text-muted-foreground/60"
            />
            <Button
              variant="ghost"
              onClick={() => {
                setInput("");
                onSend();
              }}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-transparent disabled:text-muted-foreground/40 disabled:bg-transparent disabled:opacity-60"
            >
              <SendIcon className="w-4 h-4" />
            </Button>
          </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
            Built from scratch with limited resources – if it gets basic facts about me wrong, just smile and nod. The first request may hit a cold start and fail, so a quick retry might be needed.
            </p>
        </div>
      </div>
    )
}



