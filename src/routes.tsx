import { Calculator } from "./screens/Calculator"
import { NotFound } from "./screens/NotFound"
import { Menu } from "./screens/Menu"

export const routes = [
	{
		path: '/',
		Screen: Calculator,
		hideLayout: true
	},
	{
		path: '/menu',
		Screen: Menu,
		title: 'Menu',
		navigateTo: '/'
	},
	{
		path: '*',
		Screen: NotFound,
		hideLayout: true
	}
]
