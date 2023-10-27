//dark and light theme
const themeButton = document.querySelector('.themes__toggle')
let numberResult = document.querySelector('.calc__result')
const calcuKeys = document.querySelectorAll('[data-type]')

const themesFunction = () => {
    themeButton.classList.toggle('themes__toggle--isActive')
}
const themesFunctionWithEnter = () => {
    (event) => { event.key === 'Enter' && themesFunction()
}
}
themeButton.addEventListener('keydown', themesFunctionWithEnter)

themeButton.addEventListener('click' , themesFunction)


// Logic of Calculator  
let storedNumber = '';
let currentNumber = '';
let operator = '';
const updateScreen = (value) => {
    numberResult.textContent = !value ? '0' : value;
    
}
const resetButtonHandler = () => {
    storedNumber = '';
    currentNumber = '';
    operator = '';
    updateScreen();
}
const deleteButtonHandler = () => {
    if (!currentNumber || currentNumber === '0') return;
    if (currentNumber.length === 1) {
        currentNumber = '';
        
    }
    else {
        currentNumber = currentNumber.slice(0, -1);
    }
    updateScreen(currentNumber);
}
const NumberButtonHandler = (value)=> {
    if (value === '.' && currentNumber.includes('.')) return
    if (value === '0' && !currentNumber) return

    currentNumber +=   value;
    updateScreen(currentNumber)
      
}
const operationButtonHandler = (operationValue) => {
    if(!currentNumber && !storedNumber) return
    if(currentNumber && !storedNumber) {
        storedNumber = currentNumber
        operator = operationValue
        currentNumber = ''
    }
    else if(storedNumber) {
        operator = operationValue
    }
    if(currentNumber) executeOperation();
}
const executeOperation = () => {
    if(currentNumber && storedNumber && operator) {
        switch(operator){
            case '+' :
                storedNumber= parseFloat(currentNumber) + parseFloat(storedNumber)
                break;
            case '-' :
                storedNumber= parseFloat(currentNumber) - parseFloat(storedNumber)
                break;
            case '*' :
                storedNumber= parseFloat(currentNumber) * parseFloat(storedNumber)
                break;
            case '/' :
                storedNumber= parseFloat(currentNumber) / parseFloat(storedNumber)
                break;

        }
        currentNumber = ''
        updateScreen(storedNumber)
    }
}
const keyscalcuHandler = (element) => {
    element.addEventListener('click', () => {
        const type = element.dataset.type
        const value =  element.dataset.value;
        if (type=== 'number') {
            NumberButtonHandler(value)
          }
        else if (type === 'operation') {
            switch(value) {
                case 'c':
                    resetButtonHandler();
                    break;
                case 'Backspace':
                    deleteButtonHandler();
                    break;
                case 'Enter':
                    executeOperation();
                    break;
                default:
                    operationButtonHandler(value);
            }
        }
    })
}

calcuKeys.forEach(keyscalcuHandler)

// keboard as input


window.addEventListener('keydown', (event) => {
    const availableNumbers = ['0', '1' , '2', '3' , '4', '5','6', '7', '8', '9', '.']
    const availableOperation = ['+', '-', '/', '*']
    const key = event.key
    if (availableNumbers.includes(key)) {
        NumberButtonHandler(key)
        }
    else if (availableOperation.includes(key)) {
        operationButtonHandler(key)
    }
    else if (key === 'c' ) {
        resetButtonHandler();
    }
    else if (key === 'Backspace') {
        deleteButtonHandler();
    }
    else if (key === 'Enter') {
        executeOperation()
    }

       })