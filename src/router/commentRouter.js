const commentRouter = require("../core/routerConfig");
const commentController = require("../controller/commentController");
// connect route to controller
commentRouter.route("/comments").post(commentController.addComment);

commentRouter.route("/comments/:movieId").get(commentController.getComments);
module.exports = commentRouter;
