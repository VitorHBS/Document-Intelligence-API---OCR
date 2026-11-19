import { Router} from 'express';
import { uploadConfig } from '../modules/documents/middleware/upload.middleware.js';
import { UploadController } from '../modules/documents/documents.controller.js';

const routers = Router();

const uploadController = new UploadController();

routers.post(
    '/documents/extract?format=json',
     uploadConfig.single('document'),
      uploadController.handler
);


export default routers


