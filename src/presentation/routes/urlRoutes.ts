import { Router } from 'express';
import { container } from 'tsyringe';
import { UrlController } from '../controllers/UrlController';
import { API_ROUTES } from '../../shared/constants/apiRoutes';
import { authMiddleware } from '../middleware/authMiddleware';

export function getUrlRoutes() {
  const router = Router();
  const urlController = container.resolve(UrlController);
  
  // POST /api/urls (Protected by authMiddleware)
  router.post(API_ROUTES.URL.CREATE, authMiddleware, urlController.create.bind(urlController));
  
  return router;
}
