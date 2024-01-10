import express from 'express';
// import { validateRequest } from '../../middleware/validateRequest';
// import { UserValidation } from './user.validation';
import { USER_ROLE } from '../../../enums/user';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { UserControler } from './user.controler';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
   '/create',
   validateRequest(UserValidation.createUserZodSchema),
   UserControler.createUser
);
router.get(
   '/:email',
   // auth(USER_ROLE.ADMIN, USER_ROLE.CLIENT, USER_ROLE.FREELANCER),
   UserControler.getSingleUser
);
router.get(
   '/',
   auth(USER_ROLE.ADMIN, USER_ROLE.CLIENT, USER_ROLE.FREELANCER),
   UserControler.getAllUsers
);

export const UserRoutes = router;
