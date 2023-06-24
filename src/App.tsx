import { useState } from 'react'
import clsx from 'clsx'

import { Keyboard } from './components/Keyboard'
import { KEYS, TEXT_KEYS, OPERATIONS } from './utils/keys'
import { addOperator, append, erase, percent, reverseSignal, calculate } from './utils/operations'
import { maskNumber, maskExpression } from "./utils/masks"

export function App() {
	const [entry, setEntry] = useState('0')
	const [expression, setExpression] = useState<string[]>([])
	const [clearEntry, setClearEntry] = useState(false)

	const maskedExpression = maskExpression(expression.slice())
	const maskedEntry = maskNumber(entry)
	const entryLength = maskedEntry.length

	window.onkeydown = (event) => {
		const { key } = event

		if (KEYS.includes(key)) {
			event.preventDefault()
			handleKeyClick(key)
		}
	}

	function handleKeyClick(key: string) {
		if (TEXT_KEYS.includes(key)) {
			setEntry(append(clearEntry ? '' : entry, key))
			setClearEntry(false)
		}
		else if (key.toLowerCase() === 'c' || key === 'Escape') {
			setExpression([])
			setEntry('0')
		}
		else if (key === 'Backspace') {
			setEntry(erase(entry))
		}
		else if (key === '%') {
			setEntry(percent(entry))
		}
		else if (key.toLowerCase() === 'r') {
			setEntry(reverseSignal(entry))
		}
		else if (OPERATIONS.includes(key)) {
			const aux = addOperator(expression.slice(), entry, key, clearEntry)
			setEntry(aux.entry)
			setExpression(aux.expression.slice())
			setClearEntry(true)
		}
		else if (['Enter', '='].includes(key) && expression.length === 2) {
			setEntry(calculate(expression.concat(entry).slice()))
			setExpression([])
			setClearEntry(true)
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
