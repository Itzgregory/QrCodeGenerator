# QR Code Generator

A Nest.js and React application generating QR codes linking to 10 random movies, with SSE for QR code updates and Prisma for PostgreSQL caching.

## Setup
1. **Install Dependencies**:
   - Server: ` yarn install`
2. **Database**:
   - Set up PostgreSQL and update `server/.env` with `DATABASE_URL`.
   - `yarn prisma generate --schema=./src/prisma/schema.prisma`
   - Run `yarn prisma migrate dev --schema=./src/prisma/schema.prisma`.
3. **Run**:
   - Server: `yarn dev`
4. **Access**:
   - QR Code: `http://localhost:3000/qr`
   - Movies: Scan QR or visit `http://localhost:3000/movies`

## Deployment
- **Server**: Deploy to Vercel. Set `DATABASE_URL` and `PORT` in env variables.
- **Repo**: 
- **Live URLs**: 