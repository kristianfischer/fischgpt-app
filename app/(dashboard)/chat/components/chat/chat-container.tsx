import { BotIcon } from "lucide-react";
import Message from "./message";
import UserInput from "./user-input";
import { Message as MessageType } from "@/lib/types/message";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { chat } from "@/lib/services/chat-service";

export default function ChatContainer() {

    const [messages, setMessages] = useState<MessageType[]>([
        {
          id: "1",
          content: `Welcome to FischGPT!

I'm a custom AI assistant powered by FischGPT-SFT - a supervised fine-tuned model I've developed and deployed. This isn't just another ChatGPT clone - it's a showcase of my full-stack AI engineering capabilities.

What I've built here:

> Custom GPT-2/3 Model: FischGPT-SFT with optimized parameters for conversational tasks

> Modern Chat Interface: Built with Next.js 15, React 19, and Tailwind CSS v4

> Express Backend: Node.js API server handling model inference and system prompting

> Clean Architecture: Scalable component structure using shadcn/ui design system

Feel free to ask me anything about AI, software development, or my projects. You can also explore my work through the social links in the header or check out my resume!

How can I help you today?`,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
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
    
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);
    
        setResetTrigger(prev => prev + 1);
    
        try {
          const response = await chat(input);
          
          const aiMessage: MessageType = {
            id: (Date.now() + 1).toString(),
            content: response.response,
            role: "assistant",
            timestamp: new Date(),
          };
    
          setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
          console.error('Chat error:', err);
          setError('Failed to send message. Please try again.');
          
          const errorMessage: MessageType = {
            id: (Date.now() + 1).toString(),
            content: "Sorry, I encountered an error. Please try again.",
            role: "assistant",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
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