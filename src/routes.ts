import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { CreateTaskController } from "./controllers/tasks/CreateTaskController";
import { GetTaskController } from "./controllers/tasks/GetTaskController";
import { DeleteTaskController } from "./controllers/tasks/DeleteTaskController";
import { PutTaskController } from "./controllers/tasks/PutTaskController";

const router = Router();

// User Routes
router.post("/register", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/userinfo", isAuthenticated, new DetailUserController().handle);

// Task Routes
router.post(
  "/register/task",
  isAuthenticated,
  new CreateTaskController().handle
);
router.get("/tasks", isAuthenticated, new GetTaskController().handle);

router.delete(
  "/tasks:taskID",
  isAuthenticated,
  new DeleteTaskController().handle
);
router.put("/tasks/:taskID", isAuthenticated, new PutTaskController().handle);

export { router };
