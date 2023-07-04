import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { CalculatorContextProvider } from './contexts/CalculatorContext'
import { NotFound } from './screens/NotFound'
import { Calculator } from './screens/Calculator'
import { Menu } from './screens/Menu'

const router = createBrowserRouter([
  { path: '/', element: <Calculator />, errorElement: <NotFound /> },
  { path: '/menu', element: <Menu /> },
]);

export function App() {
	return (
		<CalculatorContextProvider>
			<div className="w-screen h-screen flex justify-center items-center">
				<div className="p-5 rounded-sm w-[362px] border border-zinc-700">
					<RouterProvider router={router} />
				</div>
			</div>
		</CalculatorContextProvider>
	)
}
