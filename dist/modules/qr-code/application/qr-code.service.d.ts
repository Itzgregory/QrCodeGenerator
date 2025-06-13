import { IQRCodeService } from 'src/core/interfaces/qr-code.interface';
import { QRCodeUtil } from 'src/shared/utils/qr-code.util';
export declare class QRCodeService implements IQRCodeService {
    private readonly qrCodeUtil;
    constructor(qrCodeUtil: QRCodeUtil);
    generateQRCode(): Promise<string>;
}
