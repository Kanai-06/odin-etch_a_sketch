function draw(numberBoxes){
    const drawingBox = document.querySelector("#drawingBox");

    let drawingBoxWidth = drawingBox.clientWidth;

    document.querySelectorAll("#drawingBox div").forEach((child) => {
        drawingBox.removeChild(child);
    });

    for(let i = 0; i < Math.pow(numberBoxes, 2); i++){
        const box = document.createElement("div");
        box.style.cssText = `min-width: ${drawingBoxWidth/numberBoxes}px; min-height: ${drawingBoxWidth/numberBoxes}px; background: white; flex: none;`;

        drawingBox.appendChild(box);
    }
    document.querySelectorAll("#drawingBox div").forEach((child) => {
        child.addEventListener("mouseenter",() => {
            child.style.background = "black";
        });
    });

}

document.addEventListener("DOMContentLoaded", draw(16));

function changeBoxesNumber(){
    const boxesInput = document.querySelector("#boxes input").value;
    let numberBoxes = boxesInput == '' ? 16 : boxesInput;

    if(!(boxesInput > 0 && boxesInput <= 100)){
        alert("You must have between 1 and 100 boxes per side");
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