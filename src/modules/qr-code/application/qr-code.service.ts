import { Injectable } from '@nestjs/common';
import { IQRCodeService } from 'src/core/interfaces/qr-code.interface';
import { APP_CONFIG } from 'src/shared/config/app.config';
import { QRCodeUtil } from 'src/shared/utils/qr-code.util';

const BASE_URL = process.env.Baseurl; 

@Injectable()
export class QRCodeService implements IQRCodeService {
  constructor(private readonly qrCodeUtil: QRCodeUtil) {}

  async generateQRCode(): Promise<string> {
    const timestamp = Date.now();
    const link = `${BASE_URL}:${APP_CONFIG.port}/movies?t=${timestamp}`;
    return this.qrCodeUtil.generate(link);
  }
}