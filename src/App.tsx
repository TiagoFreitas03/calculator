import { useState } from "react"
import { Textfit } from 'react-textfit'

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

		if (key === 'Backspace')
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
			<div className="m-4 p-5 max-w-[296px] rounded-lg bg-gray-500">
				<header>
					<span className="h-[16px] mb-1">
						{operator === '' ? '' : value + ' ' + operator}
					</span>

					<Textfit className="font-bold text-2xl">
						{result}
					</Textfit>
				</header>

				<Keyboard onKeyClick={(key) => handleKeyClick(key)} />
			</div>
		</div>
	)
}
