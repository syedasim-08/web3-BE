"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const art_1 = __importDefault(require("./routes/art"));
// import fileUploadRouter from "./routes/upload-file.js";
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
console.log("env", process.env.MONGODB_URI);
//db connection
main().catch((err) => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB URI not defined");
        }
        yield mongoose_1.default.connect(uri);
        console.log("database connected");
    });
}
console.log("Allowed Origin:", process.env.FRONTEND_URL);
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://openocean-nft.vercel.app",
];
const corsOptions = {
    origin: allowedOrigins.filter((origin) => typeof origin != undefined)
};
server.use((0, cors_1.default)(corsOptions));
//bodyParser
server.use(express_1.default.json());
server.use((0, morgan_1.default)("default"));
server.use("/api/v1/arts", art_1.default);
// server.use("/api/v1/file-upload", fileUploadRouter);
server.listen(process.env.PORT, () => {
    console.log("server started");
});
