"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const art_1 = require("../controller/art");
const router = (0, express_1.Router)();
router
    .post("/", art_1.createArt)
    .get("/", art_1.getAllArts)
    .get("/:id", art_1.getArt);
exports.default = router;
