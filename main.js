
let userInput = [];
let previousNumber;
let previousOperator;
const numbers = ["1","2","3","4","5","6","7","8","9","0"];
const operations = ["+", "-","*","/", "Enter"];
let setEnter = [];
let negative = false;

const calculatorScreen = document.getElementById("calc-screen");

const clicksToNumbers = () => {
    for (let i = 0; i<10; i++){
        const button = document.getElementById("btn-"+i);
        button.addEventListener("click", () => {
            if (negative === true && setEnter.length === 0){
                let number = 0 - i;
                userInput.push(String(number));
                negative = false;
            } else {
                userInput.push (String(i));
            } 
            button.disabled = true;
            button.disabled = false;
            calculatorScreen.innerHTML = i;
        });
    }
    
    keyToButton("+");
    keyToButton("-");
    keyToButton("*");
    keyToButton("/");
    keyToButton("sqrRoot");
    keyToButton("%");
    keyToButton("Enter");

    const buttonAC = document.getElementById("btn-AC");
    buttonAC.addEventListener("click", () => {
        userInput = [];
        setEnter =  [];
        buttonAC.disabled = true;
        buttonAC.disabled = false;
        calculatorScreen.innerHTML = 0;
        previousNumber = 0;
    });

    const buttonC = document.getElementById("btn-C");
    buttonC.addEventListener("click", () => {
        userInput = [];
        buttonC.disabled = true;
        buttonC.disabled = false;
        calculatorScreen.innerHTML = 0;
        previousNumber = 0;
    });

    const buttonDot = document.getElementById("btn-.");
    buttonDot.addEventListener("click", () => {
        if (!userInput.includes(".")){
            userInput.push (".");
        } 
        buttonDot.disabled = true;
        buttonDot.disabled = false;
        calculatorScreen.innerHTML = ".";
    });
}
    

    
const keyToButton = (key) => {
    const button = document.getElementById("btn-"+key);
    button.addEventListener("click", () => {
        if (String(key) === "-" && userInput.length === 0 && setEnter.length === 0){
            negative = true;
        } else {
            userInput.push (String(key));
        }
        button.disabled = true;
        button.disabled = false;
    });
}
    
clicksToNumbers();



document.onclick = () => {
    calculatorScreen.innerHTML = userInput.join("");
    if (userInput.includes('+') || userInput.includes('-') || userInput.includes('*') || userInput.includes('/') || userInput.includes('sqrRoot') || userInput.includes('%') || userInput.includes('.') || userInput.includes('Enter')){
        startNewCalculation(true);
    }
}



document.onkeydown = (evt) => {
    paintKeysOnHold (evt.key);
    
    evt.key = String(evt.key);
    if (!numbers.includes(evt.key) && !operations.includes(evt.key)){
        calculatorScreen.innerHTML = "ERROR";
    } else if (evt.key === "-" && userInput.length === 0){
        negative = true;
    }

    if (numbers.includes(evt.key) && negative === true && setEnter.length <= 2){
        let number = 0 - evt.key;
        userInput.push(number);
        negative = false;
    } else if (numbers.includes(evt.key)){
        userInput.push(evt.key);
    }

    if (evt.key === "." && !userInput.includes(".")){
        userInput.push(evt.key);
    }
    calculatorScreen.innerHTML = userInput.join("");

    if (operations.includes(evt.key)){
        userInput.push(evt.key);
        startNewCalculation(true);
    } 
}

document.onkeyup = (evt) => {
    paintKeysOnRelease (evt.key);
}

const startNewCalculation = (input) => {
    if (input && userInput.includes('+') || userInput.includes('-') || userInput.includes('*') || userInput.includes('/') || userInput.includes('sqrRoot') || userInput.includes('%') || userInput.includes('Enter')){
        let operation = userInput[userInput.length-1];
        runCalculation(operation, userInput);
        userInput = [];
    } 
}


const runCalculation = (operation, userInput) => {
    let userNumber;
    //START OVER IF PREVIOUS OPERATION WAS "ENTER" AND USER ENTERS A NEW NUMBER
    let operations = userInput[0] === "+" || userInput[0] === "-" || userInput[0] === "*" || userInput[0] === "/";
    if (setEnter[setEnter.length-1] === 1 && !operations){
        previousNumber = 0;
    } 
    // CHECK IF THERE'S A NUMBER OR JUST AN OPERATION
    if (userInput.length > 1){
        userNumber = inputToNumber(userInput);
    } else if  (userInput[0] === "+" || userInput[0] === "-"){
        userNumber = 0;
    } else if ((userInput[0] === "*" || userInput[0] === "/")){
        userNumber = 1;
    } 

    calculatorScreen.innerHTML = userNumber;

    let userOperator;
    if (operation === "Enter"){
        userOperator = previousOperator;
    } else {
        userOperator = userInput[userInput.length-1];
    }
    
    if (userOperator === "sqrRoot"){
        previousNumber = Math.sqrt(userNumber);
        if(Number.isNaN(previousNumber)){
            calculatorScreen.innerHTML = "ERROR";
        } else {
            calculatorScreen.innerHTML = previousNumber.toFixed(14);
        }
        return;
    } else if (userOperator === "%"){
        previousNumber =userNumber / 100;
        if(Number.isNaN(previousNumber)){
            calculatorScreen.innerHTML = "ERROR";
        } else {
            calculatorScreen.innerHTML = previousNumber;
        }
        return;
    }
    
    if (!previousNumber) {
        previousNumber = userNumber;
    } else if (userOperator === "+"){
        previousNumber += userNumber;
    } else if (userOperator === "-"){
        previousNumber -= userNumber;
    } else if (userOperator === "*"){
        previousNumber *= userNumber;
        previousNumber = parseFloat(previousNumber.toFixed(10));
    } else if (userOperator === "/"){
        previousNumber /= userNumber;
        previousNumber = parseFloat(previousNumber.toFixed(10));
    } 
    
    calculatorScreen.innerHTML = previousNumber;
   
    previousOperator = userOperator;

    if (operation === "Enter"){
        setEnter.push(1);
    } else {
        setEnter.push(0);
    }
}


const inputToNumber = (input) => {
    let numbersToCalculate = [];
    for (let i=0; i<input.length-1; i++){
        numbersToCalculate.push(input[i]);
    }
    return Number(numbersToCalculate.join(""));
}

const paintKeysOnHold = (key) => {
    if (numbers.includes(key)){
        let buttonNumber = document.getElementById("btn-" + key);
        buttonNumber.className = "big-buttons-clicked"
    } else {
        let buttonNumber = document.getElementById("btn-" + key);
        buttonNumber.className = "big-buttons operation-clicked"
    }
}

const paintKeysOnRelease = (key) => {
    if (numbers.includes(key)){
        let buttonNumber = document.getElementById("btn-" + key);
        buttonNumber.className = "big-buttons"
    } else {
        let buttonNumber = document.getElementById("btn-" + key);
        buttonNumber.className = "big-buttons operation"
    }
}