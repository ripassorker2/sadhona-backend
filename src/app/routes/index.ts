import express from 'express';
import { JobsRoutes } from '../modules/Jobs/job.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
   // ... routes
   {
      path: '/user',
      routes: UserRoutes,
   },
   {
      path: '/auth',
      routes: AuthRoutes,
   },
   {
      path: '/job',
      routes: JobsRoutes,
   },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
