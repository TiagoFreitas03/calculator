import { Link } from 'react-router-dom'

import { ScreenTitle } from '../components/ScreenTitle'

const options = [
	{ link: '/age', icon: 'cake-candles', title: 'Idade' },
	{ link: '/area', icon: 'up-right-and-down-left-from-center', title: 'Área' },
	{ link: '/imc', icon: 'weight-scale', title: 'IMC' },
	{ link: '/data', icon: 'database', title: 'Dados' },
	{ link: '/date-diff', icon: 'calendar-days', title: 'Data' },
	{ link: '/discount', icon: 'tag', title: 'Desconto' },
	{ link: '/length', icon: 'ruler', title: 'Comprimento' },
	{ link: '/weight', icon: 'weight-hanging', title: 'Massa' },
	{ link: '/number-base', icon: 'rotate', title: 'Base numérica' },
	{ link: '/speed', icon: 'gauge-simple-high', title: 'Velocidade' },
	{ link: '/temperature', icon: 'temperature-full', title: 'Temperatura' },
	{ link: '/time', icon: 'clock', title: 'Tempo' },
	{ link: '/volume', icon: 'cube', title: 'Volume' }
]

export function Menu() {
	return (
		<>
			<ScreenTitle title='Menu' navigateTo='/' />

			<div className='grid grid-cols-3'>
				{options.map(option => {
					return (
						<Link
							to={option.link}
							key={option.link}
							className='m-1 text-zinc-400 hover:text-blue-300 px-2'
						>
							<div className='flex flex-col justify-center items-center gap-2 h-24'>
								<i className={`fas fa-${option.icon}`} />
								<span className='text-sm text-center whitespace-nowrap'>{option.title}</span>
							</div>
						</Link>
					)
				})}
			</div>
		</>
	)
}
