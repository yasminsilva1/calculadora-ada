const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
	result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		const buttonText = button.innerText;
		if (/^[0-9,]+$/.test(buttonText)) {
			addDigit(buttonText);
		}
	});
});
