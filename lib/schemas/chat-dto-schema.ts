import { z } from "zod";
import type { ChatResponse } from "@/lib/types/chat";

export const chatResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    response: z.string(),
    metadata: z.object({
        input_tokens: z.number(),
        output_tokens: z.number(),
        new_tokens: z.number(),
        generation_time: z.number(),
        tokens_per_second: z.number(),
        model: z.string(),
        parameters:  z.object({
            temperature: z.number(),
            max_length: z.number(),
            top_p: z.number(),
          }),
      }),
  }),
});

const chatDtoSchemaTransformer = (
    data: z.infer<typeof chatResponseSchema>
  ): ChatResponse => {
    return {
      success: data.success,
      data: {
        response: data.data.response,
        metadata: data.data.metadata,
      },
    };
  };
  
  export const chatDtoSchema =
    chatResponseSchema.transform(
      chatDtoSchemaTransformer
    );



