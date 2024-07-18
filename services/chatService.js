const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = async (foundUserId) => {
  try {

    const res = await fetch(`${BACKEND_URL}/profiles/${foundUserId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const chatLogIndex = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/chatlogs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async function (participants) {
  try {
    const res = await fetch(`${BACKEND_URL}/chatlogs/new/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participants: participants,
      }),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async function (chatId, messageId) {
  console.log('chat Id', chatId);
  try {
    const res = await fetch(`${BACKEND_URL}/chatlogs/${chatId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageId: messageId }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const getUserChats = async function (userId) {
  try {
    const res = await fetch(`${BACKEND_URL}/chatlogs/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getChatMessages = async function (chatId) {
  try {
    const res = await fetch(`${BACKEND_URL}/chatlogs/${chatId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
}




export { chatLogIndex, getUser, create, update, getUserChats, getChatMessages };
