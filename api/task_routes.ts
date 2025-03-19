import {Router} from "express";
const router = Router();
import * as apis from "./task_apis"

router.get("/get", apis.get_all_tasks_for_user);
router.get("/gettype", apis.get_all_tasks_for_user_type_of_day);
router.post("/new",  apis.new_task);
router.put("/:id", apis.edit_task);
router.delete("/:id", apis.delete_task);

export default router;