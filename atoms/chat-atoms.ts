import { atom } from "jotai";
import { Message } from "@/lib/types/message";

// Initial welcome message
const initialMessage: Message = {
  id: "1",
  content: `Welcome to FischGPT!

I'm a custom AI assistant powered by FischGPT-SFT - a supervised fine-tuned model I've developed and deployed. This isn't just another ChatGPT clone - it's a showcase of my full-stack AI engineering capabilities.

What I've built here:

> Custom GPT-2/3 Model: FischGPT-SFT with optimized parameters for conversational tasks

> Modern Chat Interface: Built with Next.js, Shadcn, and Tailwind CSS

> Express Backend: Node.js API server handling model inference and system prompting, ChromaDB for "about me" RAG

Feel free to ask me anything about AI, software development, or my projects. You can also explore my work through the social links in the header or check out my resume!

How can I help you today?`,
  role: "assistant",
  timestamp: new Date(),
};

export const messagesAtom = atom<Message[]>([initialMessage]);

export const isLoadingAtom = atom<boolean>(false);

export const errorAtom = atom<string | null>(null);

export const addMessageAtom = atom(
  null,
  (get, set, message: Message) => {
    const currentMessages = get(messagesAtom);
    set(messagesAtom, [...currentMessages, message]);
  }
);

export const clearMessagesAtom = atom(
  null,
  (get, set) => {
    set(messagesAtom, [initialMessage]);
  }
); 