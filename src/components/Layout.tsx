import { Link } from "react-router-dom"

interface LayoutProps {
	Screen: () => JSX.Element
	title: string
	navigateTo?: string
}

export function Layout({ Screen, title, navigateTo = '/menu' }: LayoutProps) {
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

			<Screen />
		</>
	)
}
