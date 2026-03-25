import Todos from "./index.js"
import "./style.css"
import sidebaricon from "./icons/sidebar.svg"

let todo = new Todos("","","","")
function createLink(path,classname){
    let link = document.createElement("a")
    link.href = path
    link.className = classname

    return link
}
const body = document.querySelector("#container")
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