import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import { auth } from '../../middleware/auth';
import { JobController } from './job.controller';

const router = express.Router();

router.post('/create', auth(USER_ROLE.CLIENT), JobController.createJob);

router.get('/', JobController.getAllJob);
router.get(
   '/:id',
   auth(USER_ROLE.CLIENT, USER_ROLE.ADMIN, USER_ROLE.FREELANCER),
   JobController.getSingleJob
);

export const JobsRoutes = router;
