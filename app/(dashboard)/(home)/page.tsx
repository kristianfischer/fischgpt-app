"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { wake } from "@/lib/services/wake-service";
import ChatContainer from "@/app/components/chat/chat-container";
import ResumeContainer from "@/app/components/resume-container";

export default function Home() {
  const [showResume, setShowResume] = useState(false);
  
  useEffect(() => {
    wake(); // called immediately to wake up the GPU server
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex items-center justify-between p-2 px-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
        <h1 className="text-lg font-semibold">FischGPT</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowResume(!showResume)}
          className="flex items-center gap-2"
        >
          <FileTextIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className={`flex-1 transition-all duration-300 ${showResume ? 'mr-2' : ''}`}>
          <ChatContainer />
        </div>
        <ResumeContainer showResume={showResume} />
      </div>
    </div>
  );
}