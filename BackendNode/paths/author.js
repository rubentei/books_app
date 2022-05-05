const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { security } = require('../middleware/security');

const {
  createAuthor,
  getAuthorById,
  getAuthorsList,
  updateAuthor,
  deleteAuthor
} = require("../controllers/author");

router.route("/")
    .post(security, createAuthor)
    .get(security, getAuthorsList);

router.route("/:id")
    .get(security, getAuthorById)
    .put(security, updateAuthor)
    .delete(security, deleteAuthor);

module.exports = router;
