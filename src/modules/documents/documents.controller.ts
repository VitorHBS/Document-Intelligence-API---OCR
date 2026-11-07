import type { Request, Response } from "express";


export class UploadController {
    public async handler(req: Request, res: Response): Promise<Response> {

        if (!req.file?.buffer) {
            return res.status(400).json({ error: 'Nenhum arquivo válido foi enviado' })
        }

        return res.status(200).json({
            mensagem: 'Arquivo enviado com sucesso!',
            arquivo: {
                nome: req.file.originalname,
                tamanho: req.file.size,
                mimetype: req.file.mimetype
            }
        })
    }
}