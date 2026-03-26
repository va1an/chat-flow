import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../api/auth";
import Input from "../components/Input";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const { data } = await forgotPassword(email);
            toast.success("Reset linkt sent");
            console.log(data.resetLink);
            navigate("/")
        }
        catch (error) {
            toast.error("Failed to sent reset link");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600 font-inter">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">ChatFlow</h1>
                <p className="text-center text-gray-500 mb-6">Enter email to sent reset link</p>
                <form action={handleSubmit} className="space-y-3">
                    <Input label={"Email"} placeholder={"Email"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail />} />
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 cursor-pointer transition">Send Reset Link</button>
                </form>

                <p className="text-sm mt-4 text-center">Back to{" "}<Link to={'/'} className="text-blue-600 hover:underline font-medium">Login</Link></p>
            </div>
        </div>
    )
}