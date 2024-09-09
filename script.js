function draw(numberBoxes){
    const drawingBox = document.querySelector("#drawingBox");

    let drawingBoxWidth = drawingBox.clientWidth;

    document.querySelectorAll("#drawingBox div").forEach((child) => {
        drawingBox.removeChild(child);
    });


    for(let i = 0; i < Math.pow(numberBoxes, 2); i++){
        const box = document.createElement("div");
        box.style.cssText = `min-width: ${(drawingBoxWidth/numberBoxes) - 2}px; min-height: ${drawingBoxWidth/numberBoxes}px; background: white; flex: none; touch-action: none; border: solid 1px black;`;

        drawingBox.appendChild(box);
        
        let mousedown = false;
        drawingBox.addEventListener("mousedown", (e) => {
            e.preventDefault();
            mousedown = true;
        });
        drawingBox.addEventListener("mouseup", () => {mousedown = false;});
        
        

        box.addEventListener("mouseover",() => {
            if(mousedown){box.style.background = "black";}
        });

        if(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)){
            box.addEventListener("pointerdown",(e)=>{
                box.releasePointerCapture(e.pointerId);
            });
            box.addEventListener("pointerenter",(e)=>{
                box.style.background = "black";
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

reset.addEventListener("click", resetBackground)