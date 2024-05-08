import * as z from 'zod';

export const threadValidiation = z.object({
    thread: z.string().min(3, { message: "Minimum three characters" }),
    accountId: z.string(),
})

export const commentValidiation = z.object({
    thread: z.string().min(3, { message: "Minimum three characters" }),
})