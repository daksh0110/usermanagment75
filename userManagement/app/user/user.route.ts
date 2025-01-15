
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import { resetPassword, setPassword } from "./user.controller";
setPassword
// import * as userController from "./user.controller";
// import * as userValidator from "./user.validation";

 const router = Router();

 router
         .get("/reset-password/:token", catchError,resetPassword)
         .post("/set-password/:token", catchError, setPassword);
//         .get("/:id", userController.getUserById)
//         .delete("/:id", userController.deleteUser)
//         .post("/", userValidator.createUser, catchError, userController.createUser)
//         .put("/:id", userValidator.updateUser, catchError, userController.updateUser)
//         .patch("/:id", userValidator.editUser, catchError, userController.editUser)

 export default router;

