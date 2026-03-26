import { useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../components/Input";
import { Eye, EyeOff, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { resetPassword } from "../api/auth";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const { token } = useParams();

    async function handleSubmit() {
        try {
            if (password !== confirmPassword) {
                return toast.error("New password and confirm password did not match");
            }

            await resetPassword(token, password);
            toast.success("Password reset successful");
            navigate("/");
        }
        catch (error) {
            toast.error("Failed to reset password");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600 font-inter">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">ChatFlow</h1>
                <p className="text-center text-gray-500 mb-6">Enter new password to reset your password</p>
                <form action={handleSubmit} className="space-y-3">
                    <Input type={showPassword ? "text" : "password"} label={"New Password"} placeholder={"New Password"} value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock />} rightIcon={showPassword ? <EyeOff /> : <Eye />} onRightIconClick={() => setShowPassword(!showPassword)} />
                    <Input type={showConfirmPassword ? "text" : "password"} label={"Confirm New Password"} placeholder={"Confirm New Password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} icon={<Lock />} rightIcon={showConfirmPassword ? <EyeOff /> : <Eye />} onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 cursor-pointer transition">Reset Password</button>
                </form>

                <p className="text-sm mt-4 text-center">Back to{" "}<Link to={'/'} className="text-blue-600 hover:underline font-medium">Login</Link></p>
            </div>
        </div>
    )
}