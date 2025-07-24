import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";

export default function ModelPopover() {
    return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 pt-0.5 text-muted-foreground hover:text-foreground"
            >
              <InfoIcon className="w-4 h-4" />
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
    );
}