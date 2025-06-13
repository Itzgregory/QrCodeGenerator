import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { QRCodeService } from '../../application/qr-code.service';
import { SSEService } from '../severSentEvent/sse.service';
import { qrPage } from '../view/pages/qr-page';
import { Observable } from 'rxjs';

@Controller()
export class QRCodeController {
  constructor(
    private readonly qrCodeService: QRCodeService,
    private readonly sseService: SSEService,
  ) {}

  @Get('qr')
  async generateQR(@Res() res: Response) {
    try {
      const qr = await this.qrCodeService.generateQRCode();
      res.send(qrPage(qr));
    } catch (err) {
      res.status(500).send('Error generating QR code');
    }
  }

  @Sse('qr/stream')
  qrCodeStream(): Observable<MessageEvent> {
    return this.sseService.getQRCodeStream();
  }


}