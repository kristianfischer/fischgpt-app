"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import Paper from "./components/paper";

export default function Home() {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-6xl mx-auto px-6 pt-10">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  FischGPT
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto pt-3">
                  The first ever <i>Kristian Fischer</i> finetuned LLM. Uncover his quirks, past lives, and the mindset behind the project.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <Button size="lg" className="px-8">
                    Try FischGPT
                    <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/design">
                  <Button variant="outline" size="lg" className="px-8">
                    View Technical Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border">
          <Paper />
        </div>

          <section className="space-y-6 mt-10">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold">The Result</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-3">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">$208.74</div>
                  <div className="text-sm text-muted-foreground">Total Training Cost</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">~124M</div>
                  <div className="text-sm text-muted-foreground">Parameters</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Learning</div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center space-y-8 py-16">
            <h2 className="text-3xl font-bold">Experience FischGPT</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try the model. Explore the architecture. See what happens when you combine 
              deep technical understanding with obsessive attention to engineering detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="px-8">
                  Start Chatting
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/design">
                <Button variant="outline" size="lg" className="px-8">
                  Technical Deep Dive
                </Button>
              </Link>
            </div>
          </section>
        </div>

      </div>
  );
}
