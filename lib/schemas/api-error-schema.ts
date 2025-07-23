import { z } from "zod";

export const apiErrorSchema = z.object({
  detail: z.array(
    z.object({
      loc: z.array(z.string()),
      msg: z.string(),
      type: z.string(),
    })
  ),
});

export const apiStatusError = z
  .object({
    status: z.string(),
    status_code: z.number(),
    message: z.string(),
  })
  .transform((data) => ({
    status: data.status,
    statusCode: data.status_code,
    message: data.message,
  }));
