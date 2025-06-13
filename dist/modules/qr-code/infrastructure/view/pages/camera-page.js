"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cameraPage = void 0;
const layout_1 = require("../components/layout");
const camera_scanner_1 = require("../components/camera-scanner");
function cameraPage() {
    return (0, layout_1.layout)((0, camera_scanner_1.cameraScanner)());
}
exports.cameraPage = cameraPage;
//# sourceMappingURL=camera-page.js.map