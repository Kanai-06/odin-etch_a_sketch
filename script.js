let onTouchLeaveEvents = [];
let onTouchEnterEvents = [];
const onTouchEnter = function (selector, fn) {
    onTouchEnterEvents.push([selector, fn]);
    return function () {
        onTouchEnterEvents.slice().map(function (e, i) {
            if (e[0] === selector && e[1] === fn) {
                onTouchEnterEvents.splice(1, i);
            }
        });
    };
};

const onTouchLeave = function (selector, fn) {
    onTouchLeaveEvents.push([selector, fn]);
    return function () {
        onTouchLeaveEvents.slice().map(function (e, i) {
            if (e[0] === selector && e[1] === fn) {
                onTouchLeaveEvents.splice(1, i);
            }
        });
    };
};

let lastTouchLeave;
let lastTouchEnter;
document.addEventListener('touchmove', function (e) {
    var el = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (!el) return;
  
  onTouchLeaveEvents.map((event) => {
    if (el!=lastTouchEnter && lastTouchEnter && lastTouchEnter.matches(event[0])) {
      
        
            if (lastTouchEnter !== lastTouchLeave ) {
                event[1](lastTouchEnter, e);
        lastTouchLeave = lastTouchEnter;
        lastTouchEnter = null
            }
            
        }
    });
  
    onTouchEnterEvents.map((event) => {
        if (el.matches(event[0]) && el!==lastTouchEnter) {
            lastTouchEnter = el;
      lastTouchLeave = null;
      event[1](el, e);
     }
    });

});

onTouchEnter('.area',function(el,e){
  el.classList.add('hover')
})
onTouchLeave('.area',function(el,e){
  el.classList.remove('hover')
})


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

    document.querySelectorAll("#drawingBox div").forEach((child) => {
        onTouchEnter(child, function(element,event){
            child.style.background = "black";
        })
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