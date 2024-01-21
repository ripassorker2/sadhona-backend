import { Schema, model } from 'mongoose';
import {
   ChatModel,
   ConversationModel,
   IChat,
   IConversation,
} from './chat.interface';

const conversationSchema = new Schema<IConversation, ConversationModel>(
   {
      members: [],
   },
   {
      timestamps: true,
   }
);

export const Conversation = model<IConversation, ConversationModel>(
   'Conversation',
   conversationSchema
);

const chatSchemas = new Schema<IChat, ChatModel>(
   {
      conversationId: {
         type: String,
         required: true,
      },
      senderId: {
         type: String,
         required: true,
      },
      message: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export const Chat = model<IChat, ChatModel>('Chat', chatSchemas);
