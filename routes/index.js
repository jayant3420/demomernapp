const express = require("express");
const router = express.Router();
const BlogPostModel = require("../models/blogpost");

router.get("/", (req, res) => {
  BlogPostModel.find()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/save", (req, res) => {
  const newBlogPost = new BlogPostModel(req.body);
  newBlogPost
    .save()
    .then((response) => {
      console.log("data saved");
      res.json({
        status: 200,
        msg: "data saved successfully"
      });
    })
    .catch((error) => {
      console.log("data not saved", error);
    });
});

router.get("/name", (req, res) => {
  // const newBlogPost = new BlogPostModel(data);
  // newBlogPost.save((error) => {
  //   if (error) {
  //     console.log("There is an error in database");
  //   } else {
  //     console.log("Data saved successfully");
  //     res.json({
  //       status: 200,
  //       message: "Data saved successfully"
  //     });
  //   }
  // });
  res.json({
    msg: "url -> /name"
  });
});

module.exports = router;
