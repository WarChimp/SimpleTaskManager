const newtask = document.getElementById("new-task-form")
const taskArea = document.getElementById("tasks")
let taskCounter = 0
let listOfTasks = []
const saveButton = document.getElementById("save")
saveButton.addEventListener("click", function(){
    addToStorage()
})

retrieveStorage()

newtask.addEventListener("submit", function(event){
    event.preventDefault();
    const data = new FormData(newtask);
    let taskName = data.get("taskname")
    addTask(taskName)
    newtask.reset()
    console.log(data.get("taskname"))
    console.log("new task added")
})

function addTask(task){
    const li = document.createElement("li")
    const checkbox = document.createElement("button")
    const currentCounter = taskCounter
    const icon = document.createElement("i")
    const div = document.createElement("div")
    div.classList.add("card-body")
    icon.classList.add("bi-pin-angle")
    checkbox.type = "button"
    checkbox.innerHTML = "Complete"
    checkbox.classList.add("btn", "btn-primary")

    
    li.innerHTML = task 
    //taskArea.appendChild(div)
    taskArea.appendChild(li)
    taskArea.appendChild(icon)
    li.appendChild(checkbox)

    console.log("before storage counter: ", taskCounter)
    listOfTasks.push(task)
    const taskIndex = listOfTasks.length-1
    //addToStorage(task)
    console.log("after storage counter: ", taskCounter)
    checkbox.addEventListener("click", function(){
        const sup = document.createElement("s")
        const taskName = li.innerText
        li.innerText = ""
        console.log("on event: " + currentCounter)
        checkbox.disabled = true
        li.insertAdjacentElement('afterbegin', sup)
        li.insertAdjacentElement('beforeend', checkbox)
        sup.innerHTML = taskName
        listOfTasks.splice(taskIndex, 1)
  
    })
}

function reloadTask(task, index){
    const li = document.createElement("li")
    const checkbox = document.createElement("button")
    const icon = document.createElement("i")
    const div = document.createElement("div")
    div.classList.add("card-body")
    icon.classList.add("bi-pin-angle")
    checkbox.type = "button"
    checkbox.innerHTML = "Complete"
    checkbox.classList.add("btn", "btn-primary")

    listOfTasks.push(task)
    li.innerHTML = task 
    //taskArea.appendChild(div)
    taskArea.appendChild(li)
    taskArea.appendChild(icon)
    li.appendChild(checkbox)

    checkbox.addEventListener("click", function(){
        const sup = document.createElement("s")
        const taskName = li.innerText
        checkbox.disabled = true

        li.innerText = ""

        li.insertAdjacentElement('afterbegin', sup)
        li.insertAdjacentElement('beforeend', checkbox)
        sup.innerHTML = taskName
        console.log("before removal: ", listOfTasks)
        listOfTasks.splice(index, 1)
        console.log("after removal: ", listOfTasks)
    })
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    addToStorage()
});

function addToStorage(){
    localStorage.setItem("tasks", JSON.stringify(listOfTasks))
}

function retrieveStorage(){
    if (localStorage.length <= 0) {
        return
    }
    const oldTasksString = localStorage.getItem("tasks")
    const arrayTasks = JSON.parse(oldTasksString)
    localStorage.clear()
    for(var i = 0; i < arrayTasks.length; i++){
        const oldTask = arrayTasks[i]
        reloadTask(oldTask, i)
    }

}