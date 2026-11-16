export interface OcrEngine  {
    extractText(image: Buffer): Promise<string>,
    terminate(): Promise<void>
}

