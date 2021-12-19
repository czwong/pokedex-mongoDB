const PokemonDB = require("./db").Pokemon;
const mongoose = require("./db").mongoose;
const PokemonList = require("../../pokemon.json");

const save = (list) => {
  let len = list.length;
  let count = 0;
  list.forEach((pokemon) => {
    PokemonDB.create(
      {
        name: pokemon.name,
        type: pokemon.type,
        img: pokemon.img,
        display: false,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          count++;
          console.log(`${pokemon.name} added to database`);
          if (count === len) {
            mongoose.connection.close();
          }
        }
      }
    );
  });
};

save(PokemonList);
