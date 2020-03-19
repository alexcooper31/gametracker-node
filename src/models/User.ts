import { pre, DocumentType, ReturnModelType, prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { IUserLoginCredentials, IUserCreationParameters, IUserPayload, IUserJWT } from './User.interfaces';
import Environment from '../environment';

async function preSave(this: DocumentType<User>, next: HookNextFunction) {
  if (this.isModified('password') && this.password) {
    try {
      const hashedPassword = await User.hashPassword(this.password);
      this.password = hashedPassword;
    } catch (e) {
      throw e;
    }
  }

  return next();
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@pre('save', preSave)
class User {
  public static async hashPassword(password: string) {
    let salt;
    try {
      salt = await bcrypt.genSalt();
    } catch (e) {
      throw e;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (e) {
      throw e;
    }
  }

  public static async login(
    this: ReturnModelType<typeof User>,
    { email, password }: IUserLoginCredentials,
  ) {
    try {
      const user = await this.findOne({ email: { $regex: new RegExp(email, 'i') } });

      if (!user) { throw new Error('INVALID_CREDENTIALS'); }

      const validPassword = await user.comparePassword(password);

      if (!validPassword) { throw new Error('INVALID_CREDENTIALS'); }

      await user.save();

      return user.getAuthenticationToken();
    } catch (e) {
      throw e;
    }
  }

  public static async createUser(
    this: ReturnModelType<typeof User>,
    { email, password }: IUserCreationParameters,
  ): Promise<DocumentType<User>> {
    const foundUser = await this.findOne({ email });

    if (foundUser) {
      throw new Error('USER_ALREADY_EXISTS.');
    }

    return this.create({
      email,
      password,
      playlist: [],
      favorites: [],
    });
  }

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  public async comparePassword(
    this: DocumentType<User>,
    password: string,
  ) {
    if (this.password) {
      try {
        const valid = await bcrypt.compare(password, this.password);
        return valid;
      } catch (e) {
        throw e;
      }
    }
    return false;
  }

  public getAuthenticationToken(
    this: DocumentType<User>,
    secret: string = Environment.variable('JWT_SECRET'),
  ) {
    const user: IUserPayload = {
      id: this._id,
      email: this.email,
    };

    const data: IUserJWT = {
      user,
      exp: moment().add(120, 'days').unix(),
      iat: moment().unix(),
    };

    return jwt.sign(data, secret);
  }
}

const UserModel = getModelForClass(User);

export {
  User,
  UserModel,
};
