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
exports.SSEService = void 0;
const common_1 = require("@nestjs/common");
const qr_code_util_1 = require("../../../../shared/utils/qr-code.util");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const BASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.Baseurl
    : `${process.env.Baseurldev}${process.env.PORT}`;
let SSEService = class SSEService {
    constructor(qrCodeUtil) {
        this.qrCodeUtil = qrCodeUtil;
    }
    getQRCodeStream() {
        return (0, rxjs_1.interval)(10000).pipe((0, operators_1.mergeMap)(() => (0, rxjs_1.from)(this.generateQRCodeEvent())));
    }
    async generateQRCodeEvent() {
        const timestamp = Date.now();
        const link = `${BASE_URL}/movies?t=${timestamp}`;
        const qr = await this.qrCodeUtil.generate(link);
        return { data: qr };
    }
};
SSEService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [qr_code_util_1.QRCodeUtil])
], SSEService);
exports.SSEService = SSEService;
//# sourceMappingURL=sse.service.js.map