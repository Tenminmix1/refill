// Cors Options for cross origin from browser requests and Cookies 
export const corsOptions = {
  origin: process.env.CORS_HOST?.replace(' ', '').split(','),
  credentials: true,
  optionsSuccessStatus: 204 // for IE support, not only 201
}
