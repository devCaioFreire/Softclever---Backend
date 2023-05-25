import { Request, Response } from "express";
import { PutTaskService } from "../../services/tasks/PutTaskService";

export class PutTaskController {
  async handle(req: Request, res: Response) {
    const { id, title, description } = req.body;

    const putTaskService = new PutTaskService();
    const task = await putTaskService.execute({ id, title, description });

    return res.json(task);
  }
}
