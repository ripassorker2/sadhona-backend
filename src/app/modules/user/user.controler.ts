import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserServices } from './user.services';

const createUser = catchAsync(async (req: Request, res: Response) => {
   //
   const payload = req.body;
   const result = await UserServices.createUser(payload);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User Created successfully..!!',
      data: result,
   });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
   const result = await UserServices.getAllUsers();

   sendResponse<IUser[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Users fetch successfully..!!',
      data: result,
   });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
   const result = await UserServices.getSingleUser(req.params.id);

   sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User fetch successfully..!!',
      data: result,
   });
});

export const UserControler = {
   createUser,
   getSingleUser,
   getAllUsers,
};
