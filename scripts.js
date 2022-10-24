function display() {
    const screen = document.querySelector('.screen')
    const buttons = document.querySelectorAll('button')
    const text = document.createElement('h2')
    text.innerText = '0'
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
        if (btnContent === "AC") {
            text.innerText = '0'
        } else if (btnContent === "DEL") {
            text.innerText = text.innerText.slice(0, -1)
            if (text.innerText === '') text.innerText = '0'
        } else if (btnContent === "=") {
            operate(text.innerText)
        } else if (/^[\d]$/.test(btnContent)) {
            (text.innerText === '0') ? text.innerText = btnContent : text.innerText += btnContent
        } else if (/[.\+\-\/\(\)\u00D7]/.test(btnContent)) {
            text.innerText += btnContent
        }
        e.target.blur()
    }))
    screen.append(text)
}

function operate(op) {
    console.log(op)
}

display()