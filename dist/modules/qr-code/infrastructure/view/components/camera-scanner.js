"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cameraScanner = void 0;
function cameraScanner() {
    return `
    <h2>Camera Scanner</h2>
    <div id="camera-view" style="width: 100%; height: 300px; background: black;"></div>
    <p>Point your camera at the QR code to scan it</p>
    <button class="scan-button" onclick="window.location.href='/qr'">
      Back to QR Code
    </button>
    <script src="/js/qr-scanner.js"></script>
  `;
}
exports.cameraScanner = cameraScanner;
//# sourceMappingURL=camera-scanner.js.map