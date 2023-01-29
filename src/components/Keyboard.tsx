import { Button } from "./Button"

interface KeyboardProps {
	onKeyClick: (key: string) => void
}

const KEYS = [
	['C', '+/-', '%', '/'],
	['7', '8', '9', '*'],
	['4', '5', '6', '-'],
	['1', '2', '3', '+'],
	['0', '.', '=']
]

export function Keyboard({ onKeyClick }: KeyboardProps) {
	return (
		<div>
			{
				KEYS.map(keys => (
					<div key={keys.join('-')}>
						{
							keys.map(key => (
								<Button key={key} onClick={() => onKeyClick(key)} text={key} />
							))
						}
					</div>
				))
			}
		</div>
	)
}
