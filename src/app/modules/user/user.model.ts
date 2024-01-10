/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
   {
      name: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         unique: true,
         required: true,
      },
      password: {
         type: String,
         minlength: [6, 'Minimum length of password is 6'],
         required: true,
         // select: 0,
      },
      avatar: {
         type: String,
      },
   },
   {
      timestamps: true,
      toJSON: {
         virtuals: true,
      },
   }
);

userSchema.pre('save', async function (next) {
   let user = this;
   user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
   );
   next();
});

export const User = model<IUser, UserModel>('User', userSchema);
