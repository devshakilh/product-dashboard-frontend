import { z } from 'zod';

export const supportRequestSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  category: z.enum(['technical', 'design', 'bug', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  description: z.string().min(1, 'Description is required'),
  emailUpdates: z.boolean().default(false), // Non-optional, defaults to false
  image: z.instanceof(File).optional().nullable(), // Allow image to be File or null
});

export type SupportRequestFormData = z.infer<typeof supportRequestSchema>;
