import { Router } from 'express';
import { Route } from '../../types/route.interface';
import jwt from '../../_helpers/jwt';
import { DashboardController } from '../controllers/dashboard.controller';
export class DashboardRoutes implements Route {

  router: Router = Router();

  constructor(public path: string) {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(this.path + '/kpis', jwt.decodeJwt, DashboardController.kpis);
    this.router.get(this.path + '/donators', jwt.decodeJwt, DashboardController.donators);
    this.router.get(this.path + '/blumos', jwt.decodeJwt, DashboardController.fetchBlumos);
    this.router.get(this.path + '/publishedBlumos', jwt.decodeJwt, DashboardController.fetchPublishedBlumos);
    this.router.delete(this.path + '/blumo', jwt.decodeJwt, DashboardController.deleteBlumo);
    this.router.post(this.path + '/publishMail', jwt.decodeJwt, DashboardController.publishMail);
  }
}
