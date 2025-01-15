
import { Router } from "express";
import { catchError } from "../middleware/cath-error.middleware";
import { adminLogin ,createUser,blockUser,getUsers} from "./admin.controller";
const router = Router();

router
        
        .post("/login", catchError,adminLogin )
        .post("/create",catchError,createUser)
        .put("/block/:id",catchError,blockUser)
        .get("/analytics",catchError,getUsers)
        // .put("/:id", userValidator.updateUser, catchError, userController.updateUser)
        // .patch("/:id", userValidator.editUser, catchError, userController.editUser)

export default router;
