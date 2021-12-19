const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/pokemon");

const pokemonSchema = new mongoose.Schema({
  name: String,
  type: String,
  img: String,
  display: Boolean,
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = { Pokemon, mongoose };
