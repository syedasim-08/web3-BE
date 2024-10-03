import { Router } from 'express';
import multer from 'multer';

import {
  UploadFile,
} from "../controller/file-upload";

const router =Router();

const upload = multer(); 


router.post("/", upload.single('file'), UploadFile);

// router
//   .post("/", UploadFile)

export default router
