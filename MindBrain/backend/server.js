import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

// ─── Route Imports ────────────────────────────────────────────────────────────
import publicProjectRoutes  from './routes/publicProjectRoutes.js';
import adminProjectRoutes   from './routes/adminProjectRoutes.js';
import userRoutes           from './routes/userRoutes.js';
import adminUserRoutes      from './routes/adminUserRoutes.js';
import profileRoutes        from './routes/profileRoutes.js';
import contactRoutes        from './routes/contactRoutes.js';
import adminContactRoutes   from './routes/adminContactRoutes.js';
import adminCareerRoutes    from './routes/adminCareerRoutes.js';
import careerRoutes         from './routes/careerRoutes.js';
import userInfoRoutes       from './routes/userInfoRoutes.js';

// ─── Configuration ────────────────────────────────────────────────────────────
dotenv.config();

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultAllowedOrigins = [
  'https://mindbrain.co.in',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

const envAllowedOrigins = (process.env.CORS_ORIGINS ?? process.env.FRONTEND_URL ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];
const isLocalDevOrigin = (origin) => {
  try {
    const parsedOrigin = new URL(origin);
    return ['localhost', '127.0.0.1'].includes(parsedOrigin.hostname);
  } catch {
    return false;
  }
};

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ─── Core Middleware ──────────────────────────────────────────────────────────
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Public Routes ────────────────────────────────────────────────────────────
app.use('/projects', publicProjectRoutes);    // GET /projects, GET /projects/:id
app.use('/users', userRoutes);               // POST /users/register, POST /users/login
app.use('/users-info', userInfoRoutes);      // POST /users-info/add
app.use('/me', profileRoutes);              // GET /me  (logged-in user profile)
app.use('/contacts', contactRoutes);         // POST /contacts (with rate limiting)
app.use('/careers', careerRoutes);           // POST /careers
app.use('/api/projects', publicProjectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users-info', userInfoRoutes);
app.use('/api/me', profileRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/careers', careerRoutes);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
// app.use('/admin/projects', adminProjectRoutes);  // POST/PUT/DELETE /admin/projects
// app.use('/admin/users', adminUserRoutes);         // GET/POST/PUT/DELETE /admin/users
// app.use('/admin/contacts', adminContactRoutes);   // GET/PUT/DELETE /admin/contacts
// app.use('/admin/careers', adminCareerRoutes);     // GET/DELETE /admin/careers
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/contacts', adminContactRoutes);
app.use('/api/admin/careers', adminCareerRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🧠 MindBrain API is running',
    version: '1.0.0',
    endpoints: {
      public: [
        'GET  /projects',
        'GET  /projects/:id',
        'POST /users/register',
        'POST /users/login',
        'POST /users/logout',
        'POST /users-info/add',
        'GET  /me',
        'POST /contacts',
        'POST /careers',
      ],
      admin: [
        'POST   /admin/projects',
        'PUT    /admin/projects/:id',
        'DELETE /admin/projects/:id',
        'GET    /admin/users',
        'POST   /admin/users',
        'PUT    /admin/users/:id',
        'DELETE /admin/users/:id',
        'GET    /admin/contacts',
        'PUT    /admin/contacts/:id/read',
        'DELETE /admin/contacts/:id',
        'GET    /admin/careers',
        'GET    /admin/careers/:id/resume',
        'DELETE /admin/careers/:id',
      ],
    },
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
