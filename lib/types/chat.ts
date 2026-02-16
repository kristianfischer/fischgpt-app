export interface ChatResponse {
  response: string;
  metadata: {
    ragUsed: boolean;
    contextLength: number;
    promptLength: number;
  };
}
