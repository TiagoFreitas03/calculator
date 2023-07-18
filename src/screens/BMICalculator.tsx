import { FormEvent, useState } from "react"

import { Button } from '../components/Button'
import { BMIResult } from "../components/BMIResult"
import { Entry } from "../components/Entry"
import { Keyboard } from "../components/Keyboard"

export function BMICalculator() {
	const [weight, setWeight] = useState('60')
	const [height, setHeight] = useState('170')
	const [activeParam, setActiveParam] = useState<'w' | 'h'>('w')
	const [bmi, setBmi] = useState<number>()
	const [clearWeight, setClearWeight] = useState(true)
	const [clearHeight, setClearHeight] = useState(true)

	function validateParam(value: string) {
		return !(isNaN(Number(value)) || !(/^([0-9]{1,3})(\.[0-9]{0,2})?$/).test(value))
	}

	function handleParamChange(value: string) {
		if (validateParam(value)) {
			if (activeParam === 'w') {
				setWeight(value)
				setClearWeight(false)
			}
			else {
				setHeight(value)
				setClearHeight(false)
			}
		}
	}

	function handleParamClick(param: 'w' | 'h') {
		setBmi(undefined)
		setActiveParam(param)
	}

	function handleCalculateFormSubmit(e: FormEvent) {
		e.preventDefault()
		const [w, h] = [Number(weight), Number(height)];

		if (!validateParam(weight) || !validateParam(height) || w <= 0 || h <= 0) {
			alert('Parâmetro(s) inválido(s)')
			return
		}

		setBmi(calculateBMI())
		setClearWeight(true)
		setClearHeight(true)
	}

	function calculateBMI() {
		const nHeight = Number(height) / 100

		return Number(weight) / (nHeight * nHeight)
	}

	return (
		<>
			<form onSubmit={handleCalculateFormSubmit}>
				<div className="pb-1 border-b border-zinc-800">
					<span className="absolute">Peso</span>

					<Entry
						clear={clearWeight}
						text={weight}
						active={activeParam === 'w'}
						onTextChange={text => handleParamChange(text)}
						onClick={() => handleParamClick('w')}
						cssClasses={activeParam === 'w' ? 'text-blue-300' : ''}
					/>

					<span className="text-right text-sm -mt-2">Quilogramas</span>
				</div>

				<div className="mt-4 pb-1 border-b border-zinc-800">
					<span className="absolute">Altura</span>

					<Entry
						clear={clearHeight}
						text={height}
						active={activeParam === 'h'}
						onTextChange={text => handleParamChange(text)}
						onClick={() => handleParamClick('h')}
						cssClasses={activeParam === 'h' ? 'text-blue-300' : ''}
					/>

					<span className="text-right text-sm -mt-2">Centímetros</span>
				</div>

				<Button title="Calcular" type="submit" />
			</form>

			<div className='w-80 h-[280px] relative mt-2'>
				{
					bmi ?
						<BMIResult value={bmi} /> :
						<Keyboard
							layout="COMMON"
							entry={activeParam === 'w' ? weight : height}
							onChangeEntry={text => handleParamChange(text)}
							disabledKeys={['+-']}
						/>
				}
			</div>
		</>
	)
}
