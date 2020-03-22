import { User, IUserDocument, Role } from '../models/user.model';
import { ILogin, IRegister } from '../models/auth.model'
import { NextFunction, Request, Response } from 'express';
import passport = require('passport');
import jwt from '../../_helpers/jwt';

export class AuthController {

  public static signUp(req: Request, res: Response, next: NextFunction) {
    User.create({ username: req.body.userParams.username, password: req.body.userParams.password })
      .then(user => {
        res.status(201);
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(400);
        if (err.code === 11000) {
          res.status(409);
          res.json({ msg: 'DUPMAIL' });
        }
      });
  }

  public static signIn(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (err, user) => {
      if (user) {

        User.findById(user.id, 'username role -_id').populate('role', 'name -_id').then(role => {
          let roles = role?.role?.map(x => (x as any).name);
          if (!roles) {
            roles = [];
          }
          const authToken = jwt.generateAuthJWT(user, roles as string[]);
          res.status(200);
          res.cookie('accessToken', authToken, { secure: true, signed: true, expires: new Date(Date.now() + 36000000), httpOnly: true });
          res.json({ user }); // viewbuilder?
          // const refreshToken = randtoken.uid(256) // refresh token maybe
        }).catch(err => {
          console.error(err);
          res.status(401).json({ msg: 'NOT_FOUND' });
        });
      } else {
        res.status(401);
        res.json({ msg: 'FALSE_CREDENTIALS' });
      }
    })(req, res, next);
  }

  public static token(req: Request, res: Response, next: NextFunction) {
    if (res.locals.user) { res.json({ status: true }); }
    else { res.json({ status: false }); }
    return res;
  }

  public static logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie('accessToken');
    res.status(200);
    res.json({ status: true })
    return res;
  }


  // Create an User and return the created user
  public static createUser({ username, password }: IRegister): Promise<IUserDocument> {
    return User.create({ username, password }).then((data: IUserDocument) => {
      return data;
    }).catch((error: Error) => {
      throw error;
    });
  }

  // Find an User for a specific username and use helperMethod for Password comparing
  public static findUserForAuth({ username, password }: ILogin): Promise<IUserDocument | null> {
    return new Promise((resolve, reject) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) reject(err);
        if (!user) { resolve(null); }
        user?.comparePassword(password, (_err: any, result: boolean) => {
          if (result) { resolve(user); }
          else { resolve(null); }
        });
      });
    });
  }

}
