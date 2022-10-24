function display() {
    const screen = document.querySelector('.screen')
    const buttons = document.querySelectorAll('button')
    const text = document.createElement('h2')
    text.innerText = "0"
    window.addEventListener('keypress', e => {
        if (/^[0-9\+\-\*\/]$/.test(e.key)) {
            text.innerText += e.key
        } else if (e.code === 'Enter') {
            operator(text.innerText)
        }
    })
    buttons.forEach(btn => btn.addEventListener('click', e => {
        const btnContent = e.target.innerText
        if (btnContent === "AC") {
            text.innerText = ""
        } else if (btnContent === "DEL") {
            text.innerText = text.innerText.slice(0, -1)
        }
        else text.innerText += btnContent
    }))
    screen.append(text)
}

function operator(text) {
    console.log(text)
}

display()