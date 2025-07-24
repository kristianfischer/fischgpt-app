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
    <div className="flex h-full relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowResume(!showResume)}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm"
      >
        <FileTextIcon className="w-4 h-4" />
      </Button>

      <div className={`flex-1 transition-all duration-300 ${showResume ? 'mr-2' : ''}`}>
        <ChatContainer />
      </div>

      <ResumeContainer showResume={showResume} />
    </div>
  );
}