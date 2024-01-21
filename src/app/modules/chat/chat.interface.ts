import { Document, Model } from 'mongoose';

export type IConversation = {
   members: [];
} & Document;

export type ConversationModel = Model<IConversation, Record<string, unknown>>;

export type IChat = {
   conversationId: string;
   senderId: string;
   message: string;
} & Document;

export type ChatModel = Model<IChat, Record<string, unknown>>;
