import { Response } from 'express';
import { QRCodeService } from '../../application/qr-code.service';
import { SSEService } from '../severSentEvent/sse.service';
import { Observable } from 'rxjs';
export declare class QRCodeController {
    private readonly qrCodeService;
    private readonly sseService;
    constructor(qrCodeService: QRCodeService, sseService: SSEService);
    generateQR(res: Response): Promise<void>;
    qrCodeStream(): Observable<MessageEvent>;
}
