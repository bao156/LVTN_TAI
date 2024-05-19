// HeartButton.js
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { getFavoritePostsByUserAndPostId } from "../services/favoritePost";
import { useSelector } from "react-redux";
const HeartButton = ({ postId, onLikeToggle }) => {
  // Initialize liked status from local storage or use initial value
  const { currentData } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = currentData.id;
      if (postId && userId) {
        const favoritePostResponse = await getFavoritePostsByUserAndPostId(
          userId,
          postId
        );
        console.log(favoritePostResponse?.data);
        if (favoritePostResponse?.data?.id) {
          setLiked(true);
        }
      }
    };
    fetchData();
  }, [postId, currentData.id]);

  const handleLikeToggle = () => {
    // Toggle liked status
    const updatedLiked = !liked;
    setLiked(updatedLiked);

    // Send postId and updated like status to parent component
    onLikeToggle(postId, updatedLiked);
  };

  return (
    <button className="heart-button" onClick={handleLikeToggle}>
      <FaHeart color={liked ? "red" : "white"} />
    </button>
  );
};

export default HeartButton;
