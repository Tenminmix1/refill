import { Schema, Document, Types, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const salt = parseInt(<string>process.env.HASH_SALT);

// Interface For the return document from mongo
export interface IUserDocument extends Document {
  username: string;
  password: string;
  role?: Types.ObjectId[];
  comparePassword(hash: string, cb: any): boolean;
}

export interface CurrentUser {
  id: string;
  username: string;
  iat: Number
}

export interface IRoleDocument extends Document {
  name: string;
}

// required/unique true doesnt work
const RoleSchema: Schema = new Schema({
  name: {
    type: String
  }
});

// Schema for the mongoose model
const UserSchema: Schema = new Schema({
  firstname: {
    type: String,
    required: false,
    unique: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: [{ type: Types.ObjectId, ref: 'Role' }]
});

// Before the document will be saved, the password will be hashed, so no clear password in the database
UserSchema.pre('save', function (next) {
  const user = this as IUserDocument;
  // don't rehash if it's an old user
  if (!user.isModified || !user.isNew) { next(); }
  else {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        console.log('Error hashing password for user', user.username);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

// Helper Method to compare the document password with the given Password
UserSchema.methods.comparePassword = function (candidatePassword: string, cb: any) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Bind Schema with User Collection and define Response Value to IUserDocument
const User = model<IUserDocument>('User', UserSchema);
const Role = model<IRoleDocument>('Role', RoleSchema);

export { User, Role };
