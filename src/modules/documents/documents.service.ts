import { InvalidFileTypeError } from "../../shared/erros/invalid-file-type.error.js";
import type { OcrService } from "../ocr/ocr.service.js";

type DocumentInput = {
    image: Buffer,
    mimetype: string
}

const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png'
];


export class DocumentService {
    constructor(private service: OcrService) {

    }

    async execute({ image, mimetype }: DocumentInput) {

        if (mimetype === "application/pdf") {
            throw new Error('Tipo do arquivo ainda não suportado!')
        }

        if (allowedMimeTypes.includes(mimetype)) {
            return await this.service.extractText(image)
        }

        //implementar errro hanlder global para n ter dois Error iguais sendo aviado
        throw InvalidFileTypeError

    }
}