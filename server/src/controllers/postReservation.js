// favoritePostController.js

import * as services from "../services/postReservation";

// Controller function to add a post to favorites
export const addPostReservationController = async (req, res) => {
  const { userId, postId, isApproved } = req.body;
  try {
    const result = await services.addPostReservation(
      userId,
      postId,
      isApproved
    );
    res.json(result);
  } catch (error) {
    console.error("Error adding post reservation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get favorite posts by userId
export const getPostReservationByStatusController = async (req, res) => {
  try {
    const { isApproved } = req.body; // Get userId from request parameters
    // Call service function to get favorite posts by userId
    const posts = await services.getPostReservationsByStatus(isApproved);
    return res.status(200).json(posts); // Return favorite posts
  } catch (error) {
    console.error("Error gettingpost reservation by status:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to get post reservation by status.",
    });
  }
};

// Controller function to get favorite posts by userId
export const getPostReservationByPostID = async (req, res) => {
  try {
    const { postId } = req.params; // Get userId from request parameters
    // Call service function to get favorite posts by userId
    const postReservation = await services.getPostReservationsByPostId(postId);
    return res.status(200).json(postReservation); // Return favorite posts
  } catch (error) {
    console.error("Error getting favorite posts by userId:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to get favorite posts by userId.",
    });
  }
};

export const deletePostReservationByPostIdAndUserId = async (req, res) => {
  try {
    const { postId, userId } = req.params; // Get userId from request parameters
    // Call service function to get favorite posts by userId
    const favoritePosts = await services.deletePostReservation(postId, userId);
    return res.status(200).json(favoritePosts); // Return favorite posts
  } catch (error) {
    console.error("Error getting favorite posts by userId:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to get favorite posts by userId.",
    });
  }
};
