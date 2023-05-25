import { prisma } from "../../prisma";

export class GetTaskService {
  async execute() {
    const task = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
    return task;
  }
}
