//uso do multer aqui

import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";


const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
];

// Configuração de armazenamento e filtro para aceitar apenas PDF
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato inválido! Apenas PDF, JPG, JPEG e PNG são permitidos.'));
    }
};

export const uploadConfig = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});