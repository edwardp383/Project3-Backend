const mongoose = require('mongoose');


const animeSchema = new mongoose.Schema({
  name: String,
  photo: String,
  description: String,
  episodes: Array,
  episodesWatched:[{
    type: Boolean,
    default: false
  }],
  notes: String
});


const Anime = mongoose.model('Anime', animeSchema)

module.exports = Anime;