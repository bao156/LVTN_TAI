import axiosConfig from "../axiosConfig"; // Assuming axiosConfig is properly defined

export const savePostReservation = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/postReservation/add",
        data: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(new Error("Failed to save favorite post: " + error.message));
    }
  });

export const getPostsReservations = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/postReservation/get-by-status`,
        data: status,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getPostsReservationByPostId = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `/api/v1/postReservation/get-by-post-id/${payload.postId}`;
      console.log(url);
      const response = await axiosConfig({
        method: "get",
        url: url,
      });
      resolve(response.data);
    } catch (error) {
      reject(new Error("Failed to save favorite post: " + error.message));
    }
  });

export const deleteFavoritePostsByPostId = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/postReservation/delete/${payload.postId}/${payload.userId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
