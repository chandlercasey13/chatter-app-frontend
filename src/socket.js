import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

const URL = "https://chatter-messenger-app-server-07eacc0c4ebf.herokuapp.com"
console.log(process.env.NODE_ENV)

export const socket = io(URL);
