import { Request, Response } from "express";
import { CreateTaskService } from "../../services/tasks/CreateTaskService";

export class CreateTaskController {
  async handle(req: Request, res: Response) {
    const { title, description } = req.body;

    const createTaskService = new CreateTaskService();
    const task = await createTaskService.execute({ title, description });
    
    return res.json(task);
  }
}
