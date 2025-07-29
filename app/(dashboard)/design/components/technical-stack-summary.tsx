interface StackCategory {
  title: string;
  items: string[];
}

export default function TechnicalStackSummary() {
  const stackCategories: StackCategory[] = [
    {
      title: "Machine Learning",
      items: [
        "PyTorch for model training",
        "Distributed Data Parallel (DDP)",
        "Mixed precision training (FP16)",
        "Custom tokenization pipeline",
        "Gradient accumulation & clipping",
        "Learning rate scheduling"
      ]
    },
    {
      title: "Infrastructure",
      items: [
        "Lambda Labs 8x A100 cluster",
        "Hugging Face model hosting",
        "Express.js + ChromaDB RAG API",
        "Vector embeddings pipeline",
        "Git LFS for model storage"
      ]
    },
    {
      title: "RAG & Retrieval",
      items: [
        "ChromaDB vector database",
        "all-MiniLM-L6-v2 embeddings",
        "Semantic document chunking",
        "Cosine similarity search"
      ]
    },
    {
      title: "Frontend",
      items: [
        "Next.js 15 with React 19",
        "TypeScript for type safety",
        "Tailwind CSS v4 styling",
        "shadcn/ui component library",
        "Real-time chat interface",
      ]
    }
  ];

  return (
    <div className="mt-8 p-8 border border-border rounded-lg bg-muted/10">
      <h3 className="text-2xl font-semibold mb-6 text-center">Complete Technical Stack</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {stackCategories.map((category, index) => (
          <div key={index}>
            <h4 className="font-semibold mb-3">{category.title}</h4>
            <ul className="space-y-2 text-muted-foreground">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 