import { useState } from "react";
import Input from "../components/Input";
import { Mail, Eye, EyeOff, Lock, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    async function handleSubmit() {
        try {
            if (password !== confirmPassword) {
                return toast.error("Password and confirm password did not match");
            }

            const res = await registerUser({ name, email, password, avatar });
            login(res.data.user, res.data.accessToken);
            toast.success("User register successful");
            navigate('/home');
        }
        catch (error) {
            toast.error("Failed to signup");
        }
    }

    const avatars = [
        "/avatars/a1.png",
        "/avatars/a2.png",
        "/avatars/a3.png",
        "/avatars/a4.png",
        "/avatars/a5.png",
        "/avatars/a6.png"
    ]

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600 font-inter">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">ChatFlow</h1>
                <p className="text-center text-gray-500 mb-6">Register an account</p>
                <form action={handleSubmit} className="space-y-3">
                    <Input label={"Name"} placeholder={"Name"} value={name} onChange={(e) => setName(e.target.value)} icon={<User2 />} />
                    <Input label={"Email"} placeholder={"Email"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail />} />
                    <Input label={"Password"} placeholder={"Password"} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock />} rightIcon={showPassword ? <EyeOff /> : <Eye />} onRightIconClick={() => setShowPassword(!showPassword)} />
                    <Input label={"Confirm Password"} placeholder={"Confirm Password"} type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={<Lock />} rightIcon={showConfirmPassword ? <EyeOff /> : <Eye />} onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)} />

                    <div>
                        <p className="text-sm font-medium mb-2">Choose Avatar</p>
                        <div className="grid grid-cols-6 gap-2">
                            {avatars.map((img) => (
                                <img key={img} src={img} onClick={() => setAvatar(img)} className={`w-10 h-10 rounded-full cursor-pointer border-2 ${avatar === img ? "border-blue-500" : "border-transparent"}`} />
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 cursor-pointer transition">Register</button>
                </form>

                <p className="text-sm mt-4 text-center">Already have an account?{" "}<Link to={'/'} className="text-blue-600 hover:underline font-medium">Login</Link></p>
            </div>
        </div>
    )
}