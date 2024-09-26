
import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import artRouter from './routes/art.js';
import fileUploadRouter from './routes/upload-file.js';
const server = express();

console.log('env',process.env.MONGODB_URI)

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('database connected')
}


//bodyParser
server.use(express.json());
server.use(morgan('default'));
server.use('/api/v1/arts',artRouter);
server.use('/api/v1/file-upload',fileUploadRouter);

server.listen(process.env.PORT, () => {
  console.log('server started');
});
