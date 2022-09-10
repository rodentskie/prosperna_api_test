## 📜 About

Prosperna Backend REST API Exam

## 💡 **[Prerequisites](#Prerequisites)**

- NodeJS (v16.15.0)
- Docker
- docker-compose

## ⚙️ **[How to run?](#How-to-run)**

First install the packages: `npm install`
Run the database container: `docker-compose up -d`

### Lint

`npm run lint`

### Test

In the `.env` file change `NODE_ENV=test`

Run: `npm run test`

---

### Development

`npm run dev`

### Production

Build first the application: `npm run build`

Then run: `npm start`

## 💡 **[Tech Stack](#Tech-stack)**

- NodeJS
- TypeScript
- MongoDB
- ExpressJS
