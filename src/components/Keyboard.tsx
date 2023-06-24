import { Button } from "./Button"
import { BUTTONS } from '../constants/BUTTONS'

interface KeyboardProps {
	onKeyClick: (key: string) => void
	activeKey: string
}

export function Keyboard({ onKeyClick, activeKey }: KeyboardProps) {
	return (
		<div>
			{
				BUTTONS.map(({ key, icon, text }) => (
					<Button
						key={key}
						onClick={() => onKeyClick(key)}
						text={text ?? key}
						icon={icon}
						active={activeKey === key}
					/>
				))
			}
		</div>
	)
}
