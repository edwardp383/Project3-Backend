const mongoose = require('mongoose');


const animeSchema = new mongoose.Schema({
  title: String,
  img: String,
  synopsis: String,
  episodes: Array,
  episodesWatched: Array,
  notes: String
});


const Anime = mongoose.model('Anime', animeSchema)

module.exports = Anime;