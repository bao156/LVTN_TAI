// favoritePostService.js

import db from "../models"; // Import database models

const PostReservation = db.PostReservation;

// Function to add a post to favorites
export const addPostReservation = async (userId, postId, isApproved) => {
  try {
    let isApprovedValue = false;
    if (isApproved) {
      isApprovedValue = isApproved;
    }
    // Check if the post already exists in favorites
    const existingPostReservation = await PostReservation.findOne({
      where: { userId, postId },
    });
    // If the post does not exist in favorites, add it
    if (!existingPostReservation) {
      await PostReservation.create({ userId, postId, isApproved: false });
      return { success: true, message: "Post Reservaion added" };
    } else if (isApprovedValue != existingPostReservation.isApproved) {
      await PostReservation.update(
        { userId, postId, isApproved: isApprovedValue },
        {
          where: { userId, postId },
        }
      );
      return { success: true, message: "Update Post Reservaion successfully" };
    } else {
      return { success: true, message: "Post Reservaion is available" };
    }
  } catch (error) {
    console.error("Error adding post to favorites:", error);
    throw new Error("Error adding post to favorites");
  }
};

export const getPostReservationsByStatus = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      let postReservations = !status
        ? await PostReservation.findAll({
            raw: true,
            nest: true,
            include: [
              {
                model: db.User,
                as: "user",
                attributes: ["id", "name", "zalo", "phone"],
              },
              {
                model: db.Post,
                as: "post",
                attributes: ["id", "title", "star", "address", "description"],
              },
            ],
            attributes: ["isApproved"],
          })
        : await PostReservation.findAll({
            where: { isApproved: status },
            raw: true,
            nest: true,
            include: [
              {
                model: db.User,
                as: "user",
                attributes: ["id", "name", "zalo", "phone"],
              },
              {
                model: db.Post,
                as: "post",
                attributes: ["id", "title", "star", "address", "description"],
              },
            ],
            attributes: ["isApproved"],
          });
      resolve(postReservations); // Resolve with the array of favorite posts
    } catch (error) {
      console.error("Error getting favorite posts:", error);
      reject("Error getting favorite posts");
    }
  });

export const getPostReservationsByPostIdAndUserId = (postId, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      let postReservations = await PostReservation.findOne({
        where: { postId: postId, userId: userId },
        raw: true,
        nest: true,
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "name", "zalo", "phone"],
          },
          {
            model: db.Post,
            as: "post",
            attributes: ["id", "title", "star"],
          },
        ],
        attributes: ["isApproved"],
      });
      resolve(postReservations); // Resolve with the array of favorite posts
    } catch (error) {
      console.error("Error getting favorite posts:", error);
      reject("Error getting favorite posts");
    }
  });

export const deletePostReservation = (postId,userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await PostReservation.destroy({
        where: { postId: postId, userId: userId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "Deleting favorite posts is failed.",
      });
    } catch (error) {
      reject(error);
    }
  });
