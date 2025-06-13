import { Injectable } from '@nestjs/common';
import { QRCodeUtil } from '../../../../shared/utils/qr-code.util';
import { Observable, interval, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.Baseurl
  : `${process.env.Baseurldev}${process.env.PORT}`;

@Injectable()
export class SSEService {
  constructor(private readonly qrCodeUtil: QRCodeUtil) {}

  getQRCodeStream(): Observable<MessageEvent> {
    return interval(10000).pipe(
      mergeMap(() => from(this.generateQRCodeEvent()))
    );
  }

  private async generateQRCodeEvent(): Promise<MessageEvent> {
    const timestamp = Date.now();
    const link = `${BASE_URL}/movies?t=${timestamp}`;
    const qr = await this.qrCodeUtil.generate(link);
    return { data: qr } as MessageEvent;
  }
}
