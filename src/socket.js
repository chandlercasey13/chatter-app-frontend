import { io } from "socket.io-client";


const URL = "https://chatter-messenger-app-server-07eacc0c4ebf.herokuapp.com"


export const socket = io(URL);
