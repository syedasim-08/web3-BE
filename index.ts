import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import artRouter from "./routes/art";
import fileUploadRouter from "./routes/upload-file";
import cors from "cors";
const server = express();

console.log("env", process.env.MONGODB_URI);

//db connection
main().catch((err) => console.log(err));

async function main() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB URI not defined");
  }

  await mongoose.connect(uri);
  console.log("database connected");
}

console.log("Allowed Origin:", process.env.FRONTEND_URL);

const allowedOrigins:(string | undefined)[] = [
  process.env.FRONTEND_URL,
  "https://openocean-nft.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins.filter((origin): origin is string => typeof origin != undefined)
};

server.use(cors(corsOptions));

//bodyParser
server.use(express.json());
server.use(morgan("default"));
server.use("/api/v1/arts", artRouter);
server.use("/api/v1/file-upload", fileUploadRouter);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
