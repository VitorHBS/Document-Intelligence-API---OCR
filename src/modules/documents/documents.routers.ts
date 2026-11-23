import { Router } from 'express';
import { uploadConfig } from './middleware/upload.middleware.js';
import { uploadController } from '../../shared/container.js';

const uploadRouter = Router();


uploadRouter.post('/documents', uploadConfig.single('document'), uploadController.handler);

export { uploadRouter }