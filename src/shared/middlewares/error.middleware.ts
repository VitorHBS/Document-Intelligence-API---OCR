import type {NextFunction, Request, Response} from 'express';
import multer from "multer";

export function errorMiddleware(err: unknown, req: Request, res:Response, next: NextFunction){
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(413).json({error: 'tamanho máximo do arquivo ultrapassado!'})
        } else {
            return res.status(400);
        }
    }
    return res.status(500).json({error: 'Aconteceu um erro inesperado!'})
}