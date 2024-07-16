import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      <div>{user.username}</div>
    </div>
  );
};

export default UserProfile;
