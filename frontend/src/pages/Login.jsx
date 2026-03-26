import { useState } from "react";
import Input from "../components/Input";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { loginUser } from "../api/auth";
import { setAccessToken } from "../utils/token";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login, user } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const res = await loginUser({ email, password });
            const loggedInUser = res.data.user;
            login(loggedInUser, res.data.accessToken);
            setAccessToken(res.data.accessToken);
            toast.success("Login successful");
            navigate("/home");
        }
        catch (error) {
            toast.error("Failed to login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600 font-inter">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">ChatFlow</h1>
                <p className="text-center text-gray-500 mb-6">Login to your account</p>
                <form action={handleSubmit} className="space-y-3">
                    <Input label={"Email"} placeholder={"Email"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail />} />
                    <Input label={"Password"} placeholder={"Password"} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock />} rightIcon={showPassword ? <EyeOff /> : <Eye />} onRightIconClick={() => setShowPassword(!showPassword)} />
                    <div className="text-right">
                        <Link to={'/forgot-password'} className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 cursor-pointer transition">Login</button>
                </form>

                <p className="text-sm mt-4 text-center">Don't have an account?{" "}<Link to={'/register'} className="text-blue-600 hover:underline font-medium">Register</Link></p>
            </div>
        </div>
    )
}