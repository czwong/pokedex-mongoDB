const router = require("express").Router();
const controller = require("./controller");

router.route("/pokemon").get(controller.getAll).post(controller.addPokemon);
router.route("/pokemon/type/:type").get(controller.getType);
router.route("/pokemon/id/:_id").post(controller.postID);

module.exports = router;
