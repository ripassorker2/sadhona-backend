import express from 'express';
// import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../../../enums/user';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
   '/login',
   validateRequest(AuthValidation.createLoginZodSchema),
   AuthController.loginUser
);
router.post(
   '/refresh',
   validateRequest(AuthValidation.createRefreshTokenZodSchema),
   auth(USER_ROLE.ADMIN, USER_ROLE.CLIENT, USER_ROLE.SELLER),
   AuthController.refreshToken
);

router.post(
   '/change-password',
   validateRequest(AuthValidation.changePasswordZodSchema),
   auth(USER_ROLE.ADMIN, USER_ROLE.CLIENT, USER_ROLE.SELLER),
   AuthController.changePassword
);

export const AuthRoutes = router;
