import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/AuthController';
import { API_ROUTES } from '../../shared/constants/apiRoutes';

export function getAuthRoutes() {
  const router = Router();
  const authController = container.resolve(AuthController);
  
  router.post(API_ROUTES.AUTH.REGISTER, authController.register.bind(authController));
  router.post(API_ROUTES.AUTH.LOGIN, authController.login.bind(authController));
  router.post(API_ROUTES.AUTH.REFRESH, authController.refreshToken.bind(authController));
  
  return router;
}
