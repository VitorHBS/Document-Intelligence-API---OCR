import * as z from "zod";
 
export const FormatSchema = z.object({
    format: z.enum(["text", "json"]).default("json")
})