function draw(numberBoxes){
    const drawingBox = document.querySelector("#drawingBox");

    let drawingBoxWidth = drawingBox.clientWidth;

    document.querySelectorAll("#drawingBox div").forEach((child) => {
        drawingBox.removeChild(child);
    });

    let mousedown = false;
    drawingBox.addEventListener("mousedown", (e) => {
        e.preventDefault();
        mousedown = true;
        e.target.style.background = backgroundColor;
    });

    drawingBox.addEventListener("mouseup", () => {mousedown = false;});
    
    let backgroundColor = "black";

    const colorPicker = document.querySelector("#colors #colorPicker");
    const colorMode = document.querySelector("#colors #colorMode");
    const randomMode = document.querySelector("#colors #randomMode");
    
    let randomModeToggle = false;

    colorMode.addEventListener("click", () => {
        backgroundColor = colorPicker.value;
        randomModeToggle = false;
    });

    colorPicker.addEventListener("change", () => {
        backgroundColor = colorPicker.value;
        randomModeToggle = false;
    });

    randomMode.addEventListener("click", () => {
        randomModeToggle = true;
    });

    for(let i = 0; i < Math.pow(numberBoxes, 2); i++){
        const box = document.createElement("div");
        box.style.cssText = `min-width: ${(drawingBoxWidth/numberBoxes) - 2}px; min-height: ${drawingBoxWidth/numberBoxes}px; background: white; flex: none; touch-action: none; border: solid 1px black;`;

        drawingBox.appendChild(box);
        


        box.addEventListener("mouseover",() => {
            if(randomModeToggle){backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;}
            if(mousedown){
                box.style.background = backgroundColor;
            }
        });

        if(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)){
            box.addEventListener("pointerdown",(e)=>{
                box.releasePointerCapture(e.pointerId);
            });
            box.addEventListener("pointerenter",(e)=>{
                if(randomModeToggle){backgroundColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;}
                box.style.background = backgroundColor;
            });
        }

    }
}

document.addEventListener("DOMContentLoaded", draw(16));

function changeBoxesNumber(){
    const boxesInput = document.querySelector("#boxes input").value;
    let numberBoxes = boxesInput == '' ? 16 : boxesInput;

    if(!(boxesInput > 0 && boxesInput <= 64)){
        alert("You must have between 1 and 64 boxes per side");
    } else {
        draw(boxesInput);
    }
}


const boxesButton = document.querySelector("#boxes button");
const boxesInput = document.querySelector("#boxes input");

boxesButton.addEventListener("click", changeBoxesNumber);
document.addEventListener("keypress", (e) => {
    if(e.key == "Enter") changeBoxesNumber();
});

function resetBackground(){
    document.querySelectorAll("#drawingBox div").forEach((child) => {
        child.style.background = "white";
    });
}

const reset = document.querySelector("#reset");

reset.addEventListener("click", resetBackground);