import React, {useState, useEffect} from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import Task from './Task';
import uuid from 'react-uuid';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import db from './firebase'; 


const onDragEnd = (result, columns, setColumns) => {

  if(!result.destination) return;

  const {source, destination} = result; 


  if (source.droppableId !== destination.droppableId){

    const startingColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const startingTasks = [...startingColumn.tasks];
    const destinationTasks  = [...destinationColumn.tasks];

    const[removed] = startingTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, removed);
    
    setColumns({
      ...columns, 
      [source.droppableId]: {
        ...startingColumn, 
        tasks: startingTasks
      }, 
      [destination.droppableId]: {
        ...destinationColumn ,
        tasks: destinationTasks
      }
    })



  } else{

    const column = columns[source.droppableId]; 
    const copyOfItems  = [...column.tasks]
  
    const[removed] = copyOfItems.splice(source.index, 1); 
    copyOfItems.splice(destination.index, 0, removed); 
    setColumns ({
      ...columns, 
      [source.droppableId]: {
        ...column, 
        tasks: copyOfItems
  
      }
    })


  }

}

function App() {

  const [input, setInput] = useState(''); 
  const [typedTasks, settypedTasks] = useState([{id:uuid(), text: ''}]);

    
  const sendTask = (event) => {
    event.preventDefault(); 

    db.collection('Tasks').add({
      text: input, 
      id: uuid(), 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  useEffect(() => {

    db.collection('Tasks')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      settypedTasks(snapshot.docs.map(doc =>doc.data()))

    });

  }, [])




 

  console.log(typedTasks)

  console.log("Hello")


  const MajorTaskColumns = 
  {
    [uuid()]: {
      name: 'TODOs', 
      tasks: typedTasks

    }, 

    [uuid()]: {
      name: 'IN PROGRESS', 
      tasks: []
    }, 

    [uuid()]:{
      name: 'TO VERIFY', 
      tasks: []
    }, 

    [uuid()]: {
      name: 'DONE', 
      tasks: []
    }
  };


  const [columns, setColumns]  = useState (MajorTaskColumns);

  return (

    <div> 

    <div style =  {{alignItems:'center', justifyContent: 'space-between', marginLeft: 70, marginRight: 70, backgroundColor: 'lightgray'}}>
      <form style = {{display: 'flex', alignItems: 'center'}}>

        <FormControl style = {{display: 'flex'}}>
          <InputLabel>Enter a ToDo Task</InputLabel>
          <Input  value = {input} onChange  = {event => setInput(event.target.value)} />
          <Button disabled = {!input } variant='contained' color = 'primary' type = 'submit' onClick={sendTask}>Send Task</Button>

        </FormControl>
      </form>

    </div>

    <div style = {{ display: 'flex', justifyContent:'center', height: '100%'}}>

      
      <DragDropContext onDragEnd = {result => onDragEnd(result, columns, setColumns)}>
      
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>{column.name}</h2>
            <div style = {{margin: 8}}>
            <Droppable droppableId = {id}>
              {(provided, snapshot) => {
                return(

                  <div 
                  {...provided.droppableProps} 
                  ref  = {provided.innerRef} 
                  style = {{
                    backgroundColor: snapshot.isDraggingOver ? 'grey': 'lightgreen',
                    padding: 6,
                    width: 300,  
                    minHeight: 400
                  }}
                  >
                    {column.tasks.map((task, index) => {

                      

                      return(

                      

                        <Draggable key  = {task.id} draggableId = {task.id} index = {index}>
                          {(provided, snapshot) => {

                            return (
                              <div 
                              ref = {provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style = {{
                                
                                userSelect: 'none',
                                padding: 18,
                                margin: '0 0 10px 0',
                                minHeight: '40px',
                                backgroundColor:  snapshot.isDragging ? 'yellow' : 'red',
                                ...provided.draggableProps.style
                              }}
                              >

                                

                                {

                                typedTasks.map(eachTask => (

                                  <Task id = {eachTask.id} text = {eachTask.text}/>


                                ))
                          }

                              </div>


                            )
                          }}


                        </Draggable>
                      
                      );
                    })}
                    {provided.placeholder}
                    
                    
                  </div>
                )
              }}
              
              </Droppable>
              </div>
              </div>
          )

            })}

      </DragDropContext>

    </div>

    </div>
  );
}

export default App;
