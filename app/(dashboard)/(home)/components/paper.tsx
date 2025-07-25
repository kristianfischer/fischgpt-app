"use client";

export default function Paper() {
  const headers = {
    context: "Context",
    inception: "Inception", 
    architecture: "Architecture",
    training: "Training",
    deployment: "Deployment",
    conclusion: "Conclusion"
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      <article className="prose prose-lg max-w-none space-y-12">
    
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.context}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Like any great learning experience, I began this project by admitting fully to what I did not know.
            </p>
            <p>
              I have always had a working understanding, albiet from a respectful distance, of what an LLM truly was. Like many others, I had seen visualizations of the transformer architecture on youtube, a 5,000 dimension position embedding did not seem unreasonable to me, and I could even explain to my mom what tokenization was (kind of).
            </p>
            <p>
              Earlier this summer I sat back and thought about how I wanted to be positioned in this unique period of innovation. I came to the conclusion that I was not interested in simply generalizing the work of frontier engineers for non technical audiences; I wanted to be able to understand them truly and completely, for no other reason than as a prerequisite to learning and the ability to eventually contribute to the universe myself.
            </p>
            <p className="italic font-medium text-foreground">
              So, I built a GPT-2 model from scratch specialized to answer questions about me.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.inception}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I began this project with some reading, namely Attention is All You need, and Language Models are Unsupervised Multitask Learners. I also took a quick scroll through the OpenAI repo for GPT-2, written in TensorFlow. Finally, I was introduced to Andrej Karpathy, one of the founding engineers of OpenAI, and all his online material detailing the inner mechanics of the GPT architecture. His video &ldquo;Lets Reproduce GPT-2 (124M)&rdquo; was the northern star of my implementation.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.architecture}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The architecture of GPT-2 is a decoder only version of the transformer implementation laid out in Attention is all you need. Simply put, this allows every predicted token to be used as additional context for the next token (this is called auto-regression). The trick is simple: it learns to guess the next token, again and again, until you get a paragraph.
            </p>
            <p>
              I implemented the 124M parameter version of GPT-2. That means 12 transformer blocks, 12 attention heads, and an embedding size of 768 (dimensions). The model takes in up to 1024 tokens at a time as its context window, and every one of those tokens gets embedded with both a token vector and a position vector, before being fed into the stack.
            </p>
            <p>
              Each transformer block consists of a layernorm, masked self-attention, another layernorm, and an MLP. The attention mechanism is classic scaled dot-product, but split into 12 parallel heads. Each head sees a different projection of the same input and gets to attend to different parts of the context. These are all recombined and passed through another linear layer before heading to the MLP, which expands the dimensionality 4x before squeezing it back down to 768 with a GELU nonlinearity.
            </p>
            <p>
              At the very end of the stack, there&apos;s a final layernorm and then a linear projection back to vocabulary space. That projection is actually tied to the input embedding matrix, known as weight tying.
            </p>
            <p>
              A few critical numbers, for reference:
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
              <pre className="font-mono text-sm text-foreground">
{`n_layer = 12        # number of transformer blocks
n_head = 12         # number of attention heads
n_embd = 768        # embedding dimension
block_size = 1024   # maximum context length
vocab_size = 50257  # from the GPT-2 tokenizer`}
              </pre>
            </div>
            <p>
              This is an architecture I am continuing to learn about and master, although Karpathy&apos;s implementation struck me as surprisingly simple (of course recognizing the power of PyTorch under the hood). All the code also is available to read through on my git, which contains a clean commit history to see my learning as I developed.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.training}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Training consisted of two steps: pretraining and supervised fine tuning (sft).
            </p>
            <p>
              Pretraining was both a time and wallet suck. Over the course of 12 hours on a Lambda Labs 8x A100 GPU cluster, the model trained over 80,000 steps (~4.5 epochs) on the 10B FineWeb EDU dataset reccomended by Karpathy. I utilized DDP and mixed precision (also thanks to Karpathy) to increase the token throughput across training. Every 250 steps we evaluated across the HellSwag benchmark and printed the val loss of the model. Every 5000 steps, saved the model state dict for future use.
            </p>
            <p>
              The results were fascinating: You could truly see the model learning. By the end of the first epoch there results were more or less still noise; the val generations were mostly incoherent (this reminded me of when you press the middle word suggestion on your iPhone on repeat to create a message). But, over the course of several hours, each generation became more functional. 45B tokens and 200 bucks later, pretraining was finished. And so was Karpathy&apos;s demonstration.
            </p>
            <p>
              So, step 2, now with a strong foundation, was SFT. I utilized OpenAssitant1 as my dataset due to its conversational formatting. After some research, I utilized an &lt;|user|&gt;...&lt;|assistant|&gt;...&lt;|endoftext|&gt; formatting through which I could create a ChatGPT like application. So, I concatenated the data set in this fashion, tokenized, and prepared for SFT. This was much quicker (only 25M tokens) compared to pretraining, but was even more fascinating. I again logged val loss and generations across 20,000 steps. But this was the first point in which I felt as if I had done something impressive. The responses to the user querys were quite strong. The training phase is done.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.deployment}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The last step in this journey was deploying it in such a way that it could be showcased as a learing experiment. I utilized HuggingFace primarily to do so. The first step was uploading 3 models to HF. These three were my pretrain best loss, my pretrain best hellaswag eval, and my sft conversational model. I then created a hugging face space as an API endpoint, to be able to query my model externally.
            </p>
            <p>
              Then came the full stack engineeering. I built the application you are reading this on in NextJS, Shadcn; your classic FE stack. For the back end I needed a quick, pretty narrow implementation which served one main purpose: act as an API middle man, wrapping each query in a system prompt contextualizing myself in order to get the model to answer questions about me. I utilized ExpressJS for this. During the time of my writing, the system prompting needs to be improved. I am thinking of a baby RAG implemenation, as my current system prompt is taking up too much of the context window currently.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.conclusion}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I learned alot throughout this experience, but even as I complete this I am feeling like I need to continue to dive even deeper. Understanding the implementation of some of the most advanced technology in the world at some points literally made me just smile and laugh at my computer, which is an experience I feel I will continue to chase. I am excited to continue to learn. Thank you if you decided to read all of this haha!
            </p>
          </div>
        </section>

      </article>
    </div>
  );
} 