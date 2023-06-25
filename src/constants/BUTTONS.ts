interface Button {
	key: string
	icon?: string
	text?: string
}

export const BUTTONS: Button[] = [
	{ key: 'Escape', icon: 'c' },
	{ key: 'Delete', text: 'CE' },
	{ key: '%', icon: 'percent' },
	{ key: '/', icon: 'divide' },
	{ key: '7', icon: '7' },
	{ key: '8', icon: '8' },
	{ key: '9', icon: '9' },
	{ key: '*', icon: 'xmark' },
	{ key: '4', icon: '4' },
	{ key: '5', icon: '5' },
	{ key: '6', icon: '6' },
	{ key: '-', icon: 'minus' },
	{ key: '1', icon: '1' },
	{ key: '2', icon: '2' },
	{ key: '3', icon: '3' },
	{ key: '+', icon: 'plus' },
	{ key: 'Shift', icon: 'plus-minus' },
	{ key: '0', icon: '0' },
	{ key: '.', text: ',' },
	{ key: 'Enter', icon: 'equals' }
]
