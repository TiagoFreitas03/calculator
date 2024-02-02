import { ScreenProps } from "./interfaces/ScreenProps"
import { NotFound } from "./screens/NotFound"
import { Calculator } from "./screens/Calculator"
import { Menu } from "./screens/Menu"
import { CalculatorContextProvider } from "./contexts/CalculatorContext"
import { AgeCalculator } from "./screens/AgeCalculator"
import { DateDiffCalculator } from "./screens/DateDiffCalculator"
import { BMICalculator } from "./screens/BMICalculator"
import { DiscountCalculator } from "./screens/DiscountCalculator"
import { Converter } from "./screens/Converter"
import { BasicConverter } from "./screens/BasicConverter"
import { convertions } from "./utils/convertions"

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
	{
		path: '/temperature',
		children: <Converter convertions={convertions.TEMPERATURE} disabledKeys={[]} convertIfZero />,
		title: 'Temperatura'
	},
	{ path: '/data', children: <BasicConverter convertions={convertions.DATA} />, title: 'Dados' },
	{ path: '/bmi', children: <BMICalculator />, title: 'IMC' },
	{
		path: '/number-base',
		children: <BasicConverter
			convertions={convertions.NUMBER_BASE}
			allowDecimals={false}
			keyboardLayout="HEX"
			resetOnChange
		/>,
		title: 'Base numérica'
	},
	{ path: '/discount', children: <DiscountCalculator />, title: 'Desconto' },
	{ path: '/time', children: <BasicConverter convertions={convertions.TIME} />, title: 'Tempo' },
	{ path: '/mass', children: <Converter convertions={convertions.MASS} />, title: 'Massa' },
	{ path: '/speed', children: <Converter convertions={convertions.SPEED} />, title: 'Velocidade' },
	{ path: '/area', children: <Converter convertions={convertions.AREA} />, title: 'Área' },
	{ path: '/length', children: <Converter convertions={convertions.LENGTH} />, title: 'Comprimento' },
	{ path: '/volume', children: <Converter convertions={convertions.VOLUME} />, title: 'Volume' },
	{ path: '*', children: <NotFound />, hideLayout: true }
]
