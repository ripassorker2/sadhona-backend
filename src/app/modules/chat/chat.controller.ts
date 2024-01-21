import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../../shared/sendResponse';
import { catchAsync } from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { IChat, IConversation } from './chat.interface';
import { ChatServices } from './chat.services';

const createConversation = catchAsync(async (req: Request, res: Response) => {
   const result = await ChatServices.createConversation(req.body, req.user?.id);

   sendResponse<IConversation>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Created conversation successfully..!!',
      data: result,
   });
});
const getUserConversation = catchAsync(async (req: Request, res: Response) => {
   const result = await ChatServices.getUserConversation(req.params.userId);

   sendResponse<IConversation[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Fetch conversation successfully..!!',
      data: result,
   });
});
const createChat = catchAsync(async (req: Request, res: Response) => {
   const result = await ChatServices.createChat(req.body);

   sendResponse<IChat>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Create chat message successfully..!!',
      data: result,
   });
});
const getChat = catchAsync(async (req: Request, res: Response) => {
   const result = await ChatServices.getChat(req.params.conversationId);

   sendResponse<IChat[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Get chat message successfully..!!',
      data: result,
   });
});

export const ChatController = {
   createConversation,
   getUserConversation,
   createChat,
   getChat,
};
