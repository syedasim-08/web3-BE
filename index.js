
import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import artRouter from './routes/art.js';
import fileUploadRouter from './routes/upload-file.js';
import cors from 'cors'
const server = express();

console.log('env',process.env.MONGODB_URI)

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('database connected')
}

console.log('Allowed Origin:', process.env.FRONTEND_URL);
server.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // Or specific origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

// Define allowed origins
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://openocean-nft.vercel.app/art"
];

const corsOptions = {
  origin: (origin, callback) => {
      console.log('Incoming Origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

server.use(cors(corsOptions));



//bodyParser
server.use(express.json());
server.use(morgan('default'));
server.use('/api/v1/arts',artRouter);
server.use('/api/v1/file-upload',fileUploadRouter);

server.listen(process.env.PORT, () => {
  console.log('server started');
});
