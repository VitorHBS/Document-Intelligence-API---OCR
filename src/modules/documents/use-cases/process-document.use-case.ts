export interface FileValidator {
    validate(image: Buffer): Promise<boolean>;
}