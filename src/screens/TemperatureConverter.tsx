import { useEffect, useState } from "react"

import { Entry } from "../components/Entry"
import { Keyboard } from "../components/Keyboard"
import { Select } from "../components/Select"
import { Temperature, TemperatureScale } from "../types/TemperatureScale"
import { convertTemperature } from "../utils/convert-temperature"
import { Output } from "../components/Output"

const scales = Object.values(Temperature).filter(t => isNaN(Number(t))).map(String)

export function TemperatureConverter() {
	const [inputScale, setInputScale] = useState<TemperatureScale>('Celsius')
	const [outputScale, setOutputScale] = useState<TemperatureScale>('Fahrenheit')
	const [input, setInput] = useState('0')
	const [output, setOutput] = useState(convertTemperature({ input, inputScale, outputScale }))

	const inputSymbol = String(inputScale).substring(0, 1)
	const outputSymbol = String(outputScale).substring(0, 1)

	useEffect(() => {
		setOutput(convertTemperature({ input, inputScale, outputScale }))
	}, [input, inputScale, outputScale])

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select
						options={scales}
						value={inputScale}
						onChange={e => setInputScale(e.target.value as TemperatureScale)}
					/>

					<div className="flex justify-end items-end">
						<Entry text={input} onTextChange={text => setInput(text)} />

						<span className="text-lg mb-2 ml-1">
							{(inputSymbol !== 'K' ? '°' : '') + inputSymbol}
						</span>
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select
						options={scales}
						value={outputScale}
						onChange={e => setOutputScale(e.target.value as TemperatureScale)}
					/>

					<div className="flex justify-end items-end">
						<Output value={output} />

						<span className="text-lg mb-2 ml-1">
							{(outputSymbol !== 'K' ? '°' : '') + outputSymbol}
						</span>
					</div>
				</div>
			</div>

			<div className='w-80 h-[300px] relative'>
				<Keyboard layout="COMMON" entry={input} onChangeEntry={text => setInput(text)} />
			</div>
		</>
	)
}