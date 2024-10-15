const inputBox = document.getElementById('input-box')
const list = document.getElementById('list-container')

function addTask(){
if(inputBox.value == '') {alert("You must enter something")
    }
else{
        let li = document.createElement("li")
        li.innerHTML = inputBox.value
        list.appendChild(li)
        createTask(li)
    }
    inputBox.value = ''
    saveData()
}


list.addEventListener("click", function(e){ // useful to change the element in HTML without creating it
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        saveData()
    }
    else if (e.target.tagName === "SPAN" && !e.target.classList.contains("update"))
    {
        e.target.parentElement.remove()
        saveData()
    }
    else if (e.target.tagName === "SPAN" && e.target.classList.contains("update"))
    {
        // The point is to chane the li content, not the direct SPAN tag
       let li = e.target.parentElement  // Get the parent li element
       let currentText = li.firstChild.textContent.trim() // Get the current text of the li (not the span)


       let input = document.createElement("input") // create the input element
       input.type = "text"
       input.value = currentText
       li.innerHTML = '' // clear the li temporaly
       li.appendChild(input) // Append the input into the li
       input.focus() //focus in the input box


       input.addEventListener("blur", function () {
        li.innerHTML = input.value
        createTask(li)
        saveData(); // Save after updating
       })
    }
},false)

function createTask (li) {
    let span = document.createElement("span")
    span.innerHTML = "\u00d7"
    let update = document.createElement("span")
    update.classList.add("update")
    update.innerHTML = "&#10000"

    li.appendChild(update)
    li.appendChild(span)
}

function saveData(){
    localStorage.setItem("data",list.innerHTML) // making the Task save in local Storage
}

function showTask(){
    list.innerHTML = localStorage.getItem("data");
}
showTask();

// create Function to Modify data
// create a list to add smaller task to big task