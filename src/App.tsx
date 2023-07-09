import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { routes } from './routes'
import { Layout } from './components/Layout'
import { CalculatorContextProvider } from './contexts/CalculatorContext'

export function App() {

	return (
		<CalculatorContextProvider>
			<div className="w-screen h-screen flex justify-center items-center">
				<div className="p-5 rounded-sm w-[362px] h-[600px] border border-zinc-700">
					<BrowserRouter>
						<Routes>
							{
								routes.map(({ path, hideLayout, Screen, ...rest }) => {
									return (
										<Route
											key={path}
											path={path}
											element={hideLayout ? <Screen /> : <Layout Screen={Screen} {...rest} />}
										/>
									)
								})
							}
						</Routes>
					</BrowserRouter>
				</div>
			</div>
		</CalculatorContextProvider>
	)
}
