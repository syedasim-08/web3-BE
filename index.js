
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
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  next();
});

// Define allowed origins
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://openocean-nft.vercel.app/art"
];

// CORS options
const corsOptions = {
    origin: (origin, callback) => {
      console.log('Incoming Origin:', origin); // Log the incoming origin
        // Allow requests with no origin (like Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
  
};

// Use CORS middleware with the specified options
server.use(cors(corsOptions));


//bodyParser
server.use(express.json());
server.use(morgan('default'));
server.use('/api/v1/arts',artRouter);
server.use('/api/v1/file-upload',fileUploadRouter);

server.listen(process.env.PORT, () => {
  console.log('server started');
});
