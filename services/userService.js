const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = JSON.parse(atob(token.split(".")[1]));

  return user;
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    // Save token in localStorage
    localStorage.setItem("token", json.token);

    // Return user data decoded from the token
    return JSON.parse(atob(json.token.split(".")[1]));  // Return just the user object
  } catch (err) {
    throw new Error(err);
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }
    if (json.token) {
      // Save token in localStorage
      localStorage.setItem("token", json.token);

      // Return the user data from the token
      const user = JSON.parse(atob(json.token.split(".")[1]));
      
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const signout = () => {
  localStorage.removeItem("token");
};


const createUserPicture = async function (userId,formData) {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     
      },
      body: formData,
    });

    
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getUserPicture = async function (userId,imageKey) {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}/images/${imageKey}`, {
      method: "GET",
     
      
    });

    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.log(error);
  }
};






export { signup, signin, getUser, signout, createUserPicture, getUserPicture };
