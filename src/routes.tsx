import { ReactNode } from "react"

import { Calculator } from "./screens/Calculator"
import { NotFound } from "./screens/NotFound"
import { Menu } from "./screens/Menu"
import { CalculatorContextProvider } from "./contexts/CalculatorContext"
import { AgeCalculator } from "./screens/AgeCalculator"
import { DateDiffCalculator } from "./screens/DateDiffCalculator"
import { TemperatureConverter } from "./screens/TemperatureConverter"
import { DataUnitConverter } from "./screens/DataUnitConverter"

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
	{ path: '/date-diff', children: <DateDiffCalculator />, title: 'Data' },
	{ path: '/temperature', children: <TemperatureConverter />, title: 'Temperatura' },
	{ path: '/data', children: <DataUnitConverter />, title: 'Dados' },
	{ path: '*', children: <NotFound />, hideLayout: true }
]
