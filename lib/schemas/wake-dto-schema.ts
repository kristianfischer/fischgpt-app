import { z } from "zod";
import type { WakeResponse } from "@/lib/types/wake";

export const wakeResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    method: z.string(),
    timestamp: z.string(),
});

const wakeDtoSchemaTransformer = (
    data: z.infer<typeof wakeResponseSchema>
  ): WakeResponse => {
    return {
      success: data.success,
      message: data.message,
      method: data.method,
      timestamp: new Date(data.timestamp),
    };
  };

  export const wakeDtoSchema =
    wakeResponseSchema.transform(
      wakeDtoSchemaTransformer
    );


