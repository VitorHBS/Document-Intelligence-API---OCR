export class InvalidFileTypeError extends Error{
    constructor(message = 'Formato inválido! Apenas PDF, JPG, JPEG e PNG são permitidos.'){
        super(message);
        this.name = 'InvalidFileTypeError';
    }
}

export class NotImplementedError extends Error{
    constructor(message = 'Formato inválido! Apenas JPG, JPEG e PNG são permitidos por enquanto.'){
        super(message);
        this.name = 'NotImplementedError';
    }
}