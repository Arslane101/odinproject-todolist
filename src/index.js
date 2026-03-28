const submit = document.querySelector("#submit-form")
const dialog =document.querySelector("#task-form")
const form = document.querySelector("#form-task")
const data = document.querySelector("#combo-input")
import {isToday} from "date-fns"
import colors  from "./index2.js"
class Todos {
    constructor(title, description , dueDate, priority){
        this.description = description
        this.title = title
        this.dueDate = dueDate
        this.priority = priority
        this.project = "default"


        }
        getDescription() {
            return `${this.description}`
        }
        getTitle() {
            return `${this.title}`
        }
        setProject(project) {
            this.project = project
        }
        getDate() {
            return `${this.dueDate}`
        }
}
function createLayout(task){
    let today = document.querySelector("#today")
    /*space */
    let taskspace = document.createElement("div")
    taskspace.style.display = "grid"
    taskspace.style.borderBottom = "1px solid lightgrey"
    taskspace.style.paddingBottom = "5px"
    taskspace.style.gridTemplateColumns = ".5fr 2fr 1fr"
    taskspace.style.alignItems = "center"
    taskspace.style.transition = "all 0.5s ease"
    let titledesc = document.createElement("div")
    titledesc.style.display = "flex"
    titledesc.style.flexDirection = "column"

    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.id= "completed"
    checkbox.addEventListener("change",() => {
        const styles = document.styleSheets[0]
        if(checkbox.checked) {
            styles.insertRule(":checked { background-color:"+ colors[4-parseInt(task.priority.at(1))] + "}")
            checkbox.classList.add("checked")
            taskspace.style.opacity = "0"
            taskspace.style.transform = "translateX(50px)"
            taskspace.style.maxHeight = "0"
            taskspace.style.pointerEvents = "none"
            taskspace.addEventListener('transitionend',() => {
                taskspace.remove()
            },{once : true})
            
        }
            else {
                checkbox.classList.remove("checked")
                styles.deleteRule(0)
            }
    })
    checkbox.style.appearance = "none"
    checkbox.style.width = "20px"
    checkbox.style.height = "20px"
    checkbox.style.borderRadius = "50%"
    checkbox.style.border = "2px solid "+ colors[4-parseInt(task.priority.at(1))]
    

    let title = document.createElement("p")
    title.style.marginBottom = "4px"
    title.style.fontSize = "25px"
    title.style.fontWeight = "bold"
    title.textContent = task.getTitle()

    
    let description = document.createElement("p")
    description.style.marginTop = "0"
    description.textContent = task.getDescription()

    today.append(taskspace)
    taskspace.append(checkbox)
    taskspace.append(titledesc)
    titledesc.append(title)
    titledesc.append(description)

    if(isToday(task.dueDate) === false){
        let dueDate = document.createElement("p")
        dueDate.textContent = task.dueDate
        taskspace.appendChild(dueDate)


    }

    

}
let tasklist = []
function submittask(event){
    event.preventDefault()
    let formData = new FormData(form,submit)
    
    dialog.close()
    let array = Array.from(formData.values())
    console.log(array)
    let task = new Todos(...array)
    if(data.value !== "default") task.setProject(data.value)
    tasklist.push(task)
    console.log(task)
    if(isToday(task.getDate())=== true) createLayout(task)
    
    

}

export  {Todos,submittask,tasklist,createLayout}