"use client";

export default function Paper() {
  const headers = {
    inspiration: "Inspiration",
    inception: "Inception", 
    architecture: "Architecture",
    training: "Training",
    deployment: "Deployment",
    conclusion: "Conclusion"
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      <article className="prose prose-lg max-w-none space-y-12">

        <section className="border border-border rounded-lg p-4 text-center">
          <p>
            <strong>Important:</strong> Please read this reflection so my servers can cold start. This can take some time...
            <br />
            <span>(I dont want to pay for more server time)</span>
          </p>
        </section>
    
        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.inspiration}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Like any great learning experience, I began this project by admitting what I don&apos;t know.
            </p>
            <p> I’ve had a decent grasp of LLMs for a while, though mostly from the sidelines. I’d seen the usual transformer diagrams on YouTube, didn’t blink at the idea of a 5,000-dimensional positional embedding, and could offer a passable explanation of tokenization; though mostly to people who didn’t ask. </p> 
            <p> Earlier this summer, I started thinking more deliberately about how I wanted to engage with this moment in AI. I realized I wasn’t satisfied interpreting the work of others or staying at the surface. I wanted to follow the ideas all the way down; not out of obligation or ambition, but because I simply don’t know how to be interested in something halfway. </p>
            <p className="italic font-medium text-foreground">
              So, I built a GPT-2 model from scratch specialized to answer questions about me.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.inception}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I began this project with some reading, namely <a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf" className="italic" target="_blank">Attention Is All You Need</a>, and <a href="https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf" className="italic" target="_blank">Language Models are Unsupervised Multitask Learners</a>. I also took a quick scroll through the <a href="https://github.com/openai/gpt-2" className="italic" target="_blank">OpenAI repo for GPT-2</a>, written in TensorFlow. 
            </p>
            <p> 
              At last, I was introduced to Andrej Karpathy, one of the founding engineers of OpenAI, and possibly the internet’s most generous explainer of hard things. His video &ldquo;Lets Reproduce GPT-2 (124M)&rdquo; was the northern star of my implementation, and is a true work of art.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.architecture}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I have included a detailed spec of the model architecure on the <a href="/design" className="underline">design</a> page of this website, so I will save the nerd out for those truly curious. However, I&apos;ll include a brief explanation of the set up, its faithulness to the original GPT-2, amongst some other interesting details of its construction.
            </p>
            <p> 
              The model follows the original GPT-2 (124M) spec: 12 transformer blocks, 12 attention heads, 768-dimensional embeddings, and a 1024-token context window. It’s a decoder-only transformer based on Attention Is All You Need, meaning it generates text one token at a time, using each prediction as context for the next. 
            </p> 
            <p> 
              Each block includes layernorm, masked self-attention, and an MLP. Attention is classic scaled dot-product, split across 12 heads, each attending to different parts of the input before being recombined. 
            </p> 
            <p> 
              The final output is projected back into vocabulary space using a weight-tied linear layer. </p> <p> The full implementation is on my GitHub, with clean commits that track my learning along the way. Karpathy’s walkthrough made the architecture feel surprisingly accessible, though PyTorch deserves plenty of credit for that too. 
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.training}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Training consisted of two steps: pretraining and supervised fine tuning (SFT).
            </p>
            <p>
              Pretraining was both a time and wallet suck. Over the course of 12 hours on a Lambda Labs 8x A100 GPU cluster, the model trained over 80,000 steps (~4.5 epochs) on the 10B FineWeb EDU dataset reccomended by Karpathy. I utilized DDP and mixed precision (also thanks to Karpathy) to increase the token throughput across training. Every 250 steps we evaluated across the HellSwag benchmark and printed the val loss of the model. Every 5000 steps, saved the model state dict for future use. The state of my terminal post 50,000 steps made me feel like a true AI engineer. 
            </p>
            <p>
              The results were fascinating; you felt like you could see the model learning. By the end of the first epoch there results were more or less still noise; the val generations were mostly incoherent (this reminded me of when you press the middle word suggestion on your iPhone on repeat to create a message). But over the course of several hours, each generation became more functional. 45B tokens and 200 bucks later, pretraining was finished.
            </p>
            <p>
              With that foundation, I moved on to SFT. I utilized OpenAssitant1 as my dataset due to its conversational formatting. After some research, I utilized an &lt;|user|&gt;...&lt;|assistant|&gt;...&lt;|endoftext|&gt; token formatting through which I could create a ChatGPT like application. So, I concatenated the data set in this fashion, tokenized, and prepared for SFT. This was much quicker (only 25M tokens) compared to pretraining, but felt more powerful. This was the first point in which I felt as if I had done something impressive. For the first time, the model responded clearly and coherently to user prompts. It felt like something I had actually built. 
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.deployment}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The last step in this journey was deploying it in such a way that it could be effectively showcased as a learing experiment. I utilized HuggingFace primarily to do so. The first step was uploading 3 models to HF. These three were my pretrain best loss, my pretrain best hellaswag eval, and my sft conversational model. I then created a HuggingFace Space as an API endpoint, to be able to query my model externally.
            </p>
            <p>
              Then came the full stack engineering. I built the application you are reading this on in Next.js and Shadcn -- your classic FE stack. For the back end I needed a focused, lightweight implementation that served one main purpose: act as a middleman, wrapping each query in a system prompt contextualizing myself to get the model to answer questions about me. I used Express.js for this, and layered in a RAG (Retrieval-Augmented Generation) system using ChromaDB. My resume was split into semantically meaningful chunks (this is code for bullet by bullet) and embedded so that the backend could retrieve relevant context on each query, allowing for accurate, personalized responses.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-border pb-2">{headers.conclusion}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I learned alot throughout this experience, but even as I complete this I am feeling like I need to continue to dive even deeper.
            </p>
            <p>
              Understanding the implementation of some of the most advanced technology in the world at some points literally made me just smile and laugh at my computer, which is an experience I feel I will continue to chase. This was an exciting first step.
            </p>
            <p>
              If you made it all the way to the end, thank you for reading. I hope you enjoyed learning about my learning!
            </p>
          </div>
        </section>

      </article>
    </div>
  );
} 