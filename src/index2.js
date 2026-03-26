import {Todos, submittask} from "./index.js"
import "./style.css"
import sidebaricon from "./icons/sidebar.svg"
import addicon from "./icons/plus-circle.svg"
import flag from "./icons/flag.svg"

let colors = ["#D1453B","#EB8909","#246FE0","white"]

let todo = new Todos("","","","")

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
addbutton.style.fontSize = "15px"
addbutton.style.fontWeight = "900"
addbutton.popoverTargetElement = modal
addbutton.addEventListener("click",() => modal.showModal())
let closebutton = document.querySelector("#close-btn")
let submitbutton = document.querySelector("#submit-form")
closebutton.addEventListener("click",() => modal.close())
addbutton.prepend(addicons)
sidebar.appendChild(addbutton)   

/*priorities coloring*/
let submit = document.querySelector("#priority")
let flagicon = document.createElement("img")
flagicon.src = flag
let filter = ["invert(36%) sepia(85%) saturate(1437%) hue-rotate(325deg) brightness(91%) contrast(92%)","invert(65%) sepia(87%) saturate(2811%) hue-rotate(360deg) brightness(101%) contrast(106%)","invert(36%) sepia(85%) saturate(2250%) hue-rotate(200deg) brightness(97%) contrast(89%)","white"]
flagicon.style.filter = filter[0]
submit.options["0"].prepend(flagicon)
for (let i=1;i<colors.length;i++){
    let clone = flagicon.cloneNode(true)
    clone.style.filter = filter[i]
    submit.options[toString(i)].prepend(clone)
    
}
/* Today's tasks*/
let todaydiv = document.createElement("div")
let todaytitle = document.createElement("h2")
todaytitle.textContent = "Today"
todaydiv.appendChild(todaytitle)
todaytitle.style.margin = "0"
div.append(todaydiv)

submitbutton.addEventListener("click",submittask)

