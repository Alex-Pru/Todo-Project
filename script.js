function clock(){

const today = new Date()

let h = today.getHours()
let m = today.getMinutes()
let s = today.getSeconds()
m = checkTime(m)
s = checkTime(s)
document.querySelector("#clockContainer").innerHTML = h + ":" + m + ":" + s;
setTimeout(clock, 1000)


}

function checkTime(i) {
    if (i < 10) {i = "0" + i}
    return i
}

const arrayItems = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

console.log(arrayItems)

document.querySelector("#enter").addEventListener("click", () => {
const item = document.querySelector("#item")
createItem(item)


})

function createItem(item){
    arrayItems.push(item.value)
    localStorage.setItem("items", JSON.stringify(arrayItems))
    location.reload()
}

function displayItems(){
    let items = ""
    for(let i = 0; i < arrayItems.length; i++){
        items +=    `<li>
                    <div class="input-controller">
                    <textarea disabled>${arrayItems[i]}</textarea>
                    </div>
                    <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                    </div>
                    <div class="update-controller">
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                    </div>
                    </li>`
    }
    document.querySelector(".todo-body-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {  
        db.addEventListener("click", () =>{
            deleteItem(i)
        })
        
    });
}
function deleteItem(i) {
    arrayItems.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(arrayItems))
    location.reload()
}

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () =>{
            updateController[i].style.display = "flex"
            inputs[i].disabled = false

        })
    })
}

function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () =>{

            updateItem(inputs[i].value, i)
        })
    })
}

function updateItem(text, i){
    arrayItems[i] = text
    localStorage.setItem("items", JSON.stringify(arrayItems))
    location.reload()
}

function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")

    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none"
            inputs[i].disabled = true
            
        })
    })
}



window.onload = function(){
    clock()
    displayItems()
}