import React, {useState, useEffect} from 'react';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import uuid from 'react-uuid';

//import db from './firebase'; 

const listOfInputTasks = [

  {id: uuid(), content: 'Task 1'}, 
  {id: uuid(), content: 'Task 2'}, 
  {id: uuid(), content: 'Task 3'}, 
  {id: uuid(), content: 'Task 4'}
];




const MajorTaskColumns = 
  {
    [uuid()]: {
      name: 'TODOs', 
      tasks: listOfInputTasks

    }, 

    [uuid()]: {
      name: 'IN Progress', 
      tasks: []
    }, 

    [uuid()]:{
      name: 'To Verify', 
      tasks: []
    }, 

    [uuid()]: {
      name: 'Done', 
      tasks: []
    }
  };

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
  const [columns, setColumns]  = useState (MajorTaskColumns);

  return (
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
                                

                                {task.content}


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
  );
}

export default App;
