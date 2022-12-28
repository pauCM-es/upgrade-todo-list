//pasos

// boton + -> coge el texto del input (si no esta vacio) y crea un li con ese textContent
// la TASK (li) un boton delete --> elimina del listado ese elemento.
// Si el listado no tiene TASK --> div "empty" se muestra.
// boton para deshacer el ultimo borrado?? que se guarde en una variable antes de borrar 
// Poder editar las TASK --> boton que edite el textContent de ese elemento.accordion-body
  // - btn-edit --> sustituye el li por un input con el mismo textContent y el btn-edit por uno de OK
    // el btn-OK --> sustituira el textContent de este input por el del TASK, ocultara el input-edit con su btn-OK

    
    
    
const input$$ = document.querySelector("input")
const btnAdd$$ = document.querySelector(".btn-add")
const list$$ = document.querySelector("ul")
const empty$$ = document.querySelector(".empty")
let lastTaskDeleted = ""


const checkEmptyInput = (input) => {
  if (input.value === "")  {
    return false} else {return true}
}

const checkAllTasksCompleted = () => {
  if (list$$.childElementCount === 0)  
  {return true } else {return false}
}

const deleteTask = (e) => {
  const task = e.target.parentElement
  lastTaskDeleted = task.textContent
  console.log(task)
  task.remove()
  checkAllTasksCompleted() && empty$$.classList.remove("display-none")
}

const addTask = (e, text) => {
  e.preventDefault()
  const newTask$$ = document.createElement("li")
  list$$.appendChild(newTask$$)
  newTask$$.textContent = text

  const btnDelete$$ = document.createElement("button")
  newTask$$.appendChild(btnDelete$$)
  btnDelete$$.textContent = "x"
  btnDelete$$.className = "btn-delete"
  btnDelete$$.addEventListener("click", (e) => deleteTask(e))

  //reset the input to empty
  input$$.value = ""
}




btnAdd$$.addEventListener("click", (e) => {
  checkEmptyInput(input$$) && addTask(e, input$$.value)
  !checkAllTasksCompleted() && empty$$.classList.add("display-none")
  }
)




