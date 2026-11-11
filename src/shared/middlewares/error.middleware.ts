import type {NextFunction, Request, Response} from 'express';
import multer from "multer";
import { InvalidFileTypeError } from '../erros/invalid-file-type.error.js';

export function errorMiddleware(err: unknown, req: Request, res:Response, next: NextFunction){
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(413).json({error: 'tamanho máximo do arquivo ultrapassado!'})
        } else {
            return res.status(400).json({error: '“Erro no envio. Use o campo ‘document’.”'});
        }
    }

    if(err instanceof InvalidFileTypeError) {
        return res.status(400).json({error: err.message});
    }

    console.error(err)
    return res.status(500).json({error: 'Aconteceu um erro inesperado!'})
}