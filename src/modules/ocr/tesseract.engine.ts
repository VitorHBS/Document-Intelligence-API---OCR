import tesseract from "tesseract.js";
import type { OcrEngine } from "./ocr.engine.js";

type Worker = Awaited<ReturnType<typeof tesseract.createWorker>>;

export class TesseractEngine implements OcrEngine {

    private workPromise: Promise<Worker> | null = null;

    private getWorker(): Promise<Worker> {

        if (!process.env.TESSDATA_PATH) {
            throw new Error("TESSDATA_PATH não configurado");
        }


        if (!this.workPromise) {
            const promise = tesseract.createWorker("por", 1, {
                langPath: process.env.TESSDATA_PATH,
                gzip: false
            });
            
            this.workPromise = promise;
            
            //se work falhar, zera ele para tentar novamente
            promise.catch(() => {
                if(this.workPromise === promise) this.workPromise = null;
            })
        } 
        return this.workPromise;
    }

    async extractText(image: Buffer): Promise<string> {
        const worker = await this.getWorker();
        const { data } = await worker.recognize(image);
        return data.text;
    }

    async terminate(): Promise<void> {
        if (!this.workPromise) return;
        const worker = await this.workPromise;
        await worker.terminate();
        this.workPromise = null;
    }
}