const PokemonModel = require("./db/db").Pokemon;

// module.exports = {
//   getAll: (req, res) => {
//     PokemonModel.find({}, (err, results) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.status(200).send(results);
//       }
//     });
//   },
//   getType: (req, res) => {
//     PokemonModel.find({ type: req.params.type }, (err, results) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.status(200).send(results);
//       }
//     });
//   },
//   postPokemon: (req, res) => {
//     let { name, type, img } = req.body;
//     PokemonModel.create({ name, type, img }, (err, results) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.status(200).send(results);
//       }
//     });
//   },
// };

module.exports = {
  getAll: (req, res) => {
    PokemonModel.find((err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
  getType: (req, res) => {
    PokemonModel.find({ type: req.params.type }).exec((err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
  postID: (req, res) => {
    if (req.body.type === "delete") {
      PokemonModel.deleteOne({ _id: req.params._id }).exec((err) => {
        if (err) {
          res.status(400).send(err);
        }
      });
    } else {
      PokemonModel.update({ _id: req.params._id }, req.body.data).exec(
        (err) => {
          if (err) {
            res.status(400).send(err);
          }
        }
      );
    }
  },
  addPokemon: (req, res) => {
    const { name, type, img } = req.body;
    PokemonModel.create({ name, type, img }, (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(`${req.body.name} inserted in pokedex!`);
      }
    });
  },
};
