import type { Request, Response } from "express";
import type { DocumentService } from "./documents.service.js";
import { FormatSchema } from "../../schemas/format.js";
import { InvalidFileTypeError } from "../../shared/erros/invalid-file-type.error.js";

export class UploadController {

    constructor(private documentService: DocumentService) { }

    public handler = async (req: Request, res: Response) => {

        try {

            const result = FormatSchema.safeParse({
                format: req.query.format
            });

            if (!result.success) {
                return res.status(400).json({ error: "Formato inválido!" });
            }

            const { format } = result.data

            if (!req.file?.buffer) {
                return res.status(400).json({ error: 'Nenhum arquivo válido foi enviado' })
            }

            const extraction = await this.documentService.execute({
                file: req.file.buffer,
                mimetype: req.file.mimetype
            });

            if (format === "text") {
                const texto = extraction.pages.map(page => page.text).join("\n\n")
                return res.type("text/plain").send(texto)
            }

            return res.status(200).json({
                pages: extraction.pages,
                metadata: extraction.metadata
            });
        } catch (err) {
            if (err instanceof InvalidFileTypeError) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Internal Error' })
        }


    }
}