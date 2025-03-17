import {Router} from "express";
const router = Router();
import "./task_apis"

router.get("/get", get_all_tasks_for_user);
router.get("/gettype", get_all_tasks_for_user_type_of_day);
router.post("/new",  new_task);
router.put("/:id", edit_task);
router.delete("/:id", delete_task);