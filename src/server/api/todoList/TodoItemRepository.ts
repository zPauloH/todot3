import type { Prisma } from "@prisma/client";
import { db } from "src/server/db";



class TodoItemRepository {
    async findAll() {
        return await db.todoItem.findMany({});
    }
    async findById(id: number) {
      return await db.todoItem.findUnique({
        where: {
          id: id,
        }
      });
  }
}

const todoItemRepository = new TodoItemRepository();
export default todoItemRepository;
