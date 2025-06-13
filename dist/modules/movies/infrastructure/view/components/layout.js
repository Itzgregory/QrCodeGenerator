"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieLayout = void 0;
function movieLayout(content) {
    return `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8fafc;
            padding: 24px;
            color: #1e293b;
          }
          .dashboard-container {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            width: 70%;
            margin: 0 auto;
            border: 1px solid #e2e8f0;
          }
          .dashboard-header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 24px 32px;
            border-bottom: 1px solid #e2e8f0;
          }
          .dashboard-header h1 {
            margin: 0;
            font-size: 1.875rem;
            font-weight: 700;
            letter-spacing: -0.025em;
          }
          .dashboard-header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 0.875rem;
          }
          .table-container {
            padding: 0;
            overflow-x: auto;
            border-top: 1px solid #e2e8f0;
          }
          .dashboard-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin: 0;
            background-color: white;
          }
          .dashboard-table th {
            background-color: #f8fafc;
            color: #374151;
            font-weight: 600;
            font-size: 0.875rem;
            padding: 16px 24px;
            text-align: left;
            border-bottom: 2px solid #e5e7eb;
            border-right: 1px solid #e5e7eb;
            position: sticky;
            top: 0;
            z-index: 10;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .dashboard-table th:last-child {
            border-right: none;
          }
          .dashboard-table td {
            padding: 16px 24px;
            border-bottom: 1px solid #f1f5f9;
            border-right: 1px solid #f1f5f9;
            vertical-align: middle;
            font-size: 0.875rem;
          }
          .dashboard-table td:last-child {
            border-right: none;
          }
          .dashboard-table tbody tr {
            transition: background-color 0.15s ease;
          }
          .dashboard-table tbody tr:hover {
            background-color: #f8fafc;
          }
          .dashboard-table tbody tr:nth-child(even) {
            background-color: #fafbfc;
          }
          .dashboard-table tbody tr:nth-child(even):hover {
            background-color: #f1f5f9;
          }
          .movie-poster {
            width: 50px;
            height: 75px;
            object-fit: cover;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            border: 1px solid #e2e8f0;
            display: block;
            background-color: #f8fafc;
          }
          .movie-poster.error {
            background-color: #fee2e2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #991b1b;
            text-align: center;
          }
          .sn-column {
            width: 60px;
            text-align: center;
            font-weight: 600;
            color: #64748b;
          }
          .poster-column {
            width: 80px;
            text-align: center;
          }
          .movie-title {
            font-weight: 500;
            color: #1e293b;
            line-height: 1.4;
          }
          .table-stats {
            padding: 16px 32px;
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            font-size: 0.875rem;
            color: #64748b;
            text-align: right;
          }
          @media (max-width: 768px) {
            body {
              padding: 16px;
            }
            .dashboard-header {
              padding: 20px 24px;
            }
            .dashboard-header h1 {
              font-size: 1.5rem;
            }
            .dashboard-table th,
            .dashboard-table td {
              padding: 12px 16px;
            }
            .movie-poster {
              width: 40px;
              height: 60px;
            }
          }
        </style>
      </head>
      <body>
        <div class="dashboard-container">
          ${content}
        </div>
      </body>
    </html>
  `;
}
exports.movieLayout = movieLayout;
//# sourceMappingURL=layout.js.map