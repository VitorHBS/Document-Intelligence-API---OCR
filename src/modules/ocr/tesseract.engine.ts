import tesseract from "tesseract.js";
import type { OcrEngine } from "./ocr.engine.js";

type Worker = Awaited<ReturnType<typeof tesseract.createWorker>>;

export class TesseractEngine implements OcrEngine {

    private workPromisse: Promise<Worker> | null = null;

    private getWorker(): Promise<Worker> {

        if (!process.env.TESSDATA_PATH) {
            throw new Error("TESSDATA_PATH não configurado");
        }


        this.workPromisse ??= tesseract.createWorker("por", 1, {
            langPath: process.env.TESSDATA_PATH,
            gzip: false
        });

        //se work falhar, zera ele para tentar novamente
        this.workPromisse = this.workPromisse.catch((error) => {
            this.workPromisse = null;
            throw error
        })
        return this.workPromisse;
    }

    async extractText(image: Buffer): Promise<string> {
        const worker = await this.getWorker();
        const { data } = await worker.recognize(image);
        return data.text;
    }

    async terminate(): Promise<void> {
        if (!this.workPromisse) return;
        const worker = await this.workPromisse;
        await worker.terminate();
        this.workPromisse = null;
    }
}