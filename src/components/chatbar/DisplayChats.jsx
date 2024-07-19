import React, { useState, useEffect } from "react";

const Sidebar = ({ user }) => {
  const [ displayChats, setDisplayChats ] = useState([]);

  useEffect(() => {
    getUserChats();
  }, []);

const getUserChats = async () => {
try {
const response = await fetch('/chatlogs/user');
if(!response.ok) {
    throw new Error('Failed to get chats')
}
const data = await response.json()
setDisplayChats(data);
} catch (error) {
    console.log(error)
}}


return (
    <div>
        <h2>ChitChats</h2>
        <ul>
            {displayChats.map((displayChat, index)=>
            
            <li key={displayChat._id}>
                {displayChat.participants.find(userId => userId !== user) && (
                    <div>
                        {displayChat.participants.find(userId => userId !== user)}
                    </div>
                )}
            </li>
            )}
        </ul>
    </div>
) 
}

export default Sidebar;

