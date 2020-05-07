const GRIDINIT = 16; //the initial grid has 16 cells, so one row or column has 4 squares
const GRIDCONT = document.querySelector("#grid-container"); //the container holding all cells of the grid
const INPUTAREA = document.querySelector("#user-input-field"); //field for the user to input a number for the grid

let gridDim = Math.pow(GRIDINIT, 2); //initializing the first grid
let initInput = GRIDINIT; //user input at first is assumed to be the same as the initial grid
let cellColor; //variable for cell color

function calculateGridDim () {

    gridDim = Math.pow(initInput, 2); //the dimension of the grid is whatever the user inputs, squared

    return calculateGridDim;
}

//read the user input and store it in the gridDim variable; needs to be greater than 3 and smaller than 20
function getInputValue () {
    
    let gridCountChanged = document.querySelector("#user-input-field").value;

    if (isNaN(gridCountChanged)) {   //if people try to enter anything that is not a number, reset the grid and call them out

        alert("You need to enter a number between 16 and 64. Letters are not allowed. The grid will now be reset.")
        cellColor = "random";
        gridDim = Math.pow(initInput, 2);

    } else {

        if (gridCountChanged < 16) {
            alert("The number needs to be at least 16.");
            gridCountChanged = 16;
            cellColor = "random";
        } else if (gridCountChanged > 64) {
            alert("The number needs to be smaller than 65.");
            gridCountChanged = 64;
            cellColor = "random";
        }

        gridDim = Math.pow(gridCountChanged, 2);

    }
}

//create the grid and assign it IDs dynamically, plus a class
function myGrid (totalGridDimension) {

    let singleGrid;
    let i;

    for (i = 0; i < totalGridDimension; i++) {

        singleGrid = document.createElement("div");

        singleGrid.setAttribute("id", "grid-number_"+i);
        singleGrid.setAttribute("class", "grid-cell-class");

        document.querySelector("#grid-container").appendChild(singleGrid);

    }

}

//adjust the rows and columns for the grid container if they are not equal to 4 each
function changeRowColumnCount (rowColumnCount) {
    let i;
    let j;

    if (rowColumnCount != 16) {

        i = Math.sqrt(rowColumnCount);
        
    } else {

        i = 16;

    }

    j = (500 / i);

    document.querySelector("#grid-container").style.gridTemplateRows = "repeat("+i+", "+j+"px)";
    document.querySelector("#grid-container").style.gridTemplateColumns = "repeat("+i+", "+j+"px)";
}

//draw the grid
calculateGridDim();

myGrid(gridDim);

changeRowColumnCount(gridDim);

//remove all cells in the grid
function removeAllCells (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//event listeners
//pick a color
document.querySelector("#random").addEventListener("click", function() {
    cellColor = "random";
}, false);
document.querySelector("#black").addEventListener("click", function() {
    cellColor = "black";
}, false);
document.querySelector("#red").addEventListener("click", function() {
    cellColor = "red";
}, false);
document.querySelector("#blue").addEventListener("click", function() {
    cellColor = "blue";
}, false);
document.querySelector("#yellow").addEventListener("click", function() {
    cellColor = "yellow";
}, false);
document.querySelector("#green").addEventListener("click", function() {
    cellColor = "green";
}, false);
//find the ID of the clicked cells and recolor them on mouseover
document.querySelector("#grid-container").addEventListener("mousemove", function (e) {
    let myElement = e.target || e.srcElement;

    switch(cellColor) {
        case "black":
            document.querySelector("#"+myElement.id).style.backgroundColor = "#000000"; //fills cells with black
            break;
        case "red":
            document.querySelector("#"+myElement.id).style.backgroundColor = "#FF0000"; //fills cells with red
            break;
        case "blue":
            document.querySelector("#"+myElement.id).style.backgroundColor = "#0000FF"; //fills cells with blue
            break;
        case "yellow":
            document.querySelector("#"+myElement.id).style.backgroundColor = "#FFFF00"; //fills cells with yellow
            break;
        case "green":
            document.querySelector("#"+myElement.id).style.backgroundColor = "#00FF00"; //fills cells with green
            break;
        case "random":
            document.querySelector("#"+myElement.id).style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16); //fills the cells w/ a random color
            break;
        default:
            document.querySelector("#"+myElement.id).style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16); //fills the cells w/ a random color
    }
}, false); //change the background colors on mousemove
document.querySelector("#change-grid").addEventListener("click", function() {  //when the button is clicked, clear the grid and draw it again based on user input
    getInputValue();
    removeAllCells(GRIDCONT);
    myGrid(gridDim);
    changeRowColumnCount(gridDim);
    INPUTAREA.value = "";
}, false);
document.querySelector("#reset-button").addEventListener("click", function() {  //when the button is clicked, clear the grid and draw it again based on the initial measurements
    removeAllCells(GRIDCONT);
    calculateGridDim ();
    myGrid(gridDim);
    changeRowColumnCount(gridDim);
    INPUTAREA.value = "";
    cellColor = "random";
}, false);
document.querySelector("#user-input-field").addEventListener("keypress", function (e) {  //when the "Enter" key is pressed, the action should be the same as if the button was clicked
    if (e.key === "Enter") {
        getInputValue();
        removeAllCells(GRIDCONT);
        myGrid(gridDim);
        changeRowColumnCount(gridDim);
        INPUTAREA.value = "";
        cellColor = "random";
    }
}, false);