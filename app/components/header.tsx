"use client";

import { Button } from "@/components/ui/button";
import { GlobeIcon, PaletteIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import ModelPopover from "./model-popover";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-2 px-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-2">
        <Link href="/chat">
          <h1 className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors">FischGPT</h1>
        </Link>
        
        <ModelPopover />
      </div>
      
      <div className="flex items-center gap-2">
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
              <Image src="/hf-logo.svg" alt="Hugging Face" width={15} height={20} className="w-5 h-5" />
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
              <SiGithub className="w-4 h-4" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <a
              href="https://kristian-fischer.com/fischgpt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlobeIcon className="w-4 h-4" />
            </a>
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2"></div>

        <div className="flex items-center gap-2">
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

          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex items-center gap-2"
          >
            <Link href="/">
              <UserIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}