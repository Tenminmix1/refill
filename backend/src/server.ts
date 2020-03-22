import App from './app';
import { AuthRoutes } from './api/routes/auth.routes';
import { UserRoutes } from './api/routes/user.routes';
import { DashboardRoutes } from './api/routes/dashboard.routes';
import { RefillRoutes } from './api/routes/refill.routes';


// Check if all envs are given

const app = new App(
  [
    new AuthRoutes('/auth'),
    new UserRoutes('/users'),
    new DashboardRoutes('/dashboard'),
    new RefillRoutes('/refill'),
  ],
);

app.start();
