import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// _helpers (setup for mongo, websockets, redis, jwt)
import Websockets from './_helpers/websockets';
import MongoConnect from './_helpers/mongo-connect';
import redis from './_helpers/redis-connect';
import { corsOptions } from './_helpers/cors-options';
import passport from './_helpers/passport-settings';
import { Route } from './types/route.interface';

class App {
  app: Application = express();

  constructor(routes: Route[]) {
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(passport.initialize());
    this.initializeRoutes(routes);
    this.config();
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/api', route.router);
    });
  }

  public config() {
    const connString: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
    // save locals
    this.app.locals.redis = redis;

    // Register User Routes to main app
    // Connect to mongo client
    MongoConnect({ connString });

    // connect to websockets
    Websockets(this.app);

    // add redis connection client file to application
  }


  public start(): void {
    this.app.listen(4000, () => {
      console.log('server is running on PORT 4000')
    })
  }
}
export default App;
