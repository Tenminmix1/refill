import { CurrentUser } from "../api/models/user.model";
import { Request } from "express"
declare global {
  namespace Express {
    export interface Request {
      currentUser: CurrentUser;
    }
  }
}