const express = require("express");
const router = express.Router();

const { todo } = require("../controllers/controllers");
router.post("/todo", todo);

const { getTodos } = require("../controllers/controllers");
router.get("/get", getTodos);

const { getDelete } = require("../controllers/controllers");
router.delete("/delete/:id", getDelete);

// const { getEdit } = require("../controllers/controllers");
// router.put("/edit/:id", getEdit);

const { findida } = require("../controllers/controllers");
router.patch("/path/:id", findida);

const { getupdated } = require("../controllers/controllers");
router.put("/update/:id", getupdated);

module.exports = router;
