import { Module } from '@nestjs/common';
import { QRCodeService } from './application/qr-code.service';
import { HttpModule } from '@nestjs/axios';
import { QRCodeUtil } from '../../shared/utils/qr-code.util';
import { SSEService } from './infrastructure/severSentEvent/sse.service';
import { QRCodeController } from './infrastructure/controllers/qr-code.controllers';

@Module({
  imports: [HttpModule],
  controllers: [QRCodeController],
  providers: [
    QRCodeService,
    SSEService,
    QRCodeUtil,
  ],
})
export class QRCodeModule {}