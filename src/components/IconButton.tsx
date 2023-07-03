import { ButtonHTMLAttributes } from "react"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string
}

export function IconButton({ icon, ...rest }: IconButtonProps) {
	return (
		<button
			className="w-8 h-8 outline-none hover:text-blue-300 text-blue-100"
			{ ...rest }
		>
			<i className={`fas fa-${icon}`} />
		</button>
	)
}
