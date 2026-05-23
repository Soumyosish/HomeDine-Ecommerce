const express = require("express");
const router = express.Router();
const {
  submitForm,
  subscribeNewsletter,
} = require("../controllers/contactController");

router.post("/", submitForm);
router.post("/subscribe", subscribeNewsletter);

module.exports = router;
