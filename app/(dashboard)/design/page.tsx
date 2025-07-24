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
            Complete end-to-end development of a custom language model from architecture to deployment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ModelOverviewCard title="Parameters" value="124M" />
          <ModelOverviewCard title="Pretrain Tokens" value="45B" />
          <ModelOverviewCard title="SFT Tokens" value="25M" />
          <ModelOverviewCard title="Training Cost" value="$208.74" />
        </div>
        
        <Timeline />

        <TimelineSection
          stepNumber={1}
          title="Model Architecture"
          description="GPT-2 Small configuration with 124M parameters"
          icon={<CpuIcon className="w-6 h-6" />}
          isExpanded={expandedSections.architecture}
          onToggle={() => toggleSection('architecture')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpecificationGrid
              title="Core Architecture"
              items={[
                { label: "Base Model", value: "GPT-2 Small" },
                { label: "Parameters", value: "124M" },
                { label: "Layers (n_layer)", value: "12" },
                { label: "Embedding Size (n_embd)", value: "768" }
              ]}
            />
            <SpecificationGrid
              title="Attention Mechanism"
              items={[
                { label: "Attention Heads (n_head)", value: "12" },
                { label: "Head Dimension", value: "64" },
                { label: "Context Length (block_size)", value: "1024 tokens" },
                { label: "Position Encoding", value: "Learned Embeddings" }
              ]}
            />
            <SpecificationGrid
              title="Technical Details"
              items={[
                { label: "Vocabulary Size", value: "50,304" },
                { label: "Tokenizer", value: "GPT-2 BPE" },
                { label: "Activation Function", value: "GELU" },
                { label: "Architecture", value: "Decoder-only Transformer" }
              ]}
            />
          </div>
        </TimelineSection>

        <TimelineSection
          stepNumber={2}
          title="Pretraining"
          description="45B tokens from FineWeb dataset with distributed training"
          icon={<DatabaseIcon className="w-6 h-6" />}
          isExpanded={expandedSections.pretraining}
          onToggle={() => toggleSection('pretraining')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecificationGrid
              title="Dataset: FineWeb"
              items={[
                { label: "Total Tokens", value: "45,000,000,000", isMono: true },
                { label: "Source", value: "Hugging Face FineWeb" },
                { label: "Quality", value: "Deduplicated & Filtered" },
                { label: "Language", value: "English" }
              ]}
            />
            <SpecificationGrid
              title="Compute Infrastructure"
              items={[
                { label: "Framework", value: "PyTorch DDP" },
                { label: "Backend", value: "NCCL" },
                { label: "Device Support", value: "CUDA/MPS/CPU" },
                { label: "Precision", value: "Mixed (bfloat16)" },
                { label: "Total Cost", value: "$208.74" }
              ]}
            />
          </div>

          <InfoSection title="Training Configuration" columns={3}>
            <DetailCard
              title="Optimization"
              items={[
                "Optimizer: AdamW",
                "Max LR: 1.8e-3",
                "Min LR: 1.8e-4",
                "Weight Decay: 0.1",
                "Gradient Clipping: 1.0"
              ]}
            />
            <DetailCard
              title="Training Dynamics"
              items={[
                "Micro Batch: 64",
                "Total Batch: 524,288 tokens",
                "Sequence Length: 1024",
                "Mixed Precision: bfloat16",
                "Gradient Accumulation: Auto"
              ]}
            />
            <DetailCard
              title="Scheduling"
              items={[
                "Warmup Steps: 715",
                "Max Steps: 76,292",
                "LR Schedule: Cosine",
                "Eval Frequency: 250 steps",
                "Checkpointing: 5000 steps"
              ]}
            />
          </InfoSection>

          <InfoSection title="Implementation Details" columns={2}>
            <DetailCard
              title="Evaluation & Monitoring"
              items={[
                "Validation: Cross-entropy loss",
                "Benchmark: HellaSwag accuracy",
                "Generation: Top-k sampling (k=50)",
                "Logging: Real-time metrics"
              ]}
            />
            <DetailCard
              title="Advanced Features"
              items={[
                "Tokenizer: tiktoken (GPT-2)",
                "Autocast: Automatic mixed precision",
                "Compile: torch.compile ready",
                "Checkpointing: State preservation"
              ]}
            />
          </InfoSection>
        </TimelineSection>

        <TimelineSection
          stepNumber={3}
          title="Supervised Fine-Tuning"
          description="OASST1 conversational data with generation monitoring"
          icon={<CpuIcon className="w-6 h-6" />}
          isExpanded={expandedSections.sft}
          onToggle={() => toggleSection('sft')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecificationGrid
              title="OASST1 Dataset"
              items={[
                { label: "Dataset", value: "OpenAssistant Conversations" },
                { label: "Format", value: "Conversational pairs" },
                { label: "Special Tokens", value: "<|user|> <|assistant|>" },
                { label: "Languages", value: "Multilingual" },
                { label: "Quality", value: "Human-ranked" }
              ]}
            />
            <SpecificationGrid
              title="SFT Configuration"
              items={[
                { label: "Base Model", value: "Pretrained checkpoint" },
                { label: "Max LR", value: "8e-6", isMono: true },
                { label: "Min LR", value: "8e-7", isMono: true },
                { label: "Micro Batch", value: "16" },
                { label: "Total Batch", value: "16,384 tokens" }
              ]}
            />
          </div>

          <InfoSection title="Training Configuration" columns={3}>
            <DetailCard
              title="Optimization"
              items={[
                "Weight Decay: 0.01",
                "Warmup Steps: 600",
                "Max Steps: 20,000",
                "LR Schedule: Cosine"
              ]}
            />
            <DetailCard
              title="Monitoring"
              items={[
                "Eval Frequency: 1000 steps",
                "Checkpoint: 1500 steps",
                "Generation: Every 1500 steps",
                "Validation Steps: 20"
              ]}
            />
            <DetailCard
              title="Generation"
              items={[
                "Temperature: 0.8",
                "Top-k: 50",
                "Max Length: 200",
                "Test Prompts: 3 variants"
              ]}
            />
          </InfoSection>
        </TimelineSection>
              
        <TimelineSection
          stepNumber={4}
          title="Deployment & Infrastructure"
          description="Production hosting on Hugging Face with real-time inference"
          icon={<ServerIcon className="w-6 h-6" />}
          isExpanded={expandedSections.deployment}
          onToggle={() => toggleSection('deployment')}
          isLast={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecificationGrid
              title="Hugging Face Hub"
              items={[
                { label: "Repository", value: "fischgpt/fischgpt-sft" },
                { label: "Format", value: "PyTorch + Safetensors" },
                { label: "Model Size", value: "2.6 GB" },
                { label: "License", value: "MIT" }
              ]}
            />
            <SpecificationGrid
              title="Inference Infrastructure"
              items={[
                { label: "Backend", value: "Express.js + PyTorch" },
                { label: "GPU", value: "NVIDIA RTX 4090" },
                { label: "Batch Size", value: "1 (Real-time)" },
                { label: "Latency", value: "~50ms" }
              ]}
            />
          </div>

          <InfoSection title="Production Metrics">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard value="47.3" label="Tokens/sec" />
              <MetricCard value="99.7%" label="Uptime" />
              <MetricCard value="2.1GB" label="Memory Usage" />
              <MetricCard value="23ms" label="Avg Latency" />
            </div>
          </InfoSection>
        </TimelineSection>

        <TechnicalStackSummary />
      </div>
    </div>
  );
} 