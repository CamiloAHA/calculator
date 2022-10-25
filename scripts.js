function display() {
    const screen = document.querySelector('.screen')
    const buttons = document.querySelectorAll('button')
    const dispTxt = document.createElement('h2')
    const dispResult = document.createElement('h1')
    let numbers, op;
    dispTxt.innerText = '0' //Default display is 0
    dispResult.innerText = ''
    keySupport() //Keyboard support

    buttons.forEach(btn => btn.addEventListener('click', e => {
        const btnContent = e.target.innerText
        const actions = {
            'AC': () => dispTxt.innerText = '0',                        //Delete key
            'DEL': () => {                                              //Backspace key
                dispTxt.innerText = dispTxt.innerText.slice(0, -1)
                if (dispTxt.innerText === '') dispTxt.innerText = '0'
            },
            '=': () => {                                                //Enter key
                result = txtToResult(dispTxt.innerText, op)
                if (result != 'error') dispResult.innerText = result
            }
        }
        if (actions[btnContent]) actions[btnContent]()
        if (/[\d]/.test(btnContent)) { //Numbers
            (dispTxt.innerText === '0') ? dispTxt.innerText = btnContent : dispTxt.innerText += btnContent
        } else if (/[.\+\-\/\u00D7]/.test(btnContent)) { //Special characters
            if (btnContent != '.') {
                if (/[\+\-\/\u00D7]/.test(dispTxt.innerText.slice(1))) {
                    result = txtToResult(dispTxt.innerText, op)
                    if (result != 'error') {
                        dispResult.innerText = dispTxt.innerText = result
                        op = btnContent
                        dispTxt.innerText += btnContent
                    }
                } else {
                    op = btnContent
                    dispTxt.innerText += btnContent
                }
            } else { //For floating points numbers
                numbers = dispTxt.innerText.slice(1).split(/[\+\-\/\(\)\u00D7]/)
                //Checking if the current number already has a point
                if (numbers[1] === undefined && !(/[.]/.test(numbers[0])) ||
                    numbers[1] != undefined && !(/[.]/.test(numbers[1]))) {
                    dispTxt.innerText += btnContent
                }
            }
        }
        e.target.blur() //To avoid conflicts with Enter key
    }))
    screen.append(dispTxt)
    screen.append(dispResult)
}

function txtToResult(text, op) {
    let newTxt, result
    //Fix for negative numbers
    negative = text.slice(0, 1)
    negative === '-' ? newTxt = text.slice(1) : newTxt = text
    //Checking operation signs to avoid evaluation of more than a single pair of numbers at a time.
    if (/[\+\-\/\u00D7]/.test(newTxt)) {
        numbers = newTxt.split(op)
        if (numbers[0] != '' && numbers[1] != '') {
            if (negative === '-') result = operate(op, +('-' + numbers[0]), +numbers[1])
            else result = operate(op, +numbers[0], +numbers[1])
            console.log(text + ' = ' + result)
            return result
        }
    }
    return 'error' //In case some condition fails
}

function keySupport() {
    window.addEventListener('keyup', e => {
        if (/^[.\d\+\-\*\/\(\)]/.test(e.key) || e.code === 'Backspace' ||
            e.code === 'Enter' || e.code === 'Delete') {
            let selector
            if (e.code === 'Enter') e.preventDefault();
            //Choose appropriate selector if a special character is key-press
            (/^[.\+\-\*\/\(\)]/.test(e.key)) ? selector = `#btn-\\${e.key}` : selector = `#btn-${e.key}`
            const pressBtn = document.querySelector(selector)
            pressBtn.click()
        }
    })
}

function operate(op, a, b) {
    const operations = {
        '+': +(a + b).toFixed(3),
        '-': +(a - b).toFixed(3),
        '\u00D7': +(a * b).toFixed(3),
        '/': +(a / b).toFixed(3)
    }
    if (op === '/' && b === 0) {
        alert("Forbidden to divide by zero")
        return a + op + b
    }
    return operations[op]
}

display()