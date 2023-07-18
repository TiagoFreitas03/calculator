import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCalculator } from '../contexts/CalculatorContext'
import { useKeyboard } from '../hooks/useKeyboard'
import { Expression } from '../components/Expression'
import { Entry } from '../components/Entry'
import { Keyboard } from '../components/Keyboard'
import { History } from '../components/History'
import { IconButton } from '../components/IconButton'
import { OPERATIONS } from '../constants/KEYS'
import { addOperator, calculate } from '../utils/operations'

export function Calculator() {
	const { handleKeyPress } = useKeyboard()
	const { addToHistory } = useCalculator()

	const [entry, setEntry] = useState('0')
	const [expression, setExpression] = useState<string[]>([])
	const [clearEntry, setClearEntry] = useState(false)
	const [isHistoryVisible, setIsHistoryVisible] = useState(false)

	function handleEntryChange(text: string) {
		setEntry(text)
		setClearEntry(false)

		if (expression.length > 3) {
			setExpression([])
		}
	}

	function handleButtonPress(key: string) {
		if (OPERATIONS.includes(key)) {
			try {
				const aux = addOperator(expression.slice(), entry, key, clearEntry)

				if (aux.calculated) {
					addToHistory(expression.concat([entry, '=']).slice(), aux.entry)
				}

				setEntry(aux.entry)
				setExpression(aux.expression.slice())
				setClearEntry(true)
			}
			catch (err: any) {
				alert(err.message)
			}
		}
		else if (key === '=' || key === 'Enter') {
			if (expression.length < 2 || !OPERATIONS.includes(expression[1])) {
				return
			}

			const aux = expression.slice()
			aux.push(Number(entry).toString())

			if (aux.length > 3) {
				aux[0] = entry
				aux.splice(3, aux.length - 3)
			}

			try {
				const result = calculate(aux)
				aux.push('=')

				setEntry(result)
				setExpression(aux)
				setClearEntry(true)
				addToHistory(aux.slice(), result)
			} catch (err: any) {
				alert(err.message)
			}
		}
		else if (key === 'Escape') {
			setEntry('0')
			setExpression([])
		}
	}

	return (
		<>
			<header className="text-right px-2 mb-2 border-b border-zinc-800">
				<Expression value={expression.slice()} />

				<Entry
					text={entry}
					clear={clearEntry}
					onTextChange={text => handleEntryChange(text)}
					onKeyClick={key => handleButtonPress(key)}
				/>

				<div className='flex justify-between py-3'>
					<div>
						<IconButton
							icon={!isHistoryVisible ? 'clock-rotate-left' : 'calculator'}
							title={!isHistoryVisible ? 'Histórico' : 'Teclado'}
							onClick={() => setIsHistoryVisible(!isHistoryVisible)}
						/>

						<Link to='/menu'>
							<IconButton icon='ellipsis' title='Menu' />
						</Link>
					</div>

					<IconButton
						icon='delete-left'
						title='Apagar'
						onClick={() => setEntry(handleKeyPress(entry, 'Backspace'))}
					/>
				</div>
			</header>

			<div className='w-80 h-[400px] relative'>
				<Keyboard
					layout='CALCULATOR'
					entry={entry}
					clear={clearEntry}
					onChangeEntry={text => handleEntryChange(text)}
					onButtonClick={(key) => handleButtonPress(key)}
				/>

				<History
					visible={isHistoryVisible}
					onSelect={(exp, res) => {
						setExpression(exp)
						setEntry(res)
					}}
				/>
			</div>
		</>
	)
}
