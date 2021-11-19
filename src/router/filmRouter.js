const filmRouter = require("../core/routerConfig");
const filmController = require("../controller/filmController");
// connect route to controller
filmRouter.route("/films").get(filmController.fetchMovies);

filmRouter.route("/films/all").get(filmController.getAllMoviesFromApi);

module.exports = filmRouter;
