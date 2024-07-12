const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;


const create = async function (userMessage) {
    try {
        const res = await fetch(`${BACKEND_URL}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userMessage),
        });
        return res.json();
      } catch (error) {
        console.log(error);
      }

    



}



export {create}