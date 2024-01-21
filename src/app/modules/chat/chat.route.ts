import express from 'express';
import { ChatController } from './chat.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
   '/conversation',
   auth(USER_ROLE.ADMIN, USER_ROLE.CLIENT, USER_ROLE.FREELANCER),
   ChatController.createConversation
);
router.get('/conversation/:userId', ChatController.getUserConversation);
router.post('/message', ChatController.createChat);
router.get('/:conversationId', ChatController.getChat);

export const ChatRoutes = router;
