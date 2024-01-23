import { number, string, z } from "zod";

import { createTRPCRouter, publicProcedure } from "src/server/api/trpc";
import todoItemRepository from "./TodoItemRepository";

export const todoItemRouter = createTRPCRouter({
  listAll: publicProcedure
    .query(async () => {
      const items = await todoItemRepository.findAll();
      return {
        items
      };
    }),

    create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.todoItem.create({
        data: {
          name: input.name,
        },
      });
    }),

    delete: publicProcedure
    .input(z.object({ id: z.number().min(1) }))
    .mutation(async ({ctx, input }) => {
     return await ctx.db.todoItem.delete({
      where: {
        id: input.id
      },
     })
    }),

    update: publicProcedure
    .input(z.object({ id: z.number().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.todoItem.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        }
      });
    }),

});

