import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
   const isExist = await User.findOne({ email: user.email });
   if (isExist) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exist...');
   }
   const result = await User.create(user);
   return result;
};

//
//
//
const getAllUsers = async (): Promise<IUser[] | null> => {
   const user = await User.find();
   return user;
};
const getSingleUser = async (email: string): Promise<IUser | null> => {
   const user = await User.findOne({ email });
   return user;
};

export const UserServices = {
   createUser,
   getAllUsers,
   getSingleUser,
};
