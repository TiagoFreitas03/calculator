import { Button } from "./Button"

interface KeyboardProps {
	onKeyClick: (key: string) => void
}

const BUTTONS = [
	[
		{ key: 'C', icon: 'c' },
		{ key: 'del', icon: 'delete-left' },
		{ key: '%', icon: 'percent' },
		{ key: '/', icon: 'divide' },
	],
	[
		{ key: '7', icon: '7' },
		{ key: '8', icon: '8' },
		{ key: '9', icon: '9' },
		{ key: '*', icon: 'xmark' },
	],
	[
		{ key: '4', icon: '4' },
		{ key: '5', icon: '5' },
		{ key: '6', icon: '6' },
		{ key: '-', icon: 'minus' },
	],
	[
		{ key: '1', icon: '1' },
		{ key: '2', icon: '2' },
		{ key: '3', icon: '3' },
		{ key: '+', icon: 'plus' },
	],
	[
		{ key: '+/-', icon: 'plus-minus' },
		{ key: '0', icon: '0' },
		{ key: '.' },
		{ key: '=', icon: 'equals' }
	]
]

export function Keyboard({ onKeyClick }: KeyboardProps) {
	return (
		<div>
			{
				BUTTONS.map(row => (
					<div key={row.map(r => r.key).join('-')}>
						{
							row.map(({ key, icon }) => (
								<Button
									key={key}
									onClick={() => onKeyClick(key)}
									text={key}
									icon={icon}
								/>
							))
						}
					</div>
				))
			}
		</div>
	)
}
