import React, {useState} from 'react';

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import uuid from 'react-uuid';

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

    }
  };

function App() {
  const [columns, setColumns]  = useState (MajorTaskColumns);

  return (
    <div style = {{ display: 'flex', justifyContent:'center', height: '100%'}}>
      
      <DragDropContext onDropEnd = {result => console.log(result)}>
      
        {Object.entries(columns).map(([id, column]) => {
          return (
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
                                minHeight: '60px',
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
                    
                    
                  </div>
                )
              }}
              
              </Droppable>



          )

            })}


      </DragDropContext>

    </div>
  );
}

export default App;
