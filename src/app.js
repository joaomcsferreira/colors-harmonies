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

function set_cod_color(children, color, color_main) {
    children.innerHTML = hsl_to_rgb(color_main, 75, color)
    children.style.color = `hsl(${color_main}, 100%, 0%)`
}

function alter_color_monocromatic(boxs, color_main) {
    cont = 0
    
    boxs.forEach(div => {
        div.style.backgroundColor = `hsl(${color_main}, 75%, ${color[cont]}%)`

        set_cod_color(div.children[0], color[cont], color_main)

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

        set_cod_color(div.children[0], color[cont], color_main)

        cont++
    });
}

function alter_color_complimentary(boxs, color_main) {
    cont = 0

    boxs.forEach(div => {
        div.style.backgroundColor = `hsl(${color_main - 180}, 75%, ${color[cont]}%)`
        
        set_cod_color(div.children[0], color[cont], color_main)

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

        set_cod_color(div.children[0], color[cont], color_main)

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

        set_cod_color(div.children[0], color[cont], color_main)

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

        set_cod_color(div.children[0], color[cont], color_main)
        
        cont++
    });
}

/**
 * Based on pseudo-code in the W3 Color Model document (http://www.w3.org/TR/2011/REC-css3-color-20110607/#hsl-color)
 */

function hsl_to_rgb(h, s, l) {
    h /= 360
    s /= 100
    l /= 100

    m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    m1 = l * 2 - m2

    r = hue_to_rgb(m1, m2, h + 1 / 3)
    g = hue_to_rgb(m1, m2, h)
    b = hue_to_rgb(m1, m2, h - 1 / 3)

    return `#${(Math.round(r * 255).toString(16))}${(Math.round(g * 255).toString(16))}${(Math.round(b * 255).toString(16))}`
}

function hue_to_rgb(m1, m2, h) {
    if( h < 0 ) h += 1
    else if( h > 1 ) h -= 1

    if( h*6 < 1 ) return m1 + (m2 - m1) * h * 6
    else if( h*2 < 1 ) return m2
    else if( h*3 < 2 ) return m1 + (m2 - m1) * (2/3 - h) * 6

    return m1
}

document.addEventListener("DOMContentLoaded", function() {
    hInput = document.querySelector(".main #h") 
    
    setColor()
})
