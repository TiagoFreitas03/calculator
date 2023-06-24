import clsx from 'clsx'

import { Keyboard } from './components/Keyboard'
import { KEYS, OPERATIONS } from './constants/KEYS'
import { useCalculator } from './hooks/Calculator'
import { maskNumber, maskExpression } from "./utils/masks"

export function App() {
	const { entry, expression, handleKeyPress } = useCalculator()

	const maskedExpression = maskExpression(expression.slice())
	const maskedEntry = maskNumber(entry)
	const entryLength = maskedEntry.length

	window.onkeydown = (event) => {
		const { key } = event

		if (KEYS.includes(key)) {
			event.preventDefault()
			handleKeyPress(key)
		}
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="m-4 p-5 rounded-sm bg-black max-w-[330px] border border-gray-700">
				<header className="text-right px-2 mb-2 border-b border-gray-800">
					<div className='flex items-center justify-end h-8 mb-2 text-lg'>
						{
							maskedExpression.map((element, index) => {
								return OPERATIONS.includes(element) ?
									<i
										key={element + index}
										className={clsx('fas text-sm ml-2 text-blue-300', {
											'fa-plus': element === '+',
											'fa-minus': element === '-',
											'fa-xmark': element === '*',
											'fa-divide': element === '/'
										})}
									/> :
									<span key={element+index} className="ml-2 text-gray-500">
										{element}
									</span>
							})
						}
					</div>

					<span
						className={clsx("my-1 h-12 flex items-center justify-end", {
							"text-4xl": entryLength <= 14,
							"text-3xl": entryLength > 14 && entryLength <= 17,
							"text-2xl": entryLength > 17 && entryLength <= 20,
							"text-xl": entryLength > 20
						})}
					>
						{maskedEntry}
					</span>
				</header>

				<Keyboard onKeyClick={(key) => handleKeyClick(key)} />
			</div>
		</div>
	)
}
