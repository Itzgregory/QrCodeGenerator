import { Injectable } from '@nestjs/common';
import { QRCodeUtil } from '../../../../shared/utils/qr-code.util';
import { Observable, interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const BASE_URL = process.env.Baseurl; 
@Injectable()
export class SSEService {
  constructor(private readonly qrCodeUtil: QRCodeUtil) {}

  getQRCodeStream(): Observable<MessageEvent> {
    return interval(10000).pipe(
      mergeMap(async () => {
        const timestamp = Date.now();
        const link = `${BASE_URL}:3000/movies?t=${timestamp}`;
        const qr = await this.qrCodeUtil.generate(link);
        return { data: qr } as MessageEvent;
      }),
    );
  }
}