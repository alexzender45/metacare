const _ = require("lodash");
const { throwError } = require("../utils/handleErrors");
const { Film, Comment } = require("../models");

class Comments {
  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  // Save comment to database
  async addComment() {
    const { commentable_id, commentable_type, comment, ip_address } = this.data;
    await Film.find({
      attributes: [
        "title",
        "opening_crawl",
        "episode_id",
        "release_date",
        "comment_count",
      ],
    }).then((obj) => {
      if (obj != null) {
        let check = false;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].episode_id === commentable_id) {
            check = true;
            break;
          }
        }
        let comm = {
          comment: comment,
          commentable_id: commentable_id,
          commentable_type: commentable_type,
          ip_address,
        };
        Comment.create(comm);
        let Allow = Film.findOne({ episode_id: comm.commentable_id });
        Film.findAndupdate(
          { comment_count: Allow.comment_count + 1 },
          { where: { episode_id: comm.commentable_id } }
        );
        return {
          status: true,
          message: "comment created successfully",
          data: null,
        };
      } else {
        throwError("Movie not found");
      }
    });
  }

  // Get comment for a movie
  async getComments() {
    const film = await Film.findOne({ where: { episode_id: this.data } });
    console.log(film);
    const comments = await Comment.find({
      where: { commentable_id: film.episode_id },
    });

    return comments;
  }
}

module.exports = Comments;
