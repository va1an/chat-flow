import { io } from "socket.io-client";

const URL = "https://chat-flow-k5cn.onrender.com:8080";

export const socket = io(URL, {
    withCredentials: true,
    autoConnect: false
})