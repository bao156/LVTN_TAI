// HeartButton.js
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const HeartButton = ({ postId, initialLiked, onLikeToggle }) => {
  // Initialize liked status from local storage or use initial value
  const [liked, setLiked] = useState(initialLiked);

  // Update local storage when liked status changes
  useEffect(() => {
    localStorage.setItem(`liked_${postId}`, JSON.stringify(liked));
  }, [postId, liked]);

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
