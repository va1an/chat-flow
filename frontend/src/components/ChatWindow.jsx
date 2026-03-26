import { Menu } from "lucide-react";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { socket } from "../socket";
import { useAuth } from "../contexts/AuthContext";

export default function ChatWindow({ selectedUser, setOpenSidebar }) {
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        if (!selectedUser) return;

        setMessages([]);
        setConversation(null);

        async function getConversation() {
            const res = await api.get(`/messages/conversation/${selectedUser._id}`);
            setConversation(res.data);
        }

        getConversation();
    }, [selectedUser]);

    useEffect(() => {
        if (!conversation) return;

        async function getMessages() {
            const res = await api.get(`/messages/${conversation._id}`);
            setMessages(res.data);
        }
        getMessages();
    }, [conversation]);

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg])
        });

        return () => {
            socket.off("receiveMessage");
        }
    }, []);

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center font-inter">
                Select user to chat
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col font-inter">

            <div className="bg-white p-4 border-b flex items-center gap-3">
                <button className="md:hidden" onClick={() => setOpenSidebar(true)}><Menu /></button>
                <img src={selectedUser.avatar} className="w-10 h-10 rounded-full" />
                <h3 className="font-semibold">{selectedUser.name}</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((m) => {
                    const myId = user?._id;
                    const isMe = String(m.sender) === String(myId);

                    return (
                        <div key={m._id} className={`p-2 rounded w-fit ${isMe ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"}`}>
                            {m.text}
                        </div>
                    )
                })}

            </div>
            <MessageInput selectedUser={selectedUser} />
        </div>
    )

}