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
  getPostsReservationByPostId,
} from "../services/postReservation";
import { useState } from "react";

const RESERVED_TEXT = "Reserved";
const RESERVATION_TEXT = "Reservation";
const WAITTING_FOR_APPROVAL_TEXT = "Waiting For Approval";
const OUT_OF_STOCK_TEXT = "Out of Stock";
const { GoDotFill, FaPhoneAlt, SiZalo } = icons;
const UserInfor = ({ userData, onLikeToggle, userId, postId }) => {
  const { posts } = useSelector((state) => state.post);
  const [content, setContent] = useState();
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
    setContent(WAITTING_FOR_APPROVAL_TEXT);
  };
  const isBookedAble = content === RESERVATION_TEXT;
  useEffect(() => {
    const fetchData = async () => {
      if (postId && userId) {
        const response = await getPostsReservationByPostId({
          postId: postId,
        });
        if (response?.isApproved === 1) {
          if (userId === response?.user?.id) {
            setContent(RESERVED_TEXT);
          } else {
            setContent(OUT_OF_STOCK_TEXT);
          }
        } else {
          if (userId === response?.user?.id) {
            setContent(WAITTING_FOR_APPROVAL_TEXT);
          } else {
            setContent(RESERVATION_TEXT);
          }
        }
      }
    };
    fetchData();
  }, [userId, postId]);

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
                onLikeToggle={handleLikeToggle}
              />
            </div>
          ))}
        <button
          style={{
            fontWeight: 600,
            color: isBookedAble ? "mediumblue" : "gray",
            borderRadius: "5px",
            backgroundColor: isBookedAble ? "cornsilk" : "darkgray",
            padding: "10px 35px",
          }}
          disabled={!isBookedAble}
          onClick={() => {
            handleBooking(userId, posts[0].id);
          }}
        >
          {content}
        </button>
      </div>
    </div>
  );
};

export default memo(UserInfor);
