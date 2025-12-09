var express = require('express');
var router = express.Router();

// Temporary home route
router.get('/', (req, res) => {
  res.send({ message: "API is working" });
});

module.exports = router;
