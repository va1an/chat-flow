export default function Input({ label, type = "text", value, placeholder, onChange, icon, rightIcon, onRightIconClick }) {
    return (
        <div className="space-y-1 font-inter">
            {label && (<label className="block text-sm font-medium mb-1">{label}</label>)}
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>
                <input type={type} value={value} placeholder={placeholder} onChange={onChange} className={`w-full border border-gray-300 outline-none rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 ${icon ? "pl-10" : ""} ${rightIcon ? "pr-10" : ""}`} />
                {rightIcon && (<button type="button" onClick={onRightIconClick} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</button>)}
            </div>
        </div>
    )
}