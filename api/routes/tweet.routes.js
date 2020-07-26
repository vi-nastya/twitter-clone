module.exports = (app) => {
  const tweets = require("../controllers/tweet.controller.js");

  var router = require("express").Router();

  // create a new Tweet
  router.post("/", tweets.create);

  // retrieve all
  router.get("/", tweets.findAll);

  // retrieve a single tweet with id
  router.get("/:id", tweets.findOne);

  // update by id
  router.put("/:id", tweets.update);

  // delete
  router.delete("/:id", tweets.delete);

  app.use("/api/tweets", router);
};
