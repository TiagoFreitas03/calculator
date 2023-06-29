import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { useCalculator } from '../contexts/CalculatorContext'
import { KEYS } from '../constants/KEYS'
import { Expression } from '../components/Expression'
import { Entry } from '../components/Entry'
import { Keyboard } from '../components/Keyboard'
import { History } from '../components/History'

export function Calculator() {
	const { handleKeyPress } = useCalculator()

	const [activeKey, setActiveKey] = useState('')
	const [isHistoryVisible, setIsHistoryVisible] = useState(false)

	useEffect(() => {
		if (activeKey !== '') {
			setTimeout(() => {
				setActiveKey('')
			}, 100)
		}
	}, [activeKey])

	window.onkeydown = (event) => {
		const { key } = event

		if (KEYS.includes(key)) {
			event.preventDefault()
			handleKeyPress(key)
			setActiveKey(key)
		}
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="m-4 p-5 rounded-sm bg-black max-w-[362px] border border-zinc-700">
				<header className="text-right px-2 mb-2 border-b border-zinc-800">
					<Expression />

					<Entry />

					<div className='flex justify-between py-3 text-blue-100'>
						<i
							className={clsx('cursor-pointer hover:text-blue-300 fas', {
								'fa-clock-rotate-left': !isHistoryVisible,
								'fa-calculator': isHistoryVisible,
							})}
							title={isHistoryVisible ? 'Teclado' : 'Histórico'}
							onClick={() => setIsHistoryVisible(!isHistoryVisible)}
						/>

						<i
							className={clsx('cursor-pointer fas fa-delete-left hover:text-blue-300', {
								"text-blue-300": activeKey === 'Backspace'
							})}
							title='Apagar'
							onClick={() => handleKeyPress('Backspace')}
						/>
					</div>
				</header>

				<div className='w-80 h-[400px] relative'>
					<Keyboard activeKey={activeKey} />

					<History visible={isHistoryVisible} />
				</div>
			</div>
		</div>
	)
}
