"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, GlobeIcon, BotIcon, InfoIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Header() {
    return (
        <div className="flex items-center justify-between p-2 px-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">FischGPT</h1>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-3 w-3 pt-0.5 text-muted-foreground hover:text-foreground"
              >
                <InfoIcon className="w-3 h-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm">FischGPT Model</h3>
                  <p className="text-xs text-muted-foreground">AI Assistant powered by custom SFT model</p>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span>FischGPT-SFT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span>0.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Length:</span>
                    <span>400 tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Top P:</span>
                    <span>0.9</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Custom trained model optimized for conversational AI tasks with supervised fine-tuning.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href="https://huggingface.co/kristianfischerai12345/fischgpt-sft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BotIcon className="w-4 h-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href="https://github.com/kristianfischer/fischgpt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href="https://kristian-fischer.com/fischgpt.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobeIcon className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>

    );
}