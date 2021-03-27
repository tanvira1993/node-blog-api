const Post = require("../models/Post");

exports.post = (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Plase fill all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.comment = (req, res, next) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.post_id,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.status(200).json(result);
      }
    });
};

voteOperation = async (post_id, user_id) => {
  const up = await Post.findByIdAndUpdate(
    post_id,
    {
      $pull: { upvotes: user_id },
    },
    {
      new: true,
    }
  ).exec();
  const down = await Post.findByIdAndUpdate(
    post_id,
    {
      $pull: { downvotes: user_id },
    },
    {
      new: true,
    }
  ).exec();
};

exports.upvote = async (req, res, next) => {
  try {
    await voteOperation(req.body.post_id, req.user._id);
    Post.findByIdAndUpdate(
      req.body.post_id,
      {
        $push: { upvotes: req.user._id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    return res.status(422).json({ error: "Please, Try later!" });
  }
};

exports.downvote = async (req, res, next) => {
  try {
    await voteOperation(req.body.post_id, req.user._id);
    Post.findByIdAndUpdate(
      req.body.post_id,
      {
        $push: { downvotes: req.user._id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    return res.status(422).json({ error: "Please, Try later!" });
  }
};

exports.posts = (req, res, next) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {
      return res.status(200).json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
};
