import { Router } from 'express';
import { uploadConfig } from '../modules/documents/middleware/upload.middleware.js';
import { UploadController } from '../modules/documents/documents.controller.js';
import { uploadController } from '../shared/container.js';

const routers = Router();



routers.post(
    '/documents/extract',
    uploadConfig.single('document'),
    uploadController.handler
);


export default routers


