import { z } from "zod";
import type { ChatResponse } from "@/lib/types/chat";

export const chatResponseSchema = z.object({
  response: z.string(),
  metadata: z.object({
    ragUsed: z.boolean(),
    contextLength: z.number(),
    promptLength: z.number(),
  }),
});

const chatDtoSchemaTransformer = (
    data: z.infer<typeof chatResponseSchema>
  ): ChatResponse => {
    return {
        response: data.response,
        metadata: data.metadata,
    };
  };
  
  export const chatDtoSchema =
    chatResponseSchema.transform(
      chatDtoSchemaTransformer
    );



