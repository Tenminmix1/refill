import { Router } from 'express';
import { Route } from '../../types/route.interface';
import { UserController } from '../controllers/user.controller';
import jwt from '../../_helpers/jwt';
import { Auth } from '../../_helpers/auth';

export class UserRoutes implements Route {

  router: Router = Router();

  constructor(public path: string) {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(this.path + '/overview', jwt.decodeJwt, Auth.authorize('admin'), UserController.overview);
    this.router.get(this.path + '/profile', [jwt.decodeJwt], UserController.profile);
  }
}
