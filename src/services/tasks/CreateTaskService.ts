import { prisma } from "../../prisma";

interface TaskRequest {
  title: string;
  description: string;
}

export class CreateTaskService {
  async execute({ title, description }: TaskRequest) {
    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    return task;
  }
}
