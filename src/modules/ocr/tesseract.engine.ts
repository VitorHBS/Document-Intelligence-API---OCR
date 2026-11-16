import tesseract from "tesseract.js";
import type { OcrEngine } from "./ocr.engine.js";

type Worker = Awaited<ReturnType<typeof tesseract.createWorker>>;

export class TesseractEngine implements OcrEngine {
    
    private workPromisse: Promise<Worker> | null = null;

    private getWorker(): Promise<Worker> {
        this.workPromisse ??= tesseract.createWorker("por");
        return this.workPromisse;
    }

    async extractText(image: Buffer): Promise<string> {
        const worker = await this.getWorker();
        const { data } = await worker.recognize(image);
        return data.text;
    }

    async terminate(): Promise<void>{
        if(!this.workPromisse) return;
        const worker = await this.workPromisse;
        await worker.terminate();
        this.workPromisse = null;
    }
}