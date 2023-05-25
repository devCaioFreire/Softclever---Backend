import { prisma } from "../../prisma";

export class DeleteTaskService {
  async execute(taskID: string) {
    const task = await prisma.task.delete({
      where: {
        id: taskID,
      },
    });
    return task;
  }
}
