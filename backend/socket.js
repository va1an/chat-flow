import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "https://chat-flow-ruddy.vercel.app",
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected");

        socket.on("join", (userId) => {
            socket.join(userId);
        });

        // socket.on("sendMessage", (data) => {
        //     io.to(data.receiverId).emit(
        //         "receiveMessage",
        //         data
        //     );
        // });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    })
}

export const getIO = () => io;