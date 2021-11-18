let hInput;
let color = ['95', '85', '75', '65', '55', '45', '35', '25']

function setColor() {
    let color_main = hInput.value
    document.querySelector(".main .box-main").style.backgroundColor = `hsl(${hInput.value}, 75%, 50%)`

    let monocromatic = document.querySelectorAll(".monocromatic .box")
    let complimentary = document.querySelectorAll(".complimentary .box")
    let analogous = document.querySelectorAll(".analogous .box")
    let split_complimentary = document.querySelectorAll(".split-complimentary .box")
    let triads = document.querySelectorAll(".triads .box")
    let tetrad = document.querySelectorAll(".tetrad .box")


    setGradient(hInput, [hsl(0), hsl(60), hsl(120), hsl(180), hsl(300), hsl(360)])

    alter_color_monocromatic(monocromatic, color_main)
    alter_color_complimentary(complimentary, color_main)
    alter_color_analogous(analogous, color_main)
    alter_color_split_complimentary(split_complimentary, color_main)
    alter_color_triads(triads, color_main)
    alter_color_tetrad(tetrad, color_main)
}

function hsl(h) {
    return `hsl(${h}, 75%, 50%)`
}

function setGradient(h, steps) {
    gradientString = "linear-gradient(to right, "

    stepSize = 100 / (steps.length - 1)

    for(var i = 0; i < steps.length; i++) {
        gradientString +=  (i > 0 ? "," : "") + steps[i] + (i * stepSize) + "%"
    }

    h.style.backgroundImage = gradientString + ")"
}

function setColorFromHsl() {
    setColor()
}

function alter_color_monocromatic(boxs, color_main) {
    cont = 0
    
    boxs.forEach(div => {
        div.style.backgroundColor = `hsl(${color_main}, 75%, ${color[cont]}%)`
        cont++
    });
}

function alter_color_analogous(boxs, color_main) {
    cont = 0

    boxs.forEach(div => {
        if( cont >= 4) {
            div.style.backgroundColor = `hsl(${color_main - 30}, 75%, ${color[cont]}%)`
        } else {
            div.style.backgroundColor = `hsl(${color_main - 330}, 75%, ${color[cont]}%)`
        }
        cont++
    });
}

function alter_color_complimentary(boxs, color_main) {
    cont = 0

    boxs.forEach(div => {
        div.style.backgroundColor = `hsl(${color_main - 180}, 75%, ${color[cont]}%)`
        cont++
    });
}

function alter_color_split_complimentary(boxs, color_main) {
    cont = 0

    boxs.forEach(div => {
        if( cont >= 4) {
            div.style.backgroundColor = `hsl(${(color_main - 180) - 30}, 75%, ${color[cont]}%)`
        } else {
            div.style.backgroundColor = `hsl(${(color_main - 180) + 30}, 75%, ${color[cont]}%)`
        }
        cont++
    });
}

function alter_color_triads(boxs, color_main) {
    cont = 0

    boxs.forEach(div => {
        if( cont < 3) {
            div.style.backgroundColor = `hsl(${color_main - 120}, 75%, ${color[cont]}%)`
        } else if( cont < 6 ) {
            div.style.backgroundColor = `hsl(${color_main}, 75%, ${color[cont]}%)`
        } else {
            div.style.backgroundColor = `hsl(${color_main - 240}, 50%, ${color[cont]}%)`
        }
        cont++
    });
}

function alter_color_tetrad(boxs, color_main) {
    cont = 0

    boxs.forEach(div => {
        if( cont < 2 ) {
            div.style.backgroundColor = `hsl(${color_main - 80}, 90%, ${color[cont]}%)`
        } else if( cont < 4 ) {
            div.style.backgroundColor = `hsl(${color_main}, 90%, ${color[cont]}%)`
        } else if( cont < 6 ){
            div.style.backgroundColor = `hsl(${color_main - 160}, 50%, ${color[cont]}%)`
        } else {
            div.style.backgroundColor = `hsl(${color_main - 240}, 50%, ${color[cont]}%)`            
        }
        cont++
    });
}

document.addEventListener("DOMContentLoaded", function() {
    hInput = document.querySelector(".main #h") 
    
    setColor()
})
