import { Link } from "react-router-dom"

import { ScreenProps } from "../interfaces/ScreenProps"

export function Layout({ children, title, navigateTo = '/menu' }: ScreenProps) {
	window.onkeydown = () => {}

	return (
		<>
			<header className="flex justify-between items-center mb-4">
				<Link to={navigateTo}>
					<i className="fas fa-arrow-left" />
				</Link>

				<h1 className="text-xl text-blue-400">
					{title}
				</h1>

				<span className="fas fa-star text-black" />
			</header>

			{children}
		</>
	)
}
