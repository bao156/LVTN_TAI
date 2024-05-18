import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import anonAvartar from "../assets/anon-avatar.png";
import {
  deleteFavoritePostsByPostId,
  saveFavoritePost,
} from "../services/favoritePost";
import icons from "../ultils/icons";
import HeartButton from "./HeartButton";
import {
  savePostReservation,
  getPostsReservationByPostAndUserId,
} from "../services/postReservation";
import { useState } from "react";

const { GoDotFill, FaPhoneAlt, SiZalo } = icons;
const UserInfor = ({ userData, onLikeToggle, userId, postId }) => {
  const { posts } = useSelector((state) => state.post);
  const [isDisable, setIsDisable] = useState(false);
  const handleLikeToggle = async (postId, updatedLiked) => {
    onLikeToggle(postId, updatedLiked); // Update the like status in the UI
    if (updatedLiked) {
      saveFavoritePost({
        userId: userId,
        postId: postId,
      });
    } else {
      deleteFavoritePostsByPostId(postId);
    }
  };

  const handleBooking = async (userId, postId) => {
    savePostReservation({ userId, postId, isApproved: false });
    setIsDisable(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (posts[0]?.id && userId) {
        const response = await getPostsReservationByPostAndUserId({
          userId: userId,
          postId: posts[0].id,
        });
        if (response) {
          if (response.isApproved === 1) setIsDisable(true);
          else setIsDisable(false);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4">
      <img
        src={anonAvartar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium- text-xl">{userData?.name}</h3>
      <span className="flex items-center g-2">
        <GoDotFill color="green" />
        <span>Đang hoạt động</span>
      </span>
      <a
        className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg"
        href="/"
      >
        <FaPhoneAlt />
        {userData?.phone}
      </a>
      <a
        className="bg-white py-2 flex items-center justify-center gap-1 w-full rounded-md text-black font-bold text-lg"
        href={`https://zalo.me/${userData?.zalo}`}
      >
        <SiZalo size="30" color="blue" />
      </a>

      <div className="post-list">
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="post" style={{ textAlign: "center" }}>
              <HeartButton
                postId={post.id}
                initialLiked={post.isLiked}
                onLikeToggle={handleLikeToggle}
              />
            </div>
          ))}
        <button
          style={{
            fontWeight: 600,
            color: isDisable ? "gray" : "mediumblue",
            borderRadius: "5px",
            backgroundColor: isDisable ? "darkgray" : "cornsilk",
            padding: "10px 35px",
          }}
          disabled={isDisable}
          onClick={() => {
            handleBooking(userId, posts[0].id);
          }}
        >
          {!isDisable ? "Reservation" : "Reserved"}
        </button>
      </div>
    </div>
  );
};

export default memo(UserInfor);
