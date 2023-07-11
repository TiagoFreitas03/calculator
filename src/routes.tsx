import { ReactNode } from "react"

import { Calculator } from "./screens/Calculator"
import { NotFound } from "./screens/NotFound"
import { Menu } from "./screens/Menu"
import { CalculatorContextProvider } from "./contexts/CalculatorContext"
import { AgeCalculator } from "./screens/AgeCalculator"

interface AppRoute {
	path: string
	children: ReactNode
	title?: string
	navigateTo?: string // default = '/menu'
	hideLayout?: boolean
}

export const routes: AppRoute[] = [
	{
		path: '/',
		children: <CalculatorContextProvider children={<Calculator/>} />,
		hideLayout: true
	},
	{
		path: '/menu',
		children: <Menu />,
		title: 'Menu',
		navigateTo: '/'
	},
	{ path: '/age', children: <AgeCalculator />, title: 'Idade' },
	{ path: '*', children: <NotFound />, hideLayout: true }
]
