import { IChat, IConversation } from './chat.interface';
import { Chat, Conversation } from './chat.model';

/* eslint-disable @typescript-eslint/no-explicit-any */
const createConversation = async (
   payload: any,
   currentUserId: string
): Promise<IConversation | null> => {
   const senderID = payload?.members?.find((p: string) => p == currentUserId);
   const receiverID = payload?.members?.find((p: string) => p != currentUserId);

   const existConversation = await Conversation.findOne({
      $and: [{ members: senderID }, { members: receiverID }],
   });

   if (existConversation) {
      const newNessages = {
         conversationId: existConversation?._id,
         senderId: senderID,
         message: payload.message,
      };

      await Chat.create(newNessages);
      return existConversation;
   }

   const conversation = await Conversation.create({ members: payload.members });

   const newNessages = {
      conversationId: conversation?._id,
      senderId: senderID,
      message: payload.message,
   };

   await Chat.create(newNessages);
   return conversation;
};
const getUserConversation = async (
   id: string
): Promise<IConversation[] | null> => {
   return await Conversation.find({
      members: {
         $in: [id],
      },
   }).sort({ createdAt: -1 });
};
const createChat = async (payload: any): Promise<IChat | null> => {
   const formattedDate = new Date().toISOString();

   await Conversation.updateOne(
      { _id: payload.conversationId },
      { $set: { updatedAt: formattedDate } }
   );
   return await Chat.create(payload);
};
const getChat = async (conversationId: string): Promise<IChat[] | null> => {
   return await Chat.find({ conversationId });
};

export const ChatServices = {
   createConversation,
   getUserConversation,
   createChat,
   getChat,
};
