import { Request, Response } from "express";
import { GetTaskService } from "../../services/tasks/GetTaskService";

export class GetTaskController {
  async handle(req: Request, res: Response) {

    const getTaskService = new GetTaskService();
    const task = await getTaskService.execute();

    return res.json(task);
  }
}
