export default function Timeline() {
    return (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-8 max-w-4xl w-full">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div className="text-sm text-muted-foreground mt-2">Architecture</div>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div className="text-sm text-muted-foreground mt-2">Pretraining</div>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div className="text-sm text-muted-foreground mt-2">Fine-tuning</div>
            </div>
            <div className="flex-1 h-px bg-border"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div className="text-sm text-muted-foreground mt-2">Deployment</div>
            </div>
          </div>
        </div>
    );
}