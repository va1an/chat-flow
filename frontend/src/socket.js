import { io } from "socket.io-client";

const URL = "https://chat-flow-k5cn.onrender.com";

export const socket = io(URL, {
    withCredentials: true,
    autoConnect: false
})