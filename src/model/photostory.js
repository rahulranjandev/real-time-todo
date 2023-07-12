import mongoose from 'mongoose';

const PhotoStorySchema = mongoose.Schema({
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  caption: {
    type: String,
    required: true,
  },
});

const PhotoStory = mongoose.model('PhotoStory', PhotoStorySchema);

export default PhotoStory;
