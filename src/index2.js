import Todos from "./index.js"
import "./style.css"
import sidebaricon from "./icons/sidebar.svg"
import addicon from "./icons/plus-circle.svg"


let todo = new Todos("","","","")
const body = document.querySelector("#container")

function createLink(path,classname){
    let link = document.createElement("a")
    link.href = path
    link.className = classname

    return link
}
function createSidebar(){
    let sidebar = document.createElement("sidebar")
    let clickCount = 0 
    sidebar.id = "sidebar"
    let link = createLink("javascript:void(0)","closebtn")
    sidebar.appendChild(link)
    body.appendChild(sidebar)
    let div = document.createElement("div")
    div.id = "main"
    let openbutton = document.createElement("button")
    let icon = document.createElement("img")
    icon.id="main-icon"
    icon.src = sidebaricon
    icon.style.width = "20px"
    icon.style.height = "20px"
    openbutton.prepend(icon)
    openbutton.className="openbtn"
    openbutton.style.border = "none"
    openbutton.style.backgroundColor = "white"
    openbutton.addEventListener("click",() => {
        clickCount+=1
        if(clickCount == 1){
            document.getElementById("sidebar").style.width = "250px"
            document.getElementById("main").style.marginLeft = "250px"
        }
        else if (clickCount == 2){
            document.getElementById("sidebar").style.width = "0"
            document.getElementById("main").style.marginLeft = "0"

        }
        else clickCount=0
        
    })

    div.appendChild(openbutton)
    body.appendChild(div)
    /*Add task button*/
    let addbutton = document.createElement("button")
    let addicons = document.createElement("img")
    let modal = document.querySelector("#task-form")
    addicons.id="add-icon"
    addicons.src = addicon
    addicons.style.filter = "invert(39%) sepia(37%) saturate(2327%) hue-rotate(334deg) brightness(94%) contrast(85%)"
    addbutton.className = "sidebar-buttons"
    addicons.style.width = "20px"
    addicons.style.height = "20px"
    addbutton.textContent = "Add task"
    addbutton.style.color = "#DF5141"
    addbutton.style.textAlign = "center"
    addbutton.style.fontSize = "20px"
    addbutton.style.fontWeight = "bold"
    addbutton.popoverTargetElement = modal
    addbutton.addEventListener("click",() => modal.showModal())
    let closebutton = document.querySelector("#close-btn")
    closebutton.addEventListener("click",() => modal.close())
    addbutton.prepend(addicons)
    sidebar.appendChild(addbutton)

    }


createSidebar()
