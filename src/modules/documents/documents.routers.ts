import { Router } from 'express';
import { UploadController } from './documents.controller.js';
import { uploadConfig } from './middleware/upload.middleware.js';

const uploadRouter = Router();
const uploadController = new UploadController();

uploadRouter.post('/documents', uploadConfig.single('document'), uploadController.handler);

export { uploadRouter }