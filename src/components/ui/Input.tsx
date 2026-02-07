import * as React from "react"
import { cn } from "../../utils/cn"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string | boolean
    helperText?: string
    containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, helperText, containerClassName, disabled, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const isPassword = type === "password"
        const inputType = isPassword ? (showPassword ? "text" : "password") : type

        return (
            <div className={cn("w-full space-y-2", containerClassName)}>
                {label && (
                    <label
                        className={cn(
                            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                            error ? "text-red-500" : "text-gray-900",
                            disabled && "opacity-50 cursor-not-allowed text-gray-500"
                        )}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        type={inputType}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
                            error && "border-red-500 focus-visible:ring-red-500",
                            className
                        )}
                        ref={ref}
                        disabled={disabled}
                        {...props}
                    />
                    {isPassword && !disabled && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-4 w-4" />
                            ) : (
                                <EyeIcon className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                            </span>
                        </button>
                    )}
                </div>
                {(error && typeof error === 'string') && (
                    <p className="text-xs text-red-500">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-gray-500">{helperText}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
    )
}

export { Input }
