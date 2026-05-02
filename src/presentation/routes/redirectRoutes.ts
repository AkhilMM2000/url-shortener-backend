import { Router } from 'express';
import { container } from 'tsyringe';
import { UrlController } from '../controllers/UrlController';

export function getRedirectRoutes() {
  const router = Router();
  const urlController = container.resolve(UrlController);
  
  // GET /:shortCode (Public)
  router.get('/:shortCode', urlController.redirect.bind(urlController));
  
  return router;
}
