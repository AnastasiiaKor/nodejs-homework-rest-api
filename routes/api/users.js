const express = require("express");
const {
  validateBody,
  authenticate,
  isValidUserId,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/:id/subscription",
  isValidUserId,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;