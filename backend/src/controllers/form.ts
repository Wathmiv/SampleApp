import { Response, Request } from "express";

export class FormController {
  static create(req: Request, res: Response) {
    console.log(req.body);
    res.send("Form Data Received Successfully!");
  }
}