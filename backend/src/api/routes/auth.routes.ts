import { Router } from 'express';
import { Route } from '../../types/route.interface';
import { AuthController } from '../controllers/auth.controller';
import jwt from '../../_helpers/jwt';
export class AuthRoutes implements Route {

  router: Router = Router();

  constructor(public path: string) {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path + '/sign-up', AuthController.signUp);
    this.router.post(this.path + '/sign-in', AuthController.signIn);
    this.router.get(this.path + '/token', jwt.decodeJwt, AuthController.token);
    this.router.get(this.path + '/logout', AuthController.logout);
  }
}
