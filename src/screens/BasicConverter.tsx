import { useEffect, useState } from "react"

import { Entry } from "../components/Entry"
import { Keyboard } from "../components/Keyboard"
import { Output } from "../components/Output"
import { Select } from "../components/Select"

interface Convertion {
	units: string[]
	symbols?: string[]
	convert: (value: string, inputUnitPos: number, outputUnitPos: number) => string
	getDisabledKeys?: (inputUnitPos: number) => string[]
}

interface BasicConverterProps {
	convertions: Convertion
	allowDecimals?: boolean
	keyboardLayout?: 'COMMON' | 'HEX'
	resetOnChange?: boolean
}

const isInputType = (value: string) => ['bin', 'oct', 'dec', 'hex'].includes(value)

export function BasicConverter({
	convertions,
	allowDecimals = true,
	keyboardLayout = 'COMMON',
	resetOnChange = false
}: BasicConverterProps) {
	const { units, symbols, convert, getDisabledKeys } = convertions

	const [options] = useState(
		units.map(unit => {
			return { value: unit, title: unit }
		})
	)

	const [inputUnit, setInputUnit] = useState(units[0])
	const [outputUnit, setOutputUnit] = useState(units[1])
	const [input, setInput] = useState('0')
	const [output, setOutput] = useState('0')

	const inputUnitPos = options.findIndex(o => o.value == inputUnit)
	const outputUnitPos = options.findIndex(o => o.value == outputUnit)

	useEffect(() => {
		if (resetOnChange) {
			setInput('0')
		}
	}, [inputUnit])

	useEffect(() => {
		let value = Number(input)

		if (!isNaN(value)) {
			if (inputUnit === outputUnit || Number(input) === 0) {
				setOutput(value.toString())
				return
			}
		}

		setOutput(convert(input, inputUnitPos, outputUnitPos))
	}, [input, inputUnit, outputUnit])

	return (
		<>
			<div>
				<div className="my-2 border-b border-zinc-700">
					<Select options={options} value={inputUnit} onChange={e => setInputUnit(e.target.value)} />

					<div className="flex justify-end items-end">
						<Entry
							text={input}
							onChangeText={text => setInput(text)}
							allowDecimals={allowDecimals}
							type={!isInputType(inputUnit) ? 'dec' : inputUnit as any}
						/>

						{ symbols ? <span className="mb-2 ml-1">{symbols[inputUnitPos]}</span> : <></> }
					</div>
				</div>

				<div className="my-2 border-b border-zinc-700">
					<Select options={options} value={outputUnit} onChange={e => setOutputUnit(e.target.value)} />

					<div className="flex justify-end items-end">
						<Output value={output} type={!isInputType(outputUnit) ? 'dec' : outputUnit as any} />

						{ symbols ? <span className="mb-2 ml-1">{symbols[outputUnitPos]}</span> : <></> }
					</div>
				</div>
			</div>

			<div className='w-80 h-[310px] relative'>
				<Keyboard
					layout={keyboardLayout}
					text={input}
					onChangeText={text => setInput(text)}
					type={!isInputType(inputUnit) ? 'dec' : inputUnit as any}
					disabledKeys={['+-'].concat(getDisabledKeys ? getDisabledKeys(inputUnitPos) : [])}
				/>
			</div>
		</>
	)
}
