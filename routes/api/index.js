const express = require("express");
const userRoute = require("./controllers/user.js");
const thoughtRoute = require("./controllers/thoughts.js");

const router = express.Router();

router.use("./routes/api/user.js", userRoute);
router.use("./routes/api/thoughts.js", thoughtRoute);

module.exports = router;