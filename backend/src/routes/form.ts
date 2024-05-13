import {Application} from "express"
import { FormController } from "../controllers/form";

export function formRoutes(app: Application) {
    app.post("/form", FormController.create);
}