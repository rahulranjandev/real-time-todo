import { request, response } from 'express';
import { BlobServiceClient } from '@azure/storage-blob';
import PhotoStory from '../model/photostory.js';
import { AZURE_STORAGE_CONNECTION_STRING } from '../app.js';

/**
 * @param {request} req req1
 * @param {response} res
 */
const list = async (req, res) => {
  try {
    const photos = await PhotoStory.findOne();

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    const containerClient = blobServiceClient.getContainerClient('photos');

    let photosList = [];

    const photosPromises = photos.photos.map(async (photo) => {
      const blockBlobClient = containerClient.getBlockBlobClient(photo);

      const expire = new Date(new Date().getTime() + 1000 * 60 * 60);

      const url = await blockBlobClient.generateSasUrl({
        expiresOn: expire,
        permissions: 'r',
      });

      photosList.push(url);
    });

    await Promise.all(photosPromises);

    const data = {
      photos: photosList,
      caption: photos.caption,
    };

    res.json({
      status: 'list',
      // total,
      data: data,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }
};

/**
 * @param {request} req req1
 * @param {response} res
 */
const uploads = async (req, res) => {
  try {
    const updatedDoc = await PhotoStory.findOne();

    const files = req.files;

    let photos = [];

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    const containerClient = blobServiceClient.getContainerClient('photos');

    const uploadPromises = files.map(async (file) => {
      const data = file.buffer;

      const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
      const uploadBlobResponse = await blockBlobClient.upload(data, file.size);

      photos.push(file.originalname);
    });

    await Promise.all(uploadPromises);

    updatedDoc.photos = photos;
    await updatedDoc.save();

    res.status(200).json({
      status: true,
      data: updatedDoc,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }
};

const newPhotoStory = async (req, res) => {
  try {
    const files = req.files;
    const containerName = 'images';

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    await containerClient.createIfNotExists();

    const imageUrls = [];

    const uploadPromises = files.map(async (file) => {
      const blobName = file.originalname;

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(file.buffer, file.size);

      const url = blockBlobClient.url;

      imageUrls.push(url);
    });

    await Promise.all(uploadPromises);

    const payload = {
      caption: req.body.caption,
      user: res.locals.user.id,
      imageUrls: imageUrls,
    };

    const post = await this.postService.createPost(payload);

    res.status(201).json({
      status: 'success',
      data: post,
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
    console.error(err.message);
  }
};
export default { list, uploads, newPhotoStory };
