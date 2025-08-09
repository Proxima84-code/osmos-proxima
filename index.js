import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';

dotenv.config();

const {
  WEBHOOK_URL,
  PORT = 3000,
} = process.env;

if (!WEBHOOK_URL) {
  console.error('❌ FATAL: Missing WEBHOOK_URL in .env');
  process.exit(1);
}

// ── Setup __dirname (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Setup logging (file + console)
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
);

const app = express();
app.use(morgan('combined', { stream: accessLogStream }));
