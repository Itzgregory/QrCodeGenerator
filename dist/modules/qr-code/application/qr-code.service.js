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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeService = void 0;
const common_1 = require("@nestjs/common");
const app_config_1 = require("../../../shared/config/app.config");
const qr_code_util_1 = require("../../../shared/utils/qr-code.util");
const BASE_URL = process.env.Baseurl;
let QRCodeService = class QRCodeService {
    constructor(qrCodeUtil) {
        this.qrCodeUtil = qrCodeUtil;
    }
    async generateQRCode() {
        const timestamp = Date.now();
        const baseUrl = process.env.NODE_ENV === 'production'
            ? process.env.Baseurl
            : `${process.env.Baseurldev}${app_config_1.APP_CONFIG.port}`;
        const link = `${baseUrl}/movies?t=${timestamp}`;
        return this.qrCodeUtil.generate(link);
    }
};
QRCodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [qr_code_util_1.QRCodeUtil])
], QRCodeService);
exports.QRCodeService = QRCodeService;
//# sourceMappingURL=qr-code.service.js.map