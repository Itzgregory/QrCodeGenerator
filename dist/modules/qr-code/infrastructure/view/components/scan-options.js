"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanOptions = void 0;
function scanOptions() {
    return `
    <div class="scan-options">
      <button class="scan-button" onclick="document.getElementById('auto-scan-instructions').style.display='block'; document.getElementById('camera-instructions').style.display='none'">
        Scan Automatically
      </button>
      <button class="scan-button secondary" onclick="initCameraScan()">
        Use Camera to Scan
      </button>
    </div>
    
    <div id="auto-scan-instructions" class="scan-instructions">
      <p>The QR code will be scanned automatically. Please wait...</p>
      <button class="scan-button" onclick="window.location.href='/movies'">
        Proceed to Scan
      </button>
    </div>
    
    <div id="camera-instructions" class="scan-instructions">
      <div id="camera-container" style="width: 100%; height: 300px; background: black; margin: 10px 0;"></div>
      <p>Point your camera at the QR code to scan it</p>
      <button class="scan-button secondary" onclick="stopCameraScan()">
        Cancel Scan
      </button>
    </div>
    
    <div id="scanned-content"></div>
  `;
}
exports.scanOptions = scanOptions;
//# sourceMappingURL=scan-options.js.map