"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeModule = void 0;
const common_1 = require("@nestjs/common");
const qr_code_service_1 = require("./application/qr-code.service");
const axios_1 = require("@nestjs/axios");
const qr_code_util_1 = require("../../shared/utils/qr-code.util");
const sse_service_1 = require("./infrastructure/severSentEvent/sse.service");
const qr_code_controllers_1 = require("./infrastructure/controllers/qr-code.controllers");
let QRCodeModule = class QRCodeModule {
};
QRCodeModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [qr_code_controllers_1.QRCodeController],
        providers: [
            qr_code_service_1.QRCodeService,
            sse_service_1.SSEService,
            qr_code_util_1.QRCodeUtil,
        ],
    })
], QRCodeModule);
exports.QRCodeModule = QRCodeModule;
//# sourceMappingURL=qr-code.module.js.map