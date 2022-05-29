import { Router } from "express";

const router = Router();

import PhotoStory from "./../controller/photostory.js";

import upload from "./../utlis/upload.js";

router.route("/").get(PhotoStory.list).post(upload.any(), PhotoStory.uploads);

export default router;
