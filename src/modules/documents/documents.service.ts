import { test } from "node:test";
import { InvalidFileTypeError } from "../../shared/erros/invalid-file-type.error.js";
import type { OcrService } from "../ocr/ocr.service.js";

type DocumentInput = {
    file: Buffer,
    mimetype: string
}

type ExtractionResult = {
    pages: { number: number; text: string }[]
    metadata: { pageCount: number; method: string; processingTimeMs: number }
}

const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
];


export class DocumentService {
    constructor(private service: OcrService) {

    }

    async execute({ file, mimetype }: DocumentInput): Promise<ExtractionResult> {

        if (mimetype === "application/pdf") {
            throw new Error('Tipo do arquivo ainda não suportado!')
        }

        if (allowedMimeTypes.includes(mimetype)) {

            const start = Date.now()

            const text = await this.service.extractText(file)

            const pages = [{number: 1, text: text}]

            return {
                pages,
                metadata: {
                    pageCount: pages.length,
                    method: 'ocr',
                    processingTimeMs: Date.now() - start
                }
            }
        }

        //implementar errro hanlder global para n ter dois Error iguais sendo aviado
        throw new InvalidFileTypeError()

    }
}