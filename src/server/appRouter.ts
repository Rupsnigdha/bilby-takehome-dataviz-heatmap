import { uniqueVisitorsRouter } from './routers/visitors.router';
import { createTRPCRouter } from './trpcContext';

export const appRouter = createTRPCRouter({
	uniqueVisitors: uniqueVisitorsRouter
});

export type AppRouter = typeof appRouter;
