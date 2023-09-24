import React from "react";
import "./ImageRoom.scss";

const ImageRoom = (props) => {
  const { data } = props;
  if (!(data || data?.activePicId)) return null;
  return (
    <div className="ImageRoom">
      <img
        src={`https://api.pbk-perm.ru/images/${data.activePicId}.jpg`}
        alt=""
      />
    </div>
  );
};

export default ImageRoom;
