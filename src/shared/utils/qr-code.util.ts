import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QRCodeUtil {
  async generate(link: string): Promise<string> {
    return QRCode.toDataURL(link);
  }
}