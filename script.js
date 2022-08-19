document.body.style.margin = 0
document.body.style.overflow = 'hidden'

function setup () {
    createCanvas (window.innerWidth, window.innerHeight)
    rectMode (CENTER)
    noStroke ()
    fill ('hotpink')
}

function draw () {
    background (`pink`)
    square (width / 2, height / 2, 100)
}
