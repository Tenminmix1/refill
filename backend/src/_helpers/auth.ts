import { NextFunction, Request, Response } from 'express';

export class Auth {

  public static authorize(role: string) {
    return function (req: Request, res: Response, next: NextFunction) {
      if (!res.locals.user.role && res.locals.user.role.includes(role)) {
        next();
      }
      else {
        return res.status(401).json({ status: 'error', code: 'unauthorized' });
      }
    };
  }
}
