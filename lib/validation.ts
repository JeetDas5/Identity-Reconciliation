import z from "zod";

export const identifySchema = z
  .object({
    email: z.email().optional().nullable(),
    phoneNumber: z.string().min(1).optional().nullable(),
  })
  .refine((data) => data.email || data.phoneNumber);
