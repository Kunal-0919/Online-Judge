const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("AlgoChef server");
  } catch (error) {
    console.log("Error on /: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
