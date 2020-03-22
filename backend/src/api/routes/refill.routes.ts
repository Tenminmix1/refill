import { Router } from 'express';
import { Route } from '../../types/route.interface';
import jwt from '../../_helpers/jwt';
import { RefillController } from '../controllers/refill.controller';
export class RefillRoutes implements Route {

  router: Router = Router();

  constructor(public path: string) {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(this.path + '/add-donator', RefillController.addDonator);
    this.router.post(this.path + '/find-donation-centers', RefillController.findDonationCenters);

  }
}
