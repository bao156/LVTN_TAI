import React from "react";

const CommentSection = ({ content, dateTime, nameOfUser }) => {
  return (
    <div style={{ borderTop: "1px solid black" }}>
      <h3>{nameOfUser}</h3>
      <p style={{ fontStyle: "italic", color: "gray" }}>{dateTime}</p>
      <p>{content}</p>
    </div>
  );
};

export default CommentSection;
