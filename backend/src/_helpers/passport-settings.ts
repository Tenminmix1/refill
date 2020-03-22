import passport from 'passport';
var Strategy = require('passport-local').Strategy;
import { AuthController } from '../api/controllers/auth.controller';

passport.use(new Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username: string, password: string, cb: any) {
  AuthController.findUserForAuth({ password: password, username: username })
    .then(user => {
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    })
    .catch(err => {
      console.log(err);
      return cb(err, false);
    });
}
));

export default passport;
