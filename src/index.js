console.log("hello")



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

export default Todos