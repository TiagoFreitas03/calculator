import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useCalculator } from '../contexts/CalculatorContext'
import { KEYS } from '../constants/KEYS'
import { Expression } from '../components/Expression'
import { Entry } from '../components/Entry'
import { Keyboard } from '../components/Keyboard'
import { History } from '../components/History'
import { IconButton } from '../components/IconButton'

export function Calculator() {
	const { handleKeyPress } = useCalculator()

	const [isHistoryVisible, setIsHistoryVisible] = useState(false)

	window.onkeydown = (event) => {
		const { key } = event

		if (KEYS.includes(key)) {
			event.preventDefault()
			handleKeyPress(key)
		}
	}

	return (
		<>
			<header className="text-right px-2 mb-2 border-b border-zinc-800">
				<Expression />

				<Entry />

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
						onClick={() => handleKeyPress('Backspace')}
					/>
				</div>
			</header>

			<div className='w-80 h-[400px] relative'>
				<Keyboard />

				<History visible={isHistoryVisible} />
			</div>
		</>
	)
}
