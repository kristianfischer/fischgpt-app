import Message from "./message";
import UserInput from "./user-input";
import { Message as MessageType } from "@/lib/types/message";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { messagesAtom, isLoadingAtom, errorAtom, addMessageAtom } from "@/atoms/chat-atoms";
import { chat } from "@/lib/services/chat-service";

export default function ChatContainer() {
      const [messages] = useAtom(messagesAtom);
      const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
      const [error, setError] = useAtom(errorAtom);
      const [, addMessage] = useAtom(addMessageAtom);
      const [resetTrigger, setResetTrigger] = useState(0);
      const messagesEndRef = useRef<HTMLDivElement>(null);
      const inputRef = useRef<HTMLInputElement>(null!);
    
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
    
      const handleSend = async () => {
        const input = inputRef.current?.value?.trim();
        if (!input || isLoading) return;
    
        const userMessage: MessageType = {
          id: Date.now().toString(),
          content: input,
          role: "user",
          timestamp: new Date(),
        };
    
        addMessage(userMessage);
        setIsLoading(true);
        setError(null);
    
        setResetTrigger(resetTrigger + 1);
    
        try {
          const response = await chat(input);
          
          const aiMessage: MessageType = {
            id: (Date.now() + 1).toString(),
            content: response.response,
            role: "assistant",
            timestamp: new Date(),
          };
    
          addMessage(aiMessage);
        } catch (err) {
          console.error('Chat error:', err);
          setError('Failed to send message. Please try again.');
          
          const errorMessage: MessageType = {
            id: (Date.now() + 1).toString(),
            content: "Sorry, I encountered an error. Please try again.",
            role: "assistant",
            timestamp: new Date(),
          };
          addMessage(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

        return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
                
                {isLoading && (
                    <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-muted/60 border border-border/50 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                    </div>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center">
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 text-destructive text-sm">
                        {error}
                    </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="flex-shrink-0">
                <UserInput 
                    key={resetTrigger}
                    inputRef={inputRef} 
                    onSend={handleSend} 
                    isLoading={isLoading}
                />
            </div>
        </div>
        );
        }