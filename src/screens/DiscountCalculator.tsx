import { useState } from "react"

import { Keyboard } from "../components/Keyboard"
import { Entry } from "../components/Entry"
import { maskNumber } from "../utils/masks"

export function DiscountCalculator() {
	const [price, setPrice] = useState('100')
	const [discount, setDiscount] = useState('10')
	const [activeParam, setActiveParam] = useState<'p' | 'd'>('p')

	const finalPrice = Number(price) * ((100 - Number(discount)) / 100)

	function handleChangePrice(value: string) {
		if ((/^([0-9]{1,10})(\.[0-9]{0,2})?$/).test(value)) {
			setPrice(value)
		}
	}

	function handleChangeDiscount(value: string) {
		const num = Number(value)

		if (!isNaN(num) && num >= 0 && num <= 100 && num.toString().length <= 5) {
			while (value[0] === '0') {
				value = value.substring(1)
			}

			setDiscount(value === '' ? '0' : value.replace(',', '.'))
		}
	}

	return (
		<div className="flex flex-col gap-6 pt-2">
			<div className="flex justify-between">
				<span>Preço original</span>

				<Entry
					text={price}
					active={activeParam === 'p'}
					onTextChange={text => handleChangePrice(text)}
					onClick={() => setActiveParam('p')}
					small
					cssClasses={activeParam === 'p' ? 'text-blue-300' : ''}
				/>
			</div>

			<div className="flex justify-between">
				<span>Desconto (% off)</span>

				<Entry
					text={discount}
					active={activeParam === 'd'}
					onTextChange={text => handleChangeDiscount(text)}
					onClick={() => setActiveParam('d')}
					small
					cssClasses={activeParam === 'd' ? 'text-blue-300' : ''}
				/>
			</div>

			<div className="flex justify-between">
				<span>Preço final</span>

				<span>{maskNumber(finalPrice.toString(), false, 'dec', 2)}</span>
			</div>

			<div className="text-center pb-6 border-b border-zinc-800">
				<span className="text-zinc-600 font-bold">
					Economia de {maskNumber((Number(price) - finalPrice).toString(), false, 'dec', 2)}
				</span>
			</div>

			<div className='w-80 h-[280px] relative'>
				<Keyboard
					layout="COMMON"
					entry={activeParam === 'p' ? price : discount}
					onChangeEntry={text => {
						if (activeParam === 'p') {
							handleChangePrice(text)
						}
						else {
							handleChangeDiscount(text)
						}
					}}
					disabledKeys={['+-']}
				/>
			</div>
		</div>
	)
}
