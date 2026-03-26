import { useState } from "react"
import api from "../api/axios";
import { socket } from "../socket";

export default function MessageInput({ selectedUser }) {
    const [text, setText] = useState("");

    async function sendMessage() {
        if (!text) return;

        const res = await api.post("/messages", { receiverId: selectedUser._id, text });

        setText("");
    }

    return (
        <div className="p-3 bg-white border-t flex gap-2">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="flex-1 border rounded-lg px-3 py-2" placeholder="Type message..." />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-lg">Send</button>
        </div>
    )
}