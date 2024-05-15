class Calculator {
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        if (this.currentOperand.toString() === ""){
            return
        } else if (this.currentOperand.toString().length == 1) {
            this.currentOperand = ""
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0,-1) //slice from start to second to last    
        }  
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return // Case where there is no digits
        if (this.operation !== undefined){
            this.operation == operation
            this.updateDisplay()
        }
        if(this.previousOperand !== '') { 
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(curr)) return 
        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.currentOperandElement.innerText = this.currentOperand
        if (this.operation != null) { 
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandElement.innerText = ''
        }
    }
}

// Declare and initiate link between data attributes in HTML
const numberButtons = document.querySelectorAll('[data-digits]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')

const previousOperandElement = document.querySelector('[data-prev-operand]')
const currentOperandElement = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(previousOperandElement,currentOperandElement)

// Assign functionality to corresponding buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

// TODO: Fix Display to properly display current status