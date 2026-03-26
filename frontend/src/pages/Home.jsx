import { useAuth } from "../contexts/AuthContext"
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { socket } from "../socket";

export default function Home() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [openSidebar, setOpenSidebar] = useState(false);

    const { loading, user } = useAuth();

    useEffect(() => {
        socket.connect();

        socket.emit("join", user._id);

        return () => {
            socket.disconnect();
        }
    }, [user]);


    if (loading) return <p>Loading...</p>

    return (
        <div className="h-screen flex bg-gray-100">
            <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <ChatWindow selectedUser={selectedUser} setOpenSidebar={setOpenSidebar} />
        </div>
    )
}