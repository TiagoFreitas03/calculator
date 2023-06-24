import { NUMBERS, OPERATIONS } from "../constants/KEYS"
import { onlyNumbers } from "./only-numbers"

function append(entry: string, key: string) {
	if (NUMBERS.includes(key)) { // 0..9
		if (onlyNumbers(entry).length < 15) {
			entry = entry === '0' ? key : entry + key
		}
	}
	else if (key === '.' && !entry.includes(key)) {
		if (onlyNumbers(entry).length < 15) {
			entry = entry + key
		}
	}

	return entry
}

function erase(entry: string) {
	if (entry.length > 1) {
		entry = entry.substring(0, entry.length - 1)

		if (entry === '-') {
			entry = '0'
		}
	}
	else if (entry !== '0') {
		entry = '0'
	}

	return entry
}

function percent(value: string) {
	const num = Number(value)

	if (isNaN(num)) {
		return value
	}

	return (num * 0.01).toString()
}

function reverseSignal(value: string) {
	const num = Number(value)

	if (isNaN(num)) {
		return value
	}

	return (num * (-1)).toString()
}

function addOperator(expression: string[], entry: string, operator: string, replace = false) {
	if (!OPERATIONS.includes(operator)) {
		return { expression, entry }
	}

	let result = entry

	if (expression.length === 2) {
		if (replace) {
			expression.splice(1, 1, operator)
		}
		else {
			result = calculate(expression.concat(entry))
		}
	}

	return {
		expression: [Number(result).toString(), operator],
		entry: result
	}
}

function calculate(expression: string[]) {
	let leftNum = 0, rightNum = 0, result = 0
	let operator = ''

	function validateExpression() {
		if (expression.length !== 3) {
			return false
		}

		[leftNum, operator, rightNum] = [Number(expression[0]),expression[1],Number(expression[2])];

		return !(isNaN(leftNum) || isNaN(rightNum) || !OPERATIONS.includes(expression[1]))
	}

	if (!validateExpression()) {
		return ''
	}

	switch (operator) {
		case '+':
			result = leftNum + rightNum
			break
		case '-':
			result = leftNum - rightNum
			break
		case '*':
			result = leftNum * rightNum
			break
		default:
			if (rightNum === 0)
				alert('Não é possível dividir por zero')
			else
				result = leftNum / rightNum
	}

	return result.toString()
}

export { append, erase, percent, reverseSignal, addOperator, calculate }
