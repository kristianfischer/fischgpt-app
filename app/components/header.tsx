"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon, GlobeIcon, BotIcon, PaletteIcon } from "lucide-react";
import Link from "next/link";
import ModelPopover from "./model-popover";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-2 px-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-2">
        <Link href="/">
          <h1 className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors">FischGPT</h1>
        </Link>
        
        <ModelPopover />
      </div>
      
      <div className="flex items-center gap-2">
        {/* Social Links Group */}
        <div className="flex items-center gap-2">
          {/* Hugging Face Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href="https://huggingface.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BotIcon className="w-4 h-4" />
            </a>
          </Button>

          {/* GitHub Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </Button>

          {/* Personal Website Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href="https://kristian-fischer.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobeIcon className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-2"></div>

        {/* Page Navigation Group */}
        <div className="flex items-center gap-2">
          {/* Design Page Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <Link href="/design">
              <PaletteIcon className="w-4 h-4" />
            </Link>
          </Button>

          {/* About Page Button
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <Link href="/about">
              <UserIcon className="w-4 h-4" />
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}