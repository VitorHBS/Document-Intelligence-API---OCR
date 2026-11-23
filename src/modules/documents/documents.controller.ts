import type { Request, Response } from "express";
import type { DocumentService } from "./documents.service.js";

export class UploadController {

    constructor(private documentService: DocumentService) { }

    public handler = async (req: Request, res: Response) => {

        if (!req.file?.buffer) {
            return res.status(400).json({ error: 'Nenhum arquivo válido foi enviado' })
        }

        const text  = await this.documentService.execute({ image: req.file.buffer, mimetype: req.file.mimetype });


        return res.status(200).json({texto: text})

        /*
        return res.status(200).json({
            mensagem: 'Arquivo enviado com sucesso!',
            arquivo: {
                nome: req.file.originalname,
                tamanho: req.file.size,
                mimetype: req.file.mimetype,
                text: text
            }
        })
        */
    }
}