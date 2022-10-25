function display() {
    const screen = document.querySelector('.screen')
    const buttons = document.querySelectorAll('button')
    const dispTxt = document.createElement('h2')
    let numbers, op;
    dispTxt.innerText = '0'
    window.addEventListener('keyup', e => {
        if (/[.\d\+\-\*\/\(\)]/.test(e.key) || e.code === 'Backspace' ||
            e.code === 'Enter' || e.code === 'Delete') {
            let selector
            if (e.code === 'Enter') e.preventDefault();
            //Choose appropriate selector if a special character is key-press
            (/[.\+\-\*\/\(\)]/.test(e.key)) ? selector = `#btn-\\${e.key}` : selector = `#btn-${e.key}`
            const pressBtn = document.querySelector(selector)
            pressBtn.click()
        }
    })
    buttons.forEach(btn => btn.addEventListener('click', e => {
        const btnContent = e.target.innerText
        if (btnContent === "AC") { //Delete key
            dispTxt.innerText = '0'
        } else if (btnContent === "DEL") { //Backspace key
            dispTxt.innerText = dispTxt.innerText.slice(0, -1)
            if (dispTxt.innerText === '') dispTxt.innerText = '0'
        } else if (btnContent === "=") { //Enter key
            if (/[\+\-\/\(\)\u00D7]/.test(dispTxt.innerText)) {
                numbers = dispTxt.innerText.split(/[\+\-\/\(\)\u00D7]/)
                if (numbers[1] != '') dispTxt.innerText = operate(op, +numbers[0], +numbers[1])
            }
        } else if (/^[\d\(\)]$/.test(btnContent)) { //Numbers and brackets keys
            (dispTxt.innerText === '0') ? dispTxt.innerText = btnContent : dispTxt.innerText += btnContent
        } else if (/[.\+\-\/\u00D7]/.test(btnContent)) { //Especial characters keys
            //Checking operation signs to avoid evaluation of more than a single pair of numbers at a time.
            if (btnContent != '.' && /[\+\-\/\u00D7]/.test(dispTxt.innerText)) {
                //todo fix for negative numbers
                numbers = dispTxt.innerText.split(/[\+\-\/\(\)\u00D7]/)
                if (numbers[0] != '' && numbers[1] != '') {
                    dispTxt.innerText = operate(op, +numbers[0], +numbers[1])
                    op = btnContent
                    dispTxt.innerText += btnContent
                }
            } else {
                if (btnContent != '.') {
                    op = btnContent
                    dispTxt.innerText += btnContent
                } else {
                    numbers = dispTxt.innerText.split(/[\+\-\/\(\)\u00D7]/)
                    //Checking if the current number already has a point
                    if (numbers[1] === undefined && !(/[.]/.test(numbers[0])) ||
                        numbers[1] != undefined && !(/[.]/.test(numbers[1]))) {
                        dispTxt.innerText += btnContent
                    }
                }
            }
        }
        //For avoid conflicts with Enter key
        e.target.blur()
    }))
    screen.append(dispTxt)
}

function operate(op, a, b) {
    if (op === '+') {
        return +(a + b).toFixed(3)
    }
    if (op === '-') {
        return +(a - b).toFixed(3)
    }
    if (op === '\u00D7') {
        return +(a * b).toFixed(3)
    }
    if (op === '/') {
        if (b === 0) {
            alert("Forbidden to divide by zero")
            return a + op + b
        }
        return +(a / b).toFixed(3)
    }
    return 'error'
}

display()