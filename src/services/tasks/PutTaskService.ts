import { prisma } from "../../prisma";

interface TaskUpdateRequest {
  id: string;
  title: string;
  description: string;
}

export class PutTaskService {
  async execute({ id, title, description }: TaskUpdateRequest) {
    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return task;
  }
}
