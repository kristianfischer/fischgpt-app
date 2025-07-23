import { BotIcon, UserIcon } from "lucide-react";
import type { Message } from "@/lib/types/message";
import { useState } from "react";

export default function Message({ message, index }: { message: Message, index: number }) {

    const [isLoading] = useState(false);
    
    return (
        <>
        {isLoading && (
            <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                <BotIcon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted/60 border border-border/50 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>)}

        <div
            key={message.id}
            className={`group flex gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
            } animate-in slide-in-from-bottom-2 duration-300`}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                <BotIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            )}
            
            <div
            className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 transition-all duration-200 ${
                message.role === "user"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-foreground border border-border/50"
            } hover:shadow-md`}
            >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
            </p>
            <span className="text-xs opacity-60 mt-2 block">
                {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                })}
            </span>
            </div>

            {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                <UserIcon className="w-4 h-4 text-secondary-foreground" />
            </div>
            )}
        </div>
        </>
    )
}




