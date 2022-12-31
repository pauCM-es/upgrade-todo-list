//pasos

// ✅ boton + -> coge el texto del input (si no esta vacio) y crea un li con ese textContent
// ✅ la TASK (li) un boton delete --> elimina del listado ese elemento.
// ✅ Si el listado no tiene TASK --> div "empty" se muestra.
// ✅ boton para deshacer el ultimo borrado?? que se guarde en una variable antes de borrar 
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
  const task$$ = e.target.parentElement
  lastTaskDeleted = task$$.textContent
  lastTaskDeleted = lastTaskDeleted.slice(0, -1) //se guarda la x del boton y asi la quitamos
  task$$.remove()
  checkAllTasksCompleted() && empty$$.classList.remove("display-none")
}

const editTask = (e) => {
  const task$$ = e.target.parentElement
  //se crean los elementos
  const editDiv$$ = document.createElement("div")
  editDiv$$.className = "edit-task"
  const editInput$$ = document.createElement("input")
  editInput$$.className = "edit-task__input"
  editInput$$.value = e.path[1].children[0].textContent
  const confirmEditBtn$$ = document.createElement("button")
  confirmEditBtn$$.className = "edit-task__btn-confirm"
  confirmEditBtn$$.textContent = "OK"

  task$$.appendChild(editDiv$$)
  editDiv$$.appendChild(editInput$$)
  editDiv$$.appendChild(confirmEditBtn$$)

  editInput$$.focus()

  //task elements toggle visibility (p, confirmEditBtn y deleteBtn)
  const toggleVisibility = (pathIndex, childrenIndex) => {
    for (let i = 0; i < childrenIndex.length; i++) {
      const childIndex = childrenIndex[i];
      const element = e.path[pathIndex].children[childIndex]
      element.classList.toggle("display-none")
    }
  }
  toggleVisibility(1, [0,1,2]) // hide task elements


  //confirm task edited
  const confirmEdit = (event) => {
    const contentEdited = event.path[1].children[0].value
    event.path[2].children[0].textContent = contentEdited //p content

    // remove edit elements
    editDiv$$.remove()

    //show task elements
    toggleVisibility(1, [0,1,2])
  }

  confirmEditBtn$$.addEventListener("click", (event) => confirmEdit(event))
}

const addTask = (e, text) => {
  e.preventDefault()
  const newTask$$ = document.createElement("li")
  list$$.appendChild(newTask$$)
  const newTaskText$$ = document.createElement("p")
  newTask$$.appendChild(newTaskText$$)
  newTaskText$$.textContent = text
  
  const btnEdit$$ = document.createElement("button")
  newTask$$.appendChild(btnEdit$$)
  btnEdit$$.textContent = "E"
  btnEdit$$.className = "btn-edit"
  btnEdit$$.addEventListener("click", editTask)

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





