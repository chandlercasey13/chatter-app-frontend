import React from "react";
import { VscSquirrel } from "react-icons/vsc";
import { useSelector } from "react";

const UserAvatar = ({ userId, username, width, height }) => {
  const onlineUser = ((state) => state?.user?.onlineUser);
  let userAvatarName = "";
  if (username) {
    const splitUserName = username?.split(" ");
    if (splitUserName.length > 1) {
      userAvatarName = splitUserName[0][0] + splitUserName[1][0];
    } else {
      userAvatarName = splitUserName[0][0];
    }
  }

  const isOnline = onlineUser(userId);

  const randomNumber = Math.floor(Math.random() * 7);

  const backgroundColor = [
    "bg-purple-200",
    "bg-grey-200",
    "bg-yellow-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-red-200",
    "bg-orange-200",
  ];

  return (
    <div
      className={`text-slate-600 rounded-full, font-bold relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {username ? (
        <div
          className={`flex overflow-hidden rounded-full fustify-center items-center text-md ${backgroundColor[randomNumber]}`}
          style={{ width: width + "px", height: height + "px" }}
        >
          {userAvatarName}
        </div>
      ) : (
        <VscSquirrel size={width} />
      )}
      {isOnline && (
        <div className="bg-green-500 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>
      )}
    </div>
  );
};

export default UserAvatar;
