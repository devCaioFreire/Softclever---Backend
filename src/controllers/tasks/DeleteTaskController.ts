import { Request, Response } from "express";
import { DeleteTaskService } from "../../services/tasks/DeleteTaskService";

export class DeleteTaskController {
  async handle(req: Request, res: Response) {
    const { taskID } = req.params;
    const deleteTaskController = new DeleteTaskService();
    const task = await deleteTaskController.execute(taskID);

    return res.json(task);
  }
}
