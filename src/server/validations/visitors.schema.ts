import { z } from 'zod';

export const uniqueVisitorsParamsSchema = z.object({
	initialDate: z.string(),
	finalDate: z.string()
});

export const uniqueVisitorsResponseSchema = z.object({
	countryCode: z.string(),
	hour: z.number(),
	visitors: z.number()
});

export type UniqueVisitorsParams = z.infer<typeof uniqueVisitorsParamsSchema>;
export type UniqueVisitorsResponse = z.infer<typeof uniqueVisitorsResponseSchema>;
