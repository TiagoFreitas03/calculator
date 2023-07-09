import { OPERATIONS } from "../constants/KEYS"

function calculate(expression: string[]) {
	let left = 0, right = 0
	let operator = ''

	function validateExpression() {
		if (expression.length !== 3) {
			return false
		}

		[left, operator, right] = [Number(expression[0]), expression[1], Number(expression[2])];

		return !(isNaN(left) || isNaN(right) || !OPERATIONS.includes(expression[1]))
	}

	const result = () => {
		if (!validateExpression()) {
			return '0'
		}

		const format = (num: number) => Number(num.toPrecision(15)).toString()

		switch (operator) {
			case '+': return format(left + right)
			case '-': return format(left - right)
			case '*': return format(left * right)
			default:
				if (right !== 0) {
					return format(left / right)
				}

				throw new Error('Não é possível dividir por zero')
		}
	}

	try {
		return result()
	}
	catch (err) {
		throw err
	}
}

function addOperator(expression: string[], entry: string, operator: string, replace = false) {
	if (!OPERATIONS.includes(operator)) {
		return { expression, entry, calculated: false }
	}

	let result = entry
	let calculated = false

	if (expression.length === 2) {
		if (replace) {
			expression.splice(1, 1, operator)
		}
		else {
			try {
				result = calculate(expression.concat(entry))
				calculated = true
			}
			catch (err) {
				throw err
			}
		}
	}

	return {
		expression: [Number(result).toString(), operator],
		entry: result,
		calculated
	}
}

export { calculate, addOperator }
