import {tasklist, submittask,createLayout} from "./index.js"
import "./style.css"
import sidebaricon from "./icons/sidebar.svg"
import addicon from "./icons/plus-circle.svg"

let colors = ["#D1453B","#EB8909","#246FE0","black"]
export default colors

const body = document.querySelector("#container")

function createLink(path,classname){
    let link = document.createElement("a")
    link.href = path
    link.className = classname

    return link
}

let sidebar = document.createElement("sidebar")
let clickCount = 0 
sidebar.id = "sidebar"
let link = createLink("javascript:void(0)","closebtn")
sidebar.appendChild(link)
body.appendChild(sidebar)
let div = document.querySelector("#main")
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

/*Add task button*/
let addbutton = document.createElement("button")
let addicons = document.createElement("img")
let modal = document.querySelector("#task-form")
addicons.id="add-icon"
addicons.src = addicon
addicons.style.filter = "invert(39%) sepia(37%) saturate(2327%) hue-rotate(334deg) brightness(94%) contrast(85%)"
addbutton.className = "sidebar-buttons"
addicons.style.width = "20px"
addbutton.style.marginTop = "50px"
addicons.style.height = "20px"
addbutton.textContent = "Add task"
addbutton.style.color = "#DF5141"
addbutton.style.textAlign = "center"
addbutton.style.fontSize = "15px"
addbutton.style.fontWeight = "900"
addbutton.popoverTargetElement = modal
addbutton.addEventListener("click",() => modal.showModal())
let closebutton = document.querySelector("#close-btn")
let submitbutton = document.querySelector("#submit-form")
closebutton.addEventListener("click",() => modal.close())
addbutton.prepend(addicons)
sidebar.appendChild(addbutton)   

/*priorities coloring (needs work)
let submit = document.querySelector("#priority")
let flagicon = document.createElement("img")
flagicon.src = flag
let filter = ["invert(36%) sepia(85%) saturate(1437%) hue-rotate(325deg) brightness(91%) contrast(92%)","invert(65%) sepia(87%) saturate(2811%) hue-rotate(360deg) brightness(101%) contrast(106%)","invert(36%) sepia(85%) saturate(2250%) hue-rotate(200deg) brightness(97%) contrast(89%)"]
flagicon.style.width = "20px"
flagicon.style.height = "20px"
*/
/* Today's tasks*/

submitbutton.addEventListener("click",submittask)

function clearContent(text){
    let space = document.getElementById("today")
    space.innerHTML = ""
    let heading = document.createElement("h2")
    heading.textContent = "Project : " + text  
    heading.style.margin = "0"
    space.appendChild(heading)
    let view = tasklist.filter(task => task.project === text)
    console.log("here")
    console.log(view)
    for (const tsk of view){
        createLayout(tsk)
    }

}

/*navigate through projects*/
let projectlist = document.createElement("div")
projectlist.className = "nav-container" 
projectlist.style.width = "200px"
projectlist.style.cursor = "pointer"
projectlist.style.userSelect = "none"
let header = document.createElement("div")
header.id = "projects-toggle"
header.className = "nav-header"
header.style.display = "flex"
header.style.alignItems = "center"
header.style.padding = "10px"
header.style.borderRadius = "4px"
let title = document.createElement("span")
title.className = "special"
title.textContent = "My projects"

header.appendChild(title)
projectlist.appendChild(header)

sidebar.appendChild(projectlist)
let navlist = document.createElement("ul")
navlist.className = "nav-list"
navlist.addEventListener("click", function(event) {
  // Check if the clicked element (event.target) is an LI
  if (event.target && event.target.matches("li")) {
    event.target.classList.add("active");
    clearContent(event.target.textContent)
  }
});

projectlist.append(navlist)
const toggle = document.getElementById('projects-toggle');
const container = toggle.parentElement;
toggle.addEventListener('click', () => {
  container.classList.toggle('open');
});

/*Add project and select */
let combo = document.querySelector("#combo-input")
let options = document.querySelector("#combo-options")
let items = []
function selectItem(val) {
  combo.value = val;
  options.style.display = 'none';
}

function addItem(val) {
  items.push(val); // Add to our data array
  selectItem(val); // Select it
}

function renderList(filter = "") {
    options.innerHTML = ""
    const filtered = items.filter(item => item.toLowerCase().includes(filter.toLowerCase()))

    // Show matches : If you didn't filter , it shows everything 
    filtered.forEach(item => {
        const option = document.createElement("div")
        option.className = "option-item"
        option.textContent = item
        option.onclick = () => selectItem(item)
        options.appendChild(option)

    })

    //add button 
    if( filter && !items.find(i => i.toLowerCase() === filter.toLowerCase())){
        const addDiv = document.createElement("div")
        addDiv.className = "new-option"
        addDiv.textContent = `Add ${filter}`
        addDiv.onclick = () => {
            addItem(filter)
            let li = document.createElement("li")
            li.textContent = filter
            li.style.color = "black"
            li.style.cursor = "pointer"
            li.style.fontStyle = "italic"
            navlist.appendChild(li)



        }
        options.appendChild(addDiv)
    }
    options.style.display = (filtered.length > 0 || filter) ? 'block' : 'none'

}
combo.addEventListener('input',(e) => renderList(e.target.value))



for (let prj of items){
    let li = document.createElement("li")
    li.textContent = prj
    li.style.cursor = "pointer"
    li.style.fontStyle = "italic"
    navlist.appendChild(li)
   

}
