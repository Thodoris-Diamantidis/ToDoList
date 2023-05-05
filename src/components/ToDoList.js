import {useState} from 'react'
import React from 'react'


export function ToDoList() {

  const [tasks,setTasks] = useState([])

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      if(event.target.value.length > 0){
        const newTask = event.target.value
        setTasks([...tasks, newTask])
        event.target.value = ''}
      else{
        alert("Task must have a name")
      }
    }
  }

  const handleDragStart = (event, index) => {
    // Each drag event has a dataTransfer property that holds the event's data. 
    // This property (which is a DataTransfer object) also has methods to manage drag data.
    //  The setData() method is used to add an item to the drag data
    event.dataTransfer.setData('text/plain', index)

// The dropEffect property is used to control the feedback the user is given during a drag-and-drop operation.
//  It typically affects which cursor the browser displays while dragging. For example, when the user hovers over a drop target,
//   the browser's cursor may indicate the type of operation that will occur.

// Three effects may be defined:

// copy indicates that the dragged data will be copied from its present location to the drop location.
// move indicates that the dragged data will be moved from its present location to the drop location.
// link indicates that some form of relationship or connection will be created between the source and drop locations.
    event.dataTransfer.dropEffect = 'move'
  }

//SUPER SOS
// By default, the browser prevents anything from happening when dropping something onto most HTML elements.
//  To change that behavior so that an element becomes a drop zone or is droppable,
//   the element must have both ondragover and ondrop event handler attributes.

//each handler calls preventDefault() to prevent additional event processing for this event (such as touch events or pointer events).

  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (event, index) => {
    event.preventDefault()
    //retrieves the index of the task that is being dragged from the dataTransfer object that was set during the dragstart event.
    const dragIndex = event.dataTransfer.getData('text/plain')
    // creates a new array containing the same elements as the tasks array.
    const newTasks = [...tasks]
    //removes the dragged task from the newTasks array and assigns it to the draggedTask variable using array destructuring.
    const [draggedTask] = newTasks.splice(dragIndex,1)
    //inserts the draggedTask back into the newTasks array at the drop index index.
    newTasks.splice(index, 0, draggedTask)
    //updates the tasks state with the new sorted tasks.
    setTasks(newTasks)
  }

  return (
    <section className='todolist'>
        <div>
            <h1>THING TO DO</h1>
            <input
              className="input-add"
              type="text" size="35"
              placeholder='Add new task'
              onKeyDown={handleKeyDown}
            />

            {tasks.length > 0 && (
            <div className='checkbox-container'>
              <ul className='ks-cboxtags'>
                {tasks.map((task, index) => (
                  <li 
                  key={index}
                  draggable
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, index)}
                  >
                    <input type="checkbox" id={`task-${index}`}/>
                    <label htmlFor={`task-${index}`}>{task}</label>
                  </li>
                ))}
              </ul>
            </div>
            )}
        </div>
    </section>
  )
}
