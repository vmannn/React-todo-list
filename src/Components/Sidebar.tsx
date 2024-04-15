import React, { useEffect, useState } from 'react'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import MainPage from './MainPage';
import ToDoList from './ToDoList';
import Checkbox from '@mui/material/Checkbox';

export default function Sidebar() {

  type Task = {
          
    id:number;
    taskName:string;
    date:string;
    tags:string[];
    completed: boolean;
    timeCreated:Date;
    hidden:boolean;
    priority:string;
   
}

const [tasks, setTasks] = useState<Task[]>([])
const [isFilterByCompleted, setIsFilteredByCompleted] = useState(false)
const [isFilterByPending, setIsFilteredByPending] = useState(false)
const [searchTag, setSearchTag] = useState('')

useEffect(() => {

  if(tasks.length === 0 ) return;

   localStorage.setItem('tasks', JSON.stringify(tasks));
},[tasks])

useEffect(() => {

  const tasks:Task[] =  JSON.parse(localStorage.getItem('tasks') || '[]')

  setTasks(tasks)

},[] )

function handleSortAlphabetically() {


  let clonedArray:Task[] = structuredClone(tasks)

  clonedArray.sort((a,b) =>  a.taskName.localeCompare(b.taskName))

 

  setTasks(clonedArray)

  
  


}

function handleSortAlphabeticallyReversed() {


  let clonedArray:Task[] = structuredClone(tasks)

  clonedArray.sort((a,b) =>  b.taskName.localeCompare(a.taskName))

 

  setTasks(clonedArray)


}

function handleSortByDateCreatedEarliest(){

  let clonedArray:Task[] = structuredClone(tasks)

  clonedArray.sort((a,b) =>  b.timeCreated.getTime() - a.timeCreated.getTime())

  
  setTasks(clonedArray)


}

function handleSortByDateCreatedLatest(){

  let clonedArray:Task[] = structuredClone(tasks)

  clonedArray.sort((a,b) =>  a.timeCreated.getTime() - b.timeCreated.getTime())

  
  setTasks(clonedArray)


}

function filterResultsOnCompleted(){

  


  setIsFilteredByCompleted(!isFilterByCompleted)
  let clonedArray:Task[] = structuredClone(tasks)

  if(!isFilterByCompleted){

   
    clonedArray.filter(task => !task.completed).map((task, index) =>


      task.hidden = true
  
  
  
  )
   

    setTasks(clonedArray)


  }

  else{

    clonedArray.filter(task => task.hidden).map((task, index) =>

    
    task.hidden = false
    
    
    
    
    
    )


setTasks(clonedArray)

     }

}


function filterResultsOnPending(){

  setIsFilteredByPending(!isFilterByPending)

  let clonedArray:Task[] = structuredClone(tasks)

  if(!isFilterByPending){
 
    // setHiddenToFalse()
    // setIsFilteredByCompleted(false);
   
    //set filter by tags to false

    clonedArray.filter(task => task.completed).map((task, index) =>
      task.hidden = true 
 
  )
    
    setTasks(clonedArray)
  }

  else{

    clonedArray.filter(task => task.hidden).map((task, index) =>

    
    task.hidden = false
    
    )
    setTasks(clonedArray)


  }

}

function setHiddenToFalse(){

  let clonedArray:Task[] = structuredClone(tasks)
  clonedArray.filter(task => task.hidden).map((task, index) =>

    
    task.hidden = false


  )

  
  setTasks(clonedArray)
  console.log(tasks)
  console.log(clonedArray)


}

const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {

  event.preventDefault();
  setSearchTag(searchTag)

  let clonedArray:Task[] = structuredClone(tasks)

 const updated:Task[] = clonedArray.map(task => ({
    ...task,
    hidden: !task.tags.includes(searchTag)

  }))

  console.log(updated)

  setTasks(updated)



}

const handleSetTag = (event: React.ChangeEvent<HTMLInputElement>) => {

  setSearchTag(event.target.value)

}


  return (
    <div className='container'>
    <div className="Sidebar">
        <div className="top-section">
            <p>
        
            <h1 className="header"><QuestionAnswerOutlinedIcon style={{ color: 'white' }} />Tasks</h1>
            </p>

            </div> 

            <div className='sidebar-functionality'>
            
                <button className='sidebar-button' onClick={handleSortAlphabetically}>Sort alphabetically (a to z)</button>
                <button className='sidebar-button' onClick={handleSortAlphabeticallyReversed}>Sort alphabetically (z to a)</button>
                <button className='sidebar-button' onClick={handleSortByDateCreatedEarliest}>Sort by date created (earliest to latest) </button>
                <button className='sidebar-button' onClick={handleSortByDateCreatedLatest}>Sort by date created (latest to earliest) </button>
                <p>
                <Checkbox id='1' style={{color:'red'}} checked={isFilterByCompleted} defaultChecked={false} disabled={isFilterByPending} onChange={filterResultsOnCompleted} ></Checkbox>
                Filter by tasks completed {isFilterByPending && (<div>disabled</div>)}
                </p>
                <p>
                <Checkbox id='2' style={{color:'red'}}  checked={isFilterByPending} defaultChecked={false} disabled={isFilterByCompleted} onChange={filterResultsOnPending} ></Checkbox>
                Filter by tasks pending {isFilterByCompleted && (<div>disabled</div>)}
                </p>
                <p>
                 filter by tag 
                 <form onSubmit={handleSubmit}>

                 <input placeholder='Search for a tag' id='tag' name='tag' type='' onChange={handleSetTag} value={searchTag} color='black' ></input> <button type='submit'>search</button>


                 </form>

                </p>

                </div> 
        
        
    </div>

    <div className='MainPage'>
     <ToDoList tasks={tasks} setTasks={setTasks}/>
     </div>

   
   
    </div>
  )
}
