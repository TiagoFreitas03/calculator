import { Button } from "./Button"
import { BUTTONS } from '../constants/BUTTONS'

interface KeyboardProps {
	onKeyClick: (key: string) => void
}

export function Keyboard({ onKeyClick }: KeyboardProps) {
	return (
		<div>
			{
				BUTTONS.map(({ key, icon, text }) => (
					<Button
						key={key}
						onClick={() => onKeyClick(key)}
						text={text ?? key}
						icon={icon}
					/>
				))
			}
		</div>
	)
}
