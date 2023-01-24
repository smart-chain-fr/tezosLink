 import { router, publicProcedure } from '../trpc';
 import { Prisma } from '@prisma/client';
 import { TRPCError } from '@trpc/server';
 import { z } from 'zod';
 import { prisma } from '@/server/prisma';
 
 
 /**
  * Default selector for Post.
  * It's important to always explicitly say which fields you want to return in order to not leak extra information
  * @see https://github.com/prisma/prisma/issues/9353
  */
 const defaultProjectSelect = Prisma.validator<Prisma.ProjectSelect>()({
   id: true,
   title: true,
   uuid: true,
   createdAt: true,
   updatedAt: true,
   network:true,
   Metrics:true,
 });
 
 export const projectRouter = router({
   list: publicProcedure
     .input(
       z.object({
         limit: z.number().min(1).max(100).nullish(),
         cursor: z.number().nullish(),
       }),
     )
     .query(async ({ input }) => {
       /**
        * For pagination docs you can have a look here
        * @see https://trpc.io/docs/useInfiniteQuery
        * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
        */
 
       const limit = input.limit ?? 50;
       const { cursor } = input;
 
       const items = await prisma.project.findMany({
         select: defaultProjectSelect,
         // get an extra item at the end which we'll use as next cursor
         take: limit + 1,
         where: {},
         cursor: cursor
           ? {
               id: cursor,
             }
           : undefined,
         orderBy: {
           createdAt: 'desc',
         },
       });
       let nextCursor: typeof cursor | undefined = undefined;
       if (items.length > limit) {
         // Remove the last item and use it as next cursor
 
         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
         const nextItem = items.pop()!;
         nextCursor = nextItem.id;
       }
 
       return {
         items: items.reverse(),
         nextCursor,
       };
     }),
   byUUID: publicProcedure
     .input(
       z.object({
         uuid: z.string().uuid(),
       }),
     )
     .query(async ({ input }) => {
       const { uuid } = input;
       const project = await prisma.project.findUnique({
         where: { uuid },
         select: defaultProjectSelect,
       });
       if (!project) {
         throw new TRPCError({
           code: 'NOT_FOUND',
           message: `No project with uuid '${uuid}'`,
         });
       }
       return project;
     }),
   add: publicProcedure
     .input(
       z.object({
         title: z.string(),
         uuid: z.string().uuid(),
         network: z.string().min(1).max(32),
       }),
     )
     .mutation(async ({ input }) => {
       const project = await prisma.project.create({
         data: input,
         select: defaultProjectSelect,
       });
       return project;
     }),
 });