const notesContainer = document.querySelector(".note-container")
const createBtn = document.querySelector(".btn")
let paragraphArea = document.querySelector(".input-box")
let i = 0
retrieveNote()

createBtn.addEventListener('click', () =>{
    addNote()
    i++
    saveNote()
} )
notesContainer.addEventListener('click', (e) => 
    {
        deleteNote(e)
        saveNote()
    }
)

document.addEventListener("keydown", event => {
    if(event.key === "Enter")
    {
        document.execCommand("insertLineBreak")
        event.preventDefault();
    }
})

function saveNote() {
    localStorage.setItem("note",notesContainer.innerHTML)
}
function retrieveNote(){
    const savedNotes = localStorage.getItem("note")
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes}
    else
    {
        alert("there is no data on local storage")
    }
}

function deleteNote(e) {
    if(e.target.tagName === "IMG")
        {
            e.target.parentElement.remove()
        }  
    else if (e.target.tagName === "P")
    {
        notes = document.querySelectorAll(".input-box")
        notes.forEach(element => {
            element.onkeyup = function(){
                saveNote()
            }
        });
    }
}

function addNote () {
    let noteParagraph = document.createElement("p")
    let img = document.createElement("img")
    noteParagraph.classList.add("input-box")
    noteParagraph.setAttribute("contenteditable", "true")

    noteParagraph.textContent = `Note ${i}` // add this so the cusor point to this instead of picture

    img.src = "./images/delete.png"
  
    // Append the image after the text
    noteParagraph.appendChild(img);

     // Append the note to the container
    notesContainer.appendChild(noteParagraph)
 
    //notesContainer.appendChild(noteParagraph).appendChild(img) THIS MAKE THE NOTE CUSOR STARTS NEAR DELETE IMAGE

     // Focus on the paragraph and set cursor to the start of the text
    noteParagraph.focus();
      
}

//localStorage.removeItem("note"); 