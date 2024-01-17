import { FormEvent, useState } from "react"

import { BMIResult } from "../components/BMIResult"
import { CalculateButton } from '../components/CalculateButton'
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
		if (bmi) {
			setBmi(undefined)
		}

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

		return Number((Number(weight) / (nHeight * nHeight)).toFixed(1))
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
						onChangeText={text => handleParamChange(text)}
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
						onChangeText={text => handleParamChange(text)}
						onClick={() => handleParamClick('h')}
						cssClasses={activeParam === 'h' ? 'text-blue-300' : ''}
					/>

					<span className="text-right text-sm -mt-2">Centímetros</span>
				</div>

				<CalculateButton />
			</form>

			<div className='w-80 h-[280px] relative mt-2'>
				{
					bmi ?
						<BMIResult value={bmi} /> :
						<Keyboard
							layout="COMMON"
							text={activeParam === 'w' ? weight : height}
							onChangeText={text => handleParamChange(text)}
							disabledKeys={['+-']}
						/>
				}
			</div>
		</>
	)
}
