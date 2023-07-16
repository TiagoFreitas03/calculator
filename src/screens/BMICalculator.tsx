import { FormEvent, useState } from "react"

import { Input } from "../components/Input"
import { Button } from '../components/Button'
import { BMIResult } from "../components/BMIResult"

export function BMICalculator() {
	const [weight, setWeight] = useState('60')
	const [height, setHeight] = useState('170')
	const [bmi, setBmi] = useState(calculateBMI())

	function validateParam(value: string) {
		const num = Number(value)

		if (value === '' || isNaN(num) || !(/^([0-9]{1,3})(\.[0-9]{0,2})?$/).test(value)) {
			return false
		}

		return num > 0
	}

	function handleCalculateFormSubmit(e: FormEvent) {
		e.preventDefault()

		if (!validateParam(weight) || !validateParam(height)) {
			alert('Parâmetro(s) inválido(s)')
			return
		}

		setBmi(calculateBMI())
	}

	function calculateBMI() {
		const nHeight = Number(height) / 100

		return Number(weight) / (nHeight * nHeight)
	}

	return (
		<>
			<form onSubmit={handleCalculateFormSubmit}>
				<div className="pb-1 border-b border-zinc-800">
					<Input
						autoFocus
						label="Peso"
						type="number"
						step={0.01}
						value={weight}
						onChange={e => setWeight(e.target.value)}
						big
					/>

					<span className="text-right text-sm">Quilogramas</span>
				</div>

				<div className="mt-3 pb-1 border-b border-zinc-800">
					<Input
						label="Altura"
						type="number"
						step={0.01}
						value={height}
						onChange={e => setHeight(e.target.value)}
						big
					/>

					<span className="text-right text-sm">Centímetros</span>
				</div>

				<Button title="Calcular" type="submit" />
			</form>

			<BMIResult value={bmi} />
		</>
	)
}
