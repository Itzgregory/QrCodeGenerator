import { QRCodeUtil } from '../../../../shared/utils/qr-code.util';
import { Observable } from 'rxjs';
export declare class SSEService {
    private readonly qrCodeUtil;
    constructor(qrCodeUtil: QRCodeUtil);
    getQRCodeStream(): Observable<MessageEvent>;
}
