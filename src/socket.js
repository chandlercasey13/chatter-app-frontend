import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://chatter-application-f0e5633242b6.herokuapp.com'
console.log(process.env.NODE_ENV)

export const socket = io(URL);
