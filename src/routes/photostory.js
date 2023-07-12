import { Router } from 'express';

const router = Router();

import PhotoStory from './../controller/photostory.js';

import upload from '../utils/upload.js';

router.route('/').get(PhotoStory.list).post(upload.any(), PhotoStory.newPhotoStory);

export default router;
