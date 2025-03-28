import {Router} from "express";
const router = Router();
import * as apis from "./user_apis"

router.get("/get", apis.getAllUsers);
router.get("/read", apis.readUserDetailsFromCookie);
router.get("/clear", apis.clearUserCookie);
router.get("/today", apis.getTypeOfDayForUser);
router.post("/new",  apis.newUser);
router.post("/login",  apis.login);
router.put("/:id", apis.editUser);
router.delete("/:id", apis.deleteUser);

export default router;