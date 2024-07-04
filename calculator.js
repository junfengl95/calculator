let display = document.getElementById('display')
let firstOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;
let activeOperatorButton = null;

const decimalButton = document.getElementById('decimal');
const operatorButtons = document.querySelectorAll('.operator')


function appendToDisplay(value) {
    if (shouldResetDisplay){
        display.value = value;
        shouldResetDisplay = false;
    } else if (display.value === '0'){
        display.value = value;
    } else {
        display.value += value;
    }
}

function appendDecimal(){
    if(!display.value.includes('.')){
        appendToDisplay('.');
        decimalButton.disabled = true;
    }
}

function clearDisplay(){
    display.value = '0';
    firstOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    removeActiveOperator();
    decimalButton.disabled = false;
}

function handleOperator(operator, buttonId){
    if (firstOperand === null){
        firstOperand = parseFloat(display.value);
    } else if (!shouldResetDisplay){
        calculateResult(); // calculate result before the next operator
    }
    currentOperator = operator;
    shouldResetDisplay = true;
    selectedOperator(buttonId)
}


function calculateResult(){
    // let operator = input.match(/[+\-*/]/);
    // if (!operator) return; // No operator found
    // let parts = input.split(/[+\-*/]/);
    // let num1 = parseFloat(parts[0]);
    // let num2 = parseFloat(parts[1]);
    // if (isNaN(num1) || isNaN(num2)) return;
    // display.value = operate(operator[0], num1, num2);

    if (currentOperator === null || shouldResetDisplay) return;

    let secondOperand = parseFloat(display.value);
    
    let result = operate(currentOperator, firstOperand, secondOperand);
    
    display.value = result;
    firstOperand = result;
    currentOperator = null;
    shouldResetDisplay = true;
    removeActiveOperator();
    decimalButton.disabled = false;
}


function add(num1, num2) {
    return num1 + num2;
};

function substract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(operator, num1, num2) {
    console.log(currentOperator);
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return "Invalid operator";
    }
}

function changeSign(){
    display.value = parseFloat(display.value) * -1;
}

function convertPercentage(){
    display.value = parseFloat(display.value) / 100;
}

function backspace(){
    if (display.value.length > 0){
        display.value = display.value.slice(0, -1);
    }
}

// select Operator
function selectedOperator(buttonId){    
    const button = document.getElementById(buttonId);

    // Remove active state from all operators
    operatorButtons.forEach(btn => {
        btn.classList.remove('selected')
    });
    // Add active state to clicked operation btn
    button.classList.add('selected');
    activeOperatorButton = button;
}

// Remove opacity
function removeActiveOperator(){
    if(activeOperatorButton){
        activeOperatorButton.classList.remove('selected');
        activeOperationButton = null;
    }
}

// Attach event listeners 
document.addEventListener('DOMContentLoaded', function(){
    // numbers event Listener
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => appendToDisplay(button.innerText));
    });

    // operator eventListener
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () =>handleOperator(button.innerText, button.id));
    });

    // clear eventListener
    document.getElementById('clear').addEventListener('click', clearDisplay);

    // percent eventListener
    document.getElementById('percent').addEventListener('click', convertPercentage);

    // signChange eventListener
    document.getElementById('sign').addEventListener('click', changeSign);

    // equal eventListener
    document.getElementById('equal').addEventListener('click', calculateResult);

    // decimal button
    decimalButton.addEventListener('click', appendDecimal);

    // backspace button
    document.getElementById('backspace').addEventListener('click', backspace);

    // Direct calculation on operator click
    operatorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (firstOperand !== null && currentOperator !== null && shouldResetDisplay === false){
                calculateResult();
            }
        })
    })
})
