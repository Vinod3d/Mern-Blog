const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Comment = require("../modals/Comment");

const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        CustomError.UnauthorizedError(
          "You are not allowed to create this comment"
        )
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(StatusCodes.OK).json(comments);
  } catch (error) {
    next(error);
  }
};

const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(CustomError.NotFoundError("Comment not found"));
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(StatusCodes.OK).json(comment);
  } catch (error) {
    next(error);
  }
};

const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(CustomError.NotFoundError("Comment not found"));
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        CustomError.AuthorizationError(
          "You do not have permission to perform this action"
        )
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json(editedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(CustomError.NotFoundError("Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        CustomError.AuthorizationError(
          "You are not authorized to perform this action"
        )
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(StatusCodes.OK).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  if (!req.user.isAdmin){

      return next(
       new CustomError.UnauthorizedError("You are not allowed to get all comments")
      );
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(StatusCodes.OK).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getComments,
};
