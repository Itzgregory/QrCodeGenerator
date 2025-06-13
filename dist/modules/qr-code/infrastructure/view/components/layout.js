"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = void 0;
function layout(content) {
    return `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #c1e1c1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #a3e4a3;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 90%;
          }
          .profile-img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
          }
          .name {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .description {
            font-size: 0.9em;
            color: #333;
            margin-bottom: 20px;
          }
          .qr-code {
            width: 200px;
            height: 200px;
            margin: 0 auto 20px;
            display: block;
          }
          .scan-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
          }
          .scan-button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            width: 100%;
            transition: background-color 0.3s;
          }
          .scan-button:hover {
            background-color: #45a049;
          }
          .scan-instructions {
            margin-top: 20px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 5px;
            display: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          ${content}
        </div>
      </body>
    </html>
  `;
}
exports.layout = layout;
//# sourceMappingURL=layout.js.map