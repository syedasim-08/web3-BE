  import { Router } from 'express';

  import {
    createArt,
    getAllArts,
    getArt,
  } from "../controller/art";

const router =Router();

router
  .post("/", createArt)
  .get("/", getAllArts)
  .get("/:id", getArt)

  



export default router
