import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response,RequestHandler } from "express";

const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucket = process.env.BUCKET_NAME;

if (!region || !accessKeyId || !secretAccessKey || !bucket) {
  throw new Error("Missing AWS credentials");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function uploadFileToS3(file : Buffer, fileName:string) {
  const fileBuffer = file;

  const params = {
    Bucket: bucket,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/*",
  };

  const command = new PutObjectCommand(params);
  const response = await s3Client.send(command);

  const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;

  return { fileName, response,url };
}


// export async function UploadFile(request,response) {
//     try {

//       const formData = await request.formData();
//       const fileEntry = formData.get("file");
  
//         console.log("file", fileEntry)
//       // Check if the file entry is an instance of File
  
//       // Validate file entry
//       if (!fileEntry) {
//         return response.json({ error: "File is required" }, { status: 400 });
//       }
  
//       const file = fileEntry 
//       const buffer = Buffer.from(await file.arrayBuffer());
  
//       const fileName = await uploadFileToS3(buffer, file.name);
  
//       return response.json({ success: true, fileName });
//     } catch (error) {
//       console.error("Upload Error:", error); // Log error details
  
//       return response.json({ error: "Error uploading file" });
//     }
//   }
  

export const UploadFile: RequestHandler =async (request, response) => {
    try {
      const file = request.file; // Access the uploaded file
  
  
      // Validate file entry
      if (!file) {
      response.status(400).json({ error: "File is required" });
      return 
      }
  
      // Get the buffer from the file
      const buffer = file.buffer;
  
      // Upload the file to S3
      const fileName = await uploadFileToS3(buffer, file.originalname);
  
       response.json({ success: true, fileName });
    } catch (error) {
      console.error("Upload Error:", error);
       response.status(500).json({ error: "Error uploading file" });
    }
  };