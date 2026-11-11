export class InvalidFileTypeError extends Error{
    constructor(message = 'Formato inválido! Apenas PDF, JPG, JPEG e PNG são permitidos.'){
        super(message);
        this.name = 'InvalidFileTypeError';
    }
}