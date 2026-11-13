import tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { pdf } from 'pdf-to-img';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const worker = await tesseract.createWorker('por');

const [, , imagePath] = process.argv;
const image = path.resolve(__dirname, (imagePath || '../../../documento_teste_ocr.pdf'))

console.log(`Recognizing ${image}`);

async function pdfToImg(file: Buffer) {
    const images: Buffer[] = [];

    const document = await pdf(file, { scale: 3 });

    for await (const image of document) {
        images.push(image)
    };

    return images;
}

(async () => {

    try {
        const images = await pdfToImg(fs.readFileSync(image));

        let fullText = '';

        for (const image of images) {
            console.log('Enviando imagem para OCR...');

            const { data: { text } } = await worker.recognize(image);

            console.log('Texto reconhecido:');
            console.log(text);

            fullText += text + '\n';
        }

        console.log(fullText);

    } finally {
        console.log('Encerrando worker...');
        await worker.terminate();
        console.log('Worker encerrado!');
    }
})();






/*
(async () => {

    try {
        const { data: { text, pdf } } = await worker.recognize(
            image,
            { pdfTitle: 'Example PDF' },
            { pdf: true }
        );

        console.log(text);

        if (pdf !== null) {
            const bufferSafe = Buffer.from(pdf)
            pdfToImg(bufferSafe);
            fs.writeFileSync('tesseract-ocr-result.pdf', bufferSafe);
        }
        console.log('PDF gerado!');

        console.log('Generate PDF: tesseract-ocr-result.pdf')
    } finally {
        console.log('Encerrando worker...');
        await worker.terminate();
        console.log('Worker encerrado!');

    }


})
*/

