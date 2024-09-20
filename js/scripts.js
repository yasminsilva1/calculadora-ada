const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
	result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
	if (digit === "," && (currentNumber.includes(",") || !currentNumber)) {
		return;
	}

	if (restart) {
		currentNumber = digit;
		restart = false;
	} else {
		currentNumber += digit;
	}

	updateResult();
}

function setOperator(newOperator) {
	if (currentNumber) {
		calculate();
		firstOperand = Number(currentNumber.replace(",", "."));
		currentNumber = "";
	}

	operator = newOperator;
}

function calculate() {
	if (operator === null || firstOperand === null) return;

	let secondOperand = Number(currentNumber.replace(",", "."));
	let resultValue;

	switch (operator) {
		case "+":
			resultValue = firstOperand + secondOperand;
			break;

		case "-":
			resultValue = firstOperand - secondOperand;
			break;

		case "x":
			resultValue = firstOperand * secondOperand;
			break;

		case "÷":
			resultValue = firstOperand / secondOperand;
			break;

		default:
			break;
	}

	if (resultValue.toString().split(".")[1]?.length > 5) {
		currentNumber = Number(resultValue.toFixed(5)).toString();
	} else {
		currentNumber = resultValue.toString();
	}

	operator = null;
	firstOperand = null;
	restart = true;
	percentageValue = null;
	updateResult();
}

function clearCalculator() {
	currentNumber = "";
	firstOperand = null;
	operator = null;
	updateResult(true);
}

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		const buttonText = button.innerText;
		if (/^[0-9,]+$/.test(buttonText)) {
			addDigit(buttonText);
		} else if (["+", "-", "x", "÷"].includes(buttonText)) {
			setOperator(buttonText);
		} else if (buttonText === "=") {
			calculate();
		} else if (buttonText === "C") {
			clearCalculator();
		} else if (buttonText === "±") {
			currentNumber = (Number(currentNumber || firstOperand) * -1).toString();
			updateResult();
		}
	});
});
