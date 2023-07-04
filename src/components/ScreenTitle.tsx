import { Link } from "react-router-dom"

interface ScreenTitleProps {
	navigateTo?: string
	title: string
}

export function ScreenTitle({ title, navigateTo = '/menu' }: ScreenTitleProps) {
	return (
		<div className='flex justify-between items-center mb-2'>
			<Link to={navigateTo}>
				<i className='fas fa-arrow-left' />
			</Link>

			<h1 className='text-2xl text-blue-400'>
				{title}
			</h1>

			<span className="fas fa-star text-black" />
		</div>
	)
}
