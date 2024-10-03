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
exports.getArt = exports.getAllArts = exports.createArt = void 0;
const artModal_1 = __importDefault(require("../modal/artModal"));
const createArt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const art = new artModal_1.default(req.body);
        console.log("art", art);
        const { name, minting, price, imgUrl } = art;
        // Validate the data
        if (!name || !minting || !price || !imgUrl) {
            res.status(400).json({ error: "All fields are required" });
        }
        yield art.save();
        res.status(201).json(art);
    }
    catch (err) {
        console.log(err);
        const errorMessage = err.message || "An unexpected error occurred";
        res.status(500).json(errorMessage);
    }
});
exports.createArt = createArt;
const getAllArts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const art = yield artModal_1.default.find(); // Retrieve all art entries
        res.json(art); // Return the list of art objects
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching arts" });
    }
});
exports.getAllArts = getAllArts;
// export const getAllArts = async (req: Request, res: Response): Promise<Response>  => {
//   const art = await ArtModel.find();
//   return res.json(art);
// };
// export const getArt = async (req: Request, res: Response): Promise<Response>  => {
//   const id = req.params.id;
//   const art = await ArtModel.findById(id);
//   if (art) {
//     return res.json(art);
//   } else {
//     return res.status(404).json({ message: "Art not found" });
//   }
// };
const getArt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // Get the ID from request params
        const art = yield artModal_1.default.findById(id); // Find art by ID
        if (art) {
            res.json(art); // Return the found art object
        }
        else {
            res.status(404).json({ message: "Art not found" }); // Return a 404 if art not found
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching the art" });
    }
});
exports.getArt = getArt;
