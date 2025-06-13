"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeController = void 0;
const common_1 = require("@nestjs/common");
const qr_code_service_1 = require("../../application/qr-code.service");
const sse_service_1 = require("../severSentEvent/sse.service");
const qr_page_1 = require("../view/pages/qr-page");
const rxjs_1 = require("rxjs");
let QRCodeController = class QRCodeController {
    constructor(qrCodeService, sseService) {
        this.qrCodeService = qrCodeService;
        this.sseService = sseService;
    }
    async generateQR(res) {
        try {
            const qr = await this.qrCodeService.generateQRCode();
            res.send((0, qr_page_1.qrPage)(qr));
        }
        catch (err) {
            res.status(500).send('Error generating QR code');
        }
    }
    qrCodeStream() {
        return this.sseService.getQRCodeStream();
    }
};
__decorate([
    (0, common_1.Get)('qr'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QRCodeController.prototype, "generateQR", null);
__decorate([
    (0, common_1.Sse)('qr/stream'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], QRCodeController.prototype, "qrCodeStream", null);
QRCodeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [qr_code_service_1.QRCodeService,
        sse_service_1.SSEService])
], QRCodeController);
exports.QRCodeController = QRCodeController;
//# sourceMappingURL=qr-code.controllers.js.map