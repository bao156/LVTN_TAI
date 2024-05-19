// favoritePostRoutes.js

import express from "express";
import * as postReservationController from "../controllers/postReservation"; // Import favorite post controller
import verifyToken from "../middlewares/verifyToken"; // Import middleware for token verification

const router = express.Router();

// Routes for favorite post
// router.use(verifyToken); // Apply token verification middleware to all routes below

router.post("/add", postReservationController.addPostReservationController);
router.get(
  "/get-by-status",
  postReservationController.getPostReservationByStatusController
);
router.get(
  "/get-by-post-id/:postId",
  postReservationController.getPostReservationByPostID
);
router.delete('/delete/:postId/:userId', postReservationController.deletePostReservationByPostIdAndUserId);

export default router;
