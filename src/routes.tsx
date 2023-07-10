import { ReactNode } from "react"

import { Calculator } from "./screens/Calculator"
import { NotFound } from "./screens/NotFound"
import { Menu } from "./screens/Menu"
import { CalculatorContextProvider } from "./contexts/CalculatorContext"

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
	{
		path: '*',
		children: <NotFound />,
		hideLayout: true
	}
]
