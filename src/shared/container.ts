import { UploadController } from "../modules/documents/documents.controller.js";
import { DocumentService } from "../modules/documents/documents.service.js";
import { OcrService } from "../modules/ocr/ocr.service.js";
import { TesseractEngine } from "../modules/ocr/tesseract.engine.js";




export const ocrEngine = new TesseractEngine();
const ocrService = new OcrService(ocrEngine);
const documentService = new DocumentService(ocrService)

export const uploadController = new UploadController(documentService)