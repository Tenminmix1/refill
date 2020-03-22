import { User, IUserDocument } from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

export class UserController {

  public static overview(req: Request, res: Response, next: NextFunction) {
    User.find({}).then(user => {
      res.status(200).json(user);
    }).catch(err => {
      console.error(err);
      res.status(401).json({ msg: 'NOT_FOUND' });
    });
    return res;
  }

  public static profile(req: Request, res: Response, next: NextFunction) {
    User.findById(res.locals.user.id, 'username role -_id').populate('role', 'name -_id').then(user => {
      // fs.createReadStream(app.locals.path.resolve(UPLOAD_PATH, image.filename)).pipe(res)
      res.status(200).json(user);
    }).catch(err => {
      console.error(err);
      res.status(401).json({ msg: 'NOT_FOUND' });
    });
    return res;
  }
}

