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

const create = async function (participant, user) {
  try {
    console.log(participant, user)
    const res = await fetch(`${BACKEND_URL}/chatlogs/new/${participant._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participants: [participant, user],
      }),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async function (chatId, messageId) {
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

    const response = res.json()


    return response;
  } catch (error) {
    console.log(error);
  }
};

// const getMostRecentUserChat = async function (userId) {
//   try {
//     const res = await fetch(`${BACKEND_URL}/chatlogs/user/${userId}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });



//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };





const getChatMessages = async function (chatId) {
  try {
    const res = await fetch(`${BACKEND_URL}/chatlogs/${chatId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
   return
  }
}




export { chatLogIndex, getUser, create, update, getUserChats, getChatMessages };
