"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrPage = void 0;
const layout_1 = require("../components/layout");
const qr_display_1 = require("../components/qr-display");
function qrPage(qrCode) {
    return (0, layout_1.layout)(`
    ${(0, qr_display_1.qrDisplay)(qrCode)}
  `);
}
exports.qrPage = qrPage;
//# sourceMappingURL=qr-page.js.map