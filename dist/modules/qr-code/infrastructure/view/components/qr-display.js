"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrDisplay = void 0;
function qrDisplay(qrCode) {
    return `
    <img src="https://www.datocms-assets.com/157185/1742475381-passport.jpeg" 
         alt="Profile" 
         class="profile-img"/>
    <div class="name">Generated QR codes</div>
    <div class="description">Scan code to view movie recommendations</div>
    <img id="qr-code" src="${qrCode}" alt="QR Code" class="qr-code"/>
    
    <div class="scan-options">
      <button class="scan-button" onclick="document.getElementById('auto-scan-instructions').style.display='block'">
        Scan Automatically
      </button>
    </div>
    
    <div id="auto-scan-instructions" class="scan-instructions">
      <p>The QR code will be scanned automatically. Please wait...</p>
      <button class="scan-button" onclick="goToMovies()">
        Proceed to Movies
      </button>
      <div id="error-message" style="color: red; margin-top: 10px; display: none;"></div>
    </div>
    
    <script>
      // Handle QR code updates via SSE
      const eventSource = new EventSource('/qr/stream');
      eventSource.onmessage = (event) => {
        document.getElementById('qr-code').src = event.data;
      };
      
      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
      };

      // Function to navigate to movies with error handling
      async function goToMovies() {
        const errorDiv = document.getElementById('error-message');
        const button = event.target;
        
        // Show loading state
        button.textContent = 'Loading...';
        button.disabled = true;
        errorDiv.style.display = 'none';
        
        try {
          // Test the movies endpoint first
          const response = await fetch('/movies', {
            method: 'HEAD' // Just check if endpoint is available
          });
          
          if (response.ok || response.status === 404) {
            // Endpoint is reachable, navigate to it
            window.location.href = '/movies';
          } else {
            throw new Error(\`Server returned status: \${response.status}\`);
          }
        } catch (error) {
          console.error('Error accessing movies:', error);
          errorDiv.textContent = 'Error loading movies. Please try again.';
          errorDiv.style.display = 'block';
          button.textContent = 'Retry';
          button.disabled = false;
        }
      }
    </script>
  `;
}
exports.qrDisplay = qrDisplay;
//# sourceMappingURL=qr-display.js.map