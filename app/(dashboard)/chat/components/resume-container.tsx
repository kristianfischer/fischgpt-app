"use client";

import { useState } from "react";
import { FileTextIcon } from "lucide-react";

export default function ResumeContainer({showResume}: {showResume: boolean}) {
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const handlePdfLoad = () => {
    setPdfLoaded(true);
    setPdfError(false);
  };

  const handlePdfError = () => {
    setPdfLoaded(false);
    setPdfError(true);
  };

  return (
        <div className={`
          transition-all duration-300 ease-in-out bg-muted/20 border-l border-border
          ${showResume ? 'w-1/3 min-w-[800px] max-w-[1000px] opacity-100' : 'w-0 opacity-0 overflow-hidden'}
        `}>
          {showResume && (
            <div className="h-full flex flex-col w-full min-h-0">    
              <div className="flex-1 p-2 overflow-hidden min-h-0">
                <div className="h-full w-full bg-background rounded-lg border border-border relative overflow-hidden">
                  <iframe
                    src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1&zoom=page-fit&view=FitH"
                    className="w-full h-full border-0"
                    title="Resume"
                    onLoad={handlePdfLoad}
                    onError={handlePdfError}
                  />
                  
                  {!pdfLoaded && !pdfError && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm bg-background rounded-lg">
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto mb-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        <p>Loading PDF...</p>
                      </div>
                    </div>
                  )}
                  
                  {pdfError && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm bg-background rounded-lg">
                      <div className="text-center">
                        <FileTextIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="mb-2">Resume PDF</p>
                        <div className="space-y-1">
                          <a 
                            href="/resume.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-primary hover:underline text-xs"
                          >
                            Open in new tab
                          </a>
                          <p className="text-xs text-muted-foreground/60">
                            Place resume.pdf in public folder
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
  );
}