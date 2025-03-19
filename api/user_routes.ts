import {Router} from "express";
const router = Router();
import * as apis from "./user_apis"

router.get("/get", apis.get_all_users);
router.get("/read", apis.read_user_details_from_cookie);
router.get("/clear", apis.clear_user_cookie);
router.get("/today", apis.get_type_of_day_for_user);
router.post("/new",  apis.new_user);
router.post("/login",  apis.login);
router.put("/:id", apis.edit_user);
router.delete("/:id", apis.delete_user);

export default router;