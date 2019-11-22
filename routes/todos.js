const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

const Todo = require("../todoModel/todo");
app.use(bodyParser.json());

router.post("/todos", async (req, res, next) => {
  let todo = new Todo({
    content: req.body.content
  });
  todo
    .save()
    .then(() => {
      res.status(201).json({
        message: "New Todo was been posted"
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        error: error
      });
    });
});

router.delete("/todos/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted Todo"
      });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.get("/todos/:id", (req, res, next) => {
  Todo.findOne({
    _id: req.params.id
  })
    .then(Todo => {
      res.status(200).json(Todo);
    })
    .catch(error => {
      res.status(404).json({
        error
      });
    });
});

router.get("/todos", async (req, res) => {
  try {
    Todo.find().then(todos => {
      res.status(200).json(todos);
    });
  } catch (err) {
    res.status(400).json({
      error
    });
  }
});

module.exports = router;
