import { layout } from '../components/layout';
import { qrDisplay } from '../components/qr-display';

export function qrPage(qrCode: string) {
  return layout(`
    ${qrDisplay(qrCode)}
  `);
}