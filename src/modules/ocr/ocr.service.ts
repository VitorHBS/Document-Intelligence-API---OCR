import type { OcrEngine } from "./ocr.engine.js"


export class OcrService {
    constructor(private engine: OcrEngine) {

    }

    async extractText(image: Buffer): Promise<string> {
        return await this.engine.extractText(image)
    }
}