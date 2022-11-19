const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];
const clear = document.getElementById("clear");
const check = document.getElementById("check");
const uncheck = document.getElementById("uncheck")

//this function only add the things entered in the form into an array of objects 
function addItem(e){
    e.preventDefault()
    // console.log("aples")
    const name = (this.querySelector("[name=item")).value
    const item = {
        text : name,
        done : false
    };

    items.push(item)
    populateList(items, itemsList)
    localStorage.setItem("items", JSON.stringify(items))

    this.reset()
    // console.table(items)
}

//this function adds the list items to the html and render it on screen
//plates [] is an arrray which we will be passing the items array which contains all of our entered foods
// plateslist if  the place where out actual html is going to be rendered i.e itemsList
function populateList(plates = [], platesList){

    platesList.innerHTML = plates.map((element, i)=>{
        // console.log( plates[i].done)
        return`
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${element.done ? "checked":""}/>
            <label for="item${i}">${element.text}</label>
        <li>
        `;
    }).join("");
}

//event delegation
function toggleDone(e){
     if(!e.target.matches("input")) return; //skips and reurns if the clicked thing is an input
    
    let index = e.target.dataset.index;
  
    items[index].done = !items[index].done
    // console.log(items[index].done)
     localStorage.setItem("items", JSON.stringify(items))
    populateList(items, itemsList)
}

function clearScreen(){
    // console.log("apples")
    localStorage.clear()
    items.length = 0;
    populateList(items, itemsList)

}
function checkAll (){
console.log(items)
items.map((element)=>{
    element.done = true;
    localStorage.setItem("items", JSON.stringify(items));
})
populateList(items, itemsList)

}

function uncheckAll (){
    console.log(items)
    items.map((element)=>{
        element.done = false;
        localStorage.setItem("items", JSON.stringify(items));
    })
    populateList(items, itemsList)
    
    }



addItems.addEventListener("submit", addItem )
itemsList.addEventListener("click", toggleDone )
clear.addEventListener("click",clearScreen)
check.addEventListener("click",checkAll)
uncheck.addEventListener("click",uncheckAll)


populateList(items, itemsList)


