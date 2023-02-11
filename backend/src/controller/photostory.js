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

export default { list, uploads };
