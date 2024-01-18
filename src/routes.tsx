import { ScreenProps } from "./interfaces/ScreenProps"
import { NotFound } from "./screens/NotFound"
import { Calculator } from "./screens/Calculator"
import { Menu } from "./screens/Menu"
import { CalculatorContextProvider } from "./contexts/CalculatorContext"
import { AgeCalculator } from "./screens/AgeCalculator"
import { DateDiffCalculator } from "./screens/DateDiffCalculator"
import { TemperatureConverter } from "./screens/TemperatureConverter"
import { DataUnitConverter } from "./screens/DataUnitConverter"
import { BMICalculator } from "./screens/BMICalculator"
import { NumberBaseConverter } from "./screens/NumberBaseConverter"
import { DiscountCalculator } from "./screens/DiscountCalculator"
import { TimeConverter } from "./screens/TimeConverter"
import { WeightConverter } from "./screens/WeightConverter"
import { SpeedConverter } from "./screens/SpeedConverter"
import { AreaConverter } from "./screens/AreaConverter"

interface AppRoute extends ScreenProps {
	path: string
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
	{ path: '/bmi', children: <BMICalculator />, title: 'IMC' },
	{ path: '/number-base', children: <NumberBaseConverter />, title: 'Base numérica' },
	{ path: '/discount', children: <DiscountCalculator />, title: 'Desconto' },
	{ path: '/time', children: <TimeConverter />, title: 'Tempo' },
	{ path: '/weight', children: <WeightConverter />, title: 'Massa' },
	{ path: '/speed', children: <SpeedConverter />, title: 'Velocidade' },
	{ path: '/area', children: <AreaConverter />, title: 'Área' },
	{ path: '*', children: <NotFound />, hideLayout: true }
]
