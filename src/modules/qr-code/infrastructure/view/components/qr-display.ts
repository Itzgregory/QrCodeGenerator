export function qrDisplay(qrCode: string) {
  return `
    <img src="https://www.datocms-assets.com/157185/1742475381-passport.jpeg" 
         alt="Profile" 
         class="profile-img"/>
    <div class="name">Generated QR codes</div>
    <div class="description">Scan code to view movie reccomendations</div>
    <img id="qr-code" src="${qrCode}" alt="QR Code" class="qr-code"/>
    
    <div class="scan-options">
      <button class="scan-button" onclick="document.getElementById('auto-scan-instructions').style.display='block'">
        Scan Automatically
      </button>
    </div>
    
    <div id="auto-scan-instructions" class="scan-instructions">
      <p>The QR code will be scanned automatically. Please wait...</p>
      <button class="scan-button" onclick="window.location.href='/movies'">
        Proceed to Scan
      </button>
    </div>
    
    <script>
      const eventSource = new EventSource('/qr/stream');
      eventSource.onmessage = (event) => {
        document.getElementById('qr-code').src = event.data;
      };
    </script>
  `;
}