let mouseDown = false
document.addEventListener("mousedown", () => {
    console.log("clicked")
    mouseDown = true
})


let mouseX = null
let mouseY = null
document.addEventListener("mouseup", () => {
    mouseDown = false
})


document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})


function Lerp(a, b, t){
    return a + (b - a) * Math.min(t, 1)
}

const container = document.getElementById("container")

let timeout = 1000/60
let dt = 1/60

let dtSinceMouseUp = 0

let cubeRotX = 0
let cubeRotY = 0

let cubeRotLerpX = 0
let cubeRotLerpY = 0

let lastMouseX = null
let lastMouseY = null
function RotateLoop(){
    if (!mouseDown){
        dtSinceMouseUp += dt
    }

    if (mouseDown && lastMouseX != null){
        dtSinceMouseUp = 0
        let deltaX = mouseX - lastMouseX
        let deltaY = mouseY - lastMouseY

        cubeRotX = (cubeRotX + deltaY)
        cubeRotY = (cubeRotY + deltaX)

    } else if (dtSinceMouseUp > 2) {
        cubeRotX = 0
        cubeRotY = 0
    }

    cubeRotLerpX = Lerp(cubeRotLerpX, cubeRotX, dt*5)
        cubeRotLerpY = Lerp(cubeRotLerpY, cubeRotY, dt*5)

    lastMouseX = mouseX
    lastMouseY = mouseY

    container.style.transform = "rotateX(" + -cubeRotLerpX + "deg) rotateY(" + cubeRotLerpY + "deg)"

    setTimeout(RotateLoop, timeout);
}

RotateLoop()
