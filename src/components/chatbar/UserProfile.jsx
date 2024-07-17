import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      <button  className="w-full flex flex-start">{user.username}</button>
    </div>
  );
};

export default UserProfile;
