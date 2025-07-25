"use client";

import { useState } from "react";
import { CpuIcon, DatabaseIcon, ServerIcon } from "lucide-react";
import ModelOverviewCard from "./components/cards/model-overview-card";
import Timeline from "./components/timeline";
import TimelineSection from "./components/timeline-section";
import SpecificationGrid from "./components/specification-grid";
import MetricCard from "./components/cards/metric-card";
import TechnicalStackSummary from "./components/technical-stack-summary";
import InfoSection from "./components/info-section";
import DetailCard from "./components/cards/detail-card";

export default function DesignPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    architecture: true,
    pretraining: true,
    sft: true,
    deployment: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-background to-muted/20 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8 w-full">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            FischGPT
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A from-scratch GPT-2 style transformer with Flash Attention and supervised fine-tuning
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ModelOverviewCard title="Parameters" value="~124M" />
          <ModelOverviewCard title="Pretrain Tokens" value="45B" />
          <ModelOverviewCard title="SFT Tokens" value="25M" />
          <ModelOverviewCard title="Final Val Loss" value="1.726" />
        </div>
        
        <Timeline />

        <TimelineSection
          stepNumber={1}
          title="Architecture Design"
          description="From-scratch GPT-2 implementation with Flash Attention"
          icon={<CpuIcon className="w-6 h-6" />}
          isExpanded={expandedSections.architecture}
          onToggle={() => toggleSection('architecture')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpecificationGrid
              title="Core Architecture"
              items={[
                { label: "Model Type", value: "GPT-2 Style Decoder" },
                { label: "Parameters", value: "~124M" },
                { label: "Layers", value: "12" },
                { label: "Hidden Size ", value: "768" }
              ]}
            />
            <SpecificationGrid
              title="Attention Mechanism"
              items={[
                { label: "Attention Heads", value: "12" },
                { label: "Head Dimension", value: "64" },
                { label: "Context Length", value: "1024 tokens" },
                { label: "Implementation", value: "Flash Attention" }
              ]}
            />
            <SpecificationGrid
              title="Technical Features"
              items={[
                { label: "Vocabulary Size", value: "50,304" },
                { label: "Tokenizer", value: "GPT-2 BPE" },
                { label: "Activation", value: "GELU (tanh approx)" },
                { label: "Optimizer", value: "AdamW" }
              ]}
            />
          </div>

          <InfoSection title="Implementation Highlights" columns={2}>
            <DetailCard
              title="Custom Components"
              items={[
                "CasualSelfAttention: Multi-head with causal masking",
                "MLP: Feed-forward with GELU activation",
                "Block: Pre-layer normalization",
                "GPT: Complete model with tied embeddings"
              ]}
            />
            <DetailCard
              title="Advanced Features"
              items={[
                "Flash Attention: F.scaled_dot_product_attention",
                "Custom weight initialization",
                "Weight tying: Shared input/output embeddings",
                "Professional separation of concerns"
              ]}
            />
          </InfoSection>
        </TimelineSection>

        <TimelineSection
          stepNumber={2}
          title="Pretraining"
          description="45B tokens from FineWeb with distributed training at ~1.2M tokens/sec for 12 hours"
          icon={<DatabaseIcon className="w-6 h-6" />}
          isExpanded={expandedSections.pretraining}
          onToggle={() => toggleSection('pretraining')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecificationGrid
              title="Dataset: FineWeb"
              items={[
                { label: "Tokens/Epoch", value: "10B", isMono: true },
                { label: "Epochs", value: "4.5" },
                { label: "Steps", value: "80000", isMono: true },
                { label: "Batch Size", value: "524288" }
              ]}
            />
            <SpecificationGrid
              title="Training"
              items={[
                { label: "HellaSwag", value: "33.3%", isMono: true },
                { label: "Val Loss", value: "2.9803", isMono: true },
                { label: "Framework", value: "PyTorch DDP 8x NVDIA A100" },
                { label: "Total Cost", value: "$208.74 ($$$!!!)" }
              ]}
            />
          </div>

          <InfoSection title="Pretraining Configuration" columns={3}>
            <DetailCard
              title="Optimization"
              items={[
                "Max LR: 1.8e-3",
                "Min LR: 1.8e-4",
                "Warmup Steps: 750",
                "Weight Decay: 0.1",
                "Gradient Clipping: 1.0"
              ]}
            />
            <DetailCard
              title="Training Dynamics"
              items={[
                "Micro Batch: 64",
                "Mixed Precision: bfloat16",
              ]}
            />   
          </InfoSection>
        </TimelineSection>

        <TimelineSection
          stepNumber={3}
          title="Supervised Fine-Tuning"
          description="25M tokens from OpenAssistant/oasst1 with distributed training at ~1.2M tokens/sec"
          icon={<CpuIcon className="w-6 h-6" />}
          isExpanded={expandedSections.sft}
          onToggle={() => toggleSection('sft')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecificationGrid
              title="Dataset: OASST1"
              items={[
                { label: "Tokens", value: "25M", isMono: true },
                { label: "Epochs", value: "3" },
                { label: "Steps", value: "20000", isMono: true },
                { label: "Batch Size", value: "16384" }
              ]}
            />
            <SpecificationGrid
              title="Training"
              items={[
                { label: "Format", value: "Conversational" },
                { label: "Val Loss", value: "1.725750", isMono: true },
                { label: "Framework", value: "PyTorch NVDIA A100" },
                { label: "Base Model", value: "Pretraining Checkpoint" }
              ]}
            />
          </div>

          <InfoSection title="SFT Configuration" columns={3}>
            <DetailCard
              title="Optimization"
              items={[
                "Max LR: 8e-6",
                "Min LR: 8e-7",
                "Warmup Steps: 600",
                "Special Tokens: <|user|> <|assistant|>"
              ]}
            />
            <DetailCard
              title="Use Cases"
              items={[
                "Conversational AI",
                "Code completion",
                "Creative writing",
                "Educational content"
              ]}
            />
          </InfoSection>
        </TimelineSection>

        <TimelineSection
          stepNumber={4}
          title="Deployment & Production"
          description="Hugging Face hosting with optimized inference and generation capabilities"
          icon={<ServerIcon className="w-6 h-6" />}
          isExpanded={expandedSections.deployment}
          onToggle={() => toggleSection('deployment')}
          isLast={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecificationGrid
              title="Hugging Face Spaces"
              items={[
                { label: "Repository", value: "kristianfischerai12345/fischgpt-sft" },
                { label: "Format", value: "PyTorch + Safetensors" },
                { label: "System Prompting", value: "Express.js" },
                { label: "Hardware", value: "CPU" }
              ]}
            />
          </div>

          <InfoSection title="Performance Metrics" columns={1}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard value="1024" label="Max Context" />
              <MetricCard value="~124M" label="Parameters" />
              <MetricCard value="1.726" label="Final Loss" />
              <MetricCard value="33.3%" label="HellaSwag" />
            </div>
          </InfoSection>

          <InfoSection title="Usage Examples" columns={2}>
            <DetailCard
              title="Chat Format"
              items={[
                'chat_format("Your question here")',
                'Returns: "<|user|>Your question<|assistant|>"',
                "Optimized for conversational AI",
                "Instruction following capabilities"
              ]}
            />
            <DetailCard
              title="Generation Options"
              items={[
                "Temperature: 0.8 (recommended)",
                "Top-p sampling: Configurable",
                "Max length: Up to 400 tokens",
              ]}
            />
          </InfoSection>
        </TimelineSection>

        <TechnicalStackSummary />
      </div>
    </div>
  );
} 