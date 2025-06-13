export interface IQRCodeService {
    generateQRCode(): Promise<string>;
}
