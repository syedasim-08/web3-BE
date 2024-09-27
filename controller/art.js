import ArtModel from "../modal/artModal.js";

export const createArt = async(req,res) => {


  try{
    const art = new ArtModel(req.body)
    console.log("art",art)
    const { name, minting, price, imgUrl } = art;
    // Validate the data
    if (!name || !minting || !price || !imgUrl) {
      return res.status(400).json(
        { error: "All fields are required" },
      );
    }


    await art.save()
  return  res.status(201).json(art);



  }catch(err){
    console.log(err)
    return  res.json({error: err.message},{status : 500});

  }

  
};

export const getAllArts = async (req, res) => {
 let method= req.method
 let url= req.url
let   origin=req.headers.origin
console.log(method,url,origin)
    const art = await ArtModel.find();
  res.json(art);
};

export const getArt =async (req, res) => {
  const id = req.params.id;
  console.log("id",id)
  const art = await ArtModel.findById(id);
  console.log(art)
  if (art) {
   return res.json(art);
  } else {
    return res.status(404).json({ message: "Art not found" });
  }
};

