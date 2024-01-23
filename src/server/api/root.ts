import { postRouter } from "src/server/api/routers/post";
import { createTRPCRouter } from "src/server/api/trpc";
import { todoItemRouter } from "./todoList/TodoItemRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  todoItem: todoItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
