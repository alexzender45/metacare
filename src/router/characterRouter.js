const characterRouter = require("../core/routerConfig");
const characterController = require("../controller/characterController");
// connect route to controller
characterRouter
  .route("/characters/:movieId")
  .get(characterController.fetchCharactersInMovie);

characterRouter
  .route("/characters/character-search/:movieId")
  .get(characterController.fetchCharacterById);

module.exports = characterRouter;
