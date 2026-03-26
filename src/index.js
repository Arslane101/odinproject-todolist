console.log("hello")
const submit = document.querySelector("#submit-form")
const dialog =document.querySelector("#task-form")
const form = document.querySelector("#form-task")


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
}

let tasklist = []
function submittask(event){
    event.preventDefault()
    let formData = new FormData(form,submit)
    dialog.close()
    let array = Array.from(formData.values())
    let task = new Todos(...array)
    tasklist.push(task)
    console.log(tasklist)

    console.log("hey")

    

}

export  {Todos,submittask}