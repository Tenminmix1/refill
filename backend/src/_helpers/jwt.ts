import * as jwt from 'jsonwebtoken';
import { IUserDocument, User } from '../api/models/user.model';
import { NextFunction, Response, Request } from 'express';

function generateAuthJWT(user: IUserDocument, roles: string[]): string {
  const claimsSet = {
    username: user.username,
    id: user.id,
    role: roles
  };
  return jwt.sign(claimsSet, process.env.JWT_SECRET as string, { algorithm: 'HS256' });
}

const decodeJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies['accessToken']; // Express headers are auto converted to lowercase
  if (!token) {
    res.status(401);
    res.json({ message: 'Auth token is not supplied', auth: false });
    return res;
  } else {
    if (token) {
      // change any into real types
      jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) {
          console.log(err);
          res.status(401);
          res.json({
            success: false,
            message: 'Token is not valid'
          });
          return res;
        } else {
          res.locals.user = decoded; // decoded is the payload of the jwt
          // req.currentUser = decoded; // dont work
          return next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }
};

export default {
  generateAuthJWT,
  decodeJwt
}
