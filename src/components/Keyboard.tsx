import { useCalculator } from "../contexts/CalculatorContext"
import { Button } from "./Button"
import { BUTTONS } from '../constants/BUTTONS'

interface KeyboardProps {
	activeKey: string
}

export function Keyboard({ activeKey }: KeyboardProps) {
	const { handleKeyPress } = useCalculator()

	return (
		<div className="w-full h-full absolute top-0 left-0">
			{
				BUTTONS.map(({ key, icon, text }) => (
					<Button
						key={key}
						onClick={() => handleKeyPress(key)}
						text={text ?? key}
						icon={icon}
						active={activeKey === key}
					/>
				))
			}
		</div>
	)
}
