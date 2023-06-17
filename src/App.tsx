import { useState } from "react"

import './global.css'
import { Keyboard } from "./components/Keyboard"
import { Operators, calc } from "./utils/operations"
import { TEXT_KEYS, KEYS, OPERATIONS } from './utils/keys'

export function App() {
	const [operator, setOperator] = useState<Operators>('')
	const [value, setValue] = useState(0)
	const [result, setResult] = useState('0')
	const [clear, setClear] = useState(true)

	window.onkeydown = (event) => {
		const { key } = event

		if (!KEYS.includes(key))
			return

		event.preventDefault()

		handleKeyClick(key)
	}

	function handleKeyClick(key: string) {
		if (TEXT_KEYS.includes(key))
			return append(key)

		if (key === 'Backspace' || key === 'del')
			return deleteNumber()

		if (OPERATIONS.includes(key))
			return changeOperation(key as any)

		if (['Enter', '='].includes(key))
			return calculate()

		if (key.toLowerCase() === 'c' || key === 'Escape')
			return clearResult()

		if (key === '%')
			return percentage()

		if (key === '+/-')
			reverseSignal()
	}

	const append = (key: string) => {
		let res = clear ? '' : result

		if (res.length >= 12)
			return

		if (key === '.') {
			setClear(false)

			if (!res.split('').includes('.'))
				setResult(res === '' ? '0.' : res + key)

			return
		}

		if (clear || res === '0') {
			setClear(false)
			return setResult(key)
		}

		setResult(res + key)
	}

	const deleteNumber = () => {
		if (result.length === 1 || (result.length === 2 && result.includes('-')))
			setResult('0')
		else if (result !== '0')
			setResult(result.slice(0, -1))
	}

	const changeOperation = (op: Operators) => {
		if (operator !== '') {
			const r = calculate()
			setValue(r)
		} else if (result !== '0')
			setValue(Number(result))

		setResult('0')
		setOperator(op)
	}

	const calculate = () => {
		const res = calc(value, operator, result)

		setResult(res.toString())
		setOperator('')
		setValue(0)
		setClear(true)
		return res
	}

	const clearResult = () => {
		if (result !== '0')
			return setResult('0')

		setOperator('')
		setValue(0)
	}

	const reverseSignal = () => {
		if (result !== '0') {
			if (!result.includes('-'))
				setResult(`-${result}`)
			else
				setResult(result.replace('-', ''))
		}
	}

	const percentage = () => {
		const num = Number(result)

		if (!isNaN(num)) {
			setResult((num * 0.01).toString())
		}
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="m-4 p-5 rounded-sm bg-black max-w-[328px]">
				<header className="text-right pt-4 pb-2 px-3 mb-2 border-b border-gray-800">
					<span className="h-4 mb-4 text-lg">
						{operator === '' ? '' : value + ' ' + operator}
					</span>

					<span className="text-4xl">
						{result}
					</span>
				</header>

				<Keyboard onKeyClick={(key) => handleKeyClick(key)} />
			</div>
		</div>
	)
}
