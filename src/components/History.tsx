import clsx from "clsx"

import { useCalculatorContext } from "../contexts/CalculatorContext"
import { OperatorIcon } from "./OperatorIcon"
import { maskExpression,maskNumber } from "../utils/masks"
import { OPERATIONS } from "../constants/KEYS"

interface HistoryProps {
	visible: boolean
	onSelectMath: (expression: string[], result: string) => void
}

export function History({ visible, onSelectMath }: HistoryProps) {
	if (!visible) {
		return <></>
	}

	const { history, clearHistory } = useCalculatorContext()

	return (
		<div className='w-60 h-full absolute z-10 bg-black border-r border-zinc-800 p-2'>
			<div
				className={clsx("h-[320px] overflow-auto", {
					'flex flex-col-reverse': history.length > 0
				})}
			>
				{
					history.length === 0 ?
						<p>Ainda não há histórico</p> :
						history.slice().reverse().map((math, index) => {
							return (
								<div
									className="p-2 mr-2 text-right hover:bg-zinc-800 cursor-pointer"
									key={JSON.stringify(math) + index}
									onClick={() => onSelectMath(math.expression, math.result)}
								>
									<div className="text-sm flex justify-end items-center">
										{
											maskExpression(math.expression.slice()).map((e, i) => {
												return OPERATIONS.includes(e) ?
													<OperatorIcon operator={e} cssClasses="ml-1 text-xs" key={e + index} /> :
													<span className="ml-1" key={e + i}>{e}</span>
											})
										}
									</div>

									<span className="text-blue-300">
										{maskNumber(math.result)}
									</span>
								</div>
							)
						})
				}
			</div>

			{
				history.length > 0 &&
				<div className="flex justify-center">
					<button
						className="bg-zinc-800 hover:bg-zinc-700 py-2 px-4 rounded-full mt-4"
						onClick={clearHistory}
					>
						<i className="fas fa-trash-can mr-1" /> Limpar histórico
					</button>
				</div>
			}
		</div>
	)
}
