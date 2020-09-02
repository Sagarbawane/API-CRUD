const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

const userCltr = require("../app/controllers/userControllers");

router.post("/api/register", userCltr.register);
router.post("/api/login", userCltr.login);
router.get("/api/accounts", userCltr.accounts);
router.get("/api/showUser/:id", authenticate, userCltr.showUser);
router.put("/api/update/:id", authenticate, userCltr.update);
router.delete("/api/distroy/:id", authenticate, userCltr.distroy);

module.exports = router;
