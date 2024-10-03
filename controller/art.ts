import { Request, Response } from "express";
import ArtModel from "../modal/artModal";

export const createArt = async (req: Request, res: Response):Promise<void>  => {
  try {
    const art = new ArtModel(req.body);
    console.log("art", art);
    const { name, minting, price, imgUrl } = art;
    // Validate the data
    if (!name || !minting || !price || !imgUrl) {
       res.status(400).json({ error: "All fields are required" });
    }

    await art.save();
     res.status(201).json(art);
  } catch (err) {
    console.log(err);
    const errorMessage = (err as Error).message || "An unexpected error occurred"
     res.status(500).json(errorMessage);
  }
};

export const getAllArts = async (req: Request, res: Response): Promise<void> => {
  try {
    const art = await ArtModel.find();  // Retrieve all art entries
     res.json(art);  // Return the list of art objects
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching arts" });
  }
};

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

export const getArt = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;  // Get the ID from request params
    const art = await ArtModel.findById(id);  // Find art by ID

    if (art) {
       res.json(art);  // Return the found art object
    } else {
       res.status(404).json({ message: "Art not found" });  // Return a 404 if art not found
    }
  } catch (err) {
    console.error(err);
     res.status(500).json({ error: "An error occurred while fetching the art" });
  }
};