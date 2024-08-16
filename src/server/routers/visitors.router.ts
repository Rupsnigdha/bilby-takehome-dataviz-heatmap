import { createTRPCRouter, publicProcedure } from '$server/trpcContext';
import { VisitorsService } from '$server/services/visitors.service';
import { uniqueVisitorsParamsSchema } from '$server/validations/visitors.schema';

export const uniqueVisitorsRouter = createTRPCRouter({
	getUniqueVisitorsByCountry: publicProcedure
		.input(uniqueVisitorsParamsSchema)
		.query(({ input }) => {
			return new VisitorsService().getUniqueVisitors(input);
		})
});
