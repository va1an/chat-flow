import { X } from "lucide-react";
import { getAllUsers, logoutUser } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


export default function Sidebar({ selectedUser, setSelectedUser, openSidebar, setOpenSidebar }) {
    const [users, setUsers] = useState([]);
    const { logout, user } = useAuth();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await getAllUsers();
                setUsers(res.data);
            }
            catch (error) {
                toast.error("Failed to fetch users");
            }
        }
        fetchUsers();
    }, []);

    async function handleLogout() {
        try {
            await logoutUser();
            toast.success("Logout successful");
            logout();
        }
        catch (error) {
            toast.error("Failed to logout")
        }
    }


    return (
        <div className={`bg-white w-72 border-r h-full fixed md:relative z-20 ${openSidebar ? "left-0" : "-left-72"} md:left-0 transition-all font-inter flex flex-col`}>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">ChatFlow</h2>

                <button className="md:hidden" onClick={() => setOpenSidebar(false)}><X /></button>
            </div>

            <div className="overflow-y-auto flex-1">
                {users.filter((u) => String(u._id) !== String(user._id)).map((u) => (
                    <div key={u._id} onClick={() => { setSelectedUser(u); setOpenSidebar(false) }} className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${selectedUser?._id === u._id ? "bg-gray-200" : ""}`}>
                        <img src={u.avatar} className="w-10 h-10 rounded-full" />
                        <p>{u.name}</p>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 cursor-pointer w-full text-white py-2 rounded">Logout</button>
            </div>
        </div>
    )
}