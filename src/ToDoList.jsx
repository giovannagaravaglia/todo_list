import { useState } from 'react';
import { useEffect } from 'react';

import './ToDoList.css'

function ToDoList() {

   const [taskName, setTaskName] = useState ("");
   const [allTasks, setAllTasks] = useState([]);

   const [indexItem, setIndexItem] = useState(null);

   const [tasksFiltered, setTasksFiltered] = useState(allTasks);
   const [lightDark, setLightDark] = useState(false);

   const [lengthActive, setLenghtActive] = useState(0);
   const [statusNewTask, setStatusNewTask] = useState (false);


    const filters = {
        ALL: 'all',
        ACTIVE: 'active',
        COMPLETED: 'completed',
    };

   const [activeFilter, setActiveFilter] = useState(filters.ALL);

   const filterSeletion = (parameter) =>{
        setActiveFilter(parameter);
        console.log(activeFilter)
   }

   const filterLenght = () =>{
        const activeTasks2 = allTasks.filter ((activeTask2) =>{
            return activeTask2.status === false;
        })

        setLenghtActive (activeTasks2)
   }


   const filter = (parameter) =>{
        if(parameter){
            const completedTasks= allTasks.filter((completedTask) =>{return completedTask.status === true;})
            setTasksFiltered(completedTasks)


        } else if (!parameter){
            const activeTasks = allTasks.filter((activeTask) =>{return activeTask.status === false;})
            setTasksFiltered(activeTasks)
        }
   }


   const toggleRadio = (index) => {
        const uptatedTasks = [...allTasks];
        uptatedTasks [index].status = !uptatedTasks[index].status;
        setAllTasks(uptatedTasks)
    };
   
   const newTask = (e) =>{
        if(e.key === "Enter"){

            if (taskName === ''){
                return 
            }
            
            e.preventDefault();

            const task ={
                id: Math.random(),
                name: taskName,
                status: statusNewTask,
            }
            setAllTasks([...allTasks, task]);
            setTaskName("");
            setStatusNewTask(false);
            setActiveFilter(filters.ALL)
        }}

   const excludeTask = (index) =>{
        const allTasksDuplicate = [...allTasks];
        allTasksDuplicate.splice(index, 1);
        setAllTasks(allTasksDuplicate);
   }

   const excludeCompleted = () =>{
        
        const taskCompleted = allTasks.filter ((allTask) => allTask.status === false)
        setAllTasks(taskCompleted)
    
   }

   const dragStart = (index) => {
        setIndexItem(index);
   }

   const dropOver = (e) =>{
        e.preventDefault ();
   }

   const drop = (index) =>{
        const allTasksDuplicated = [...allTasks];
        const [itemDropped] = allTasksDuplicated.splice(indexItem, 1);
        allTasksDuplicated.splice(index, 0, itemDropped);
        setAllTasks(allTasksDuplicated)
   }

   const changeTheme = () =>{
        setLightDark(!lightDark);
   }

   const getClassTask = (allTask) => {
        if (allTask.status === false && lightDark === false){
            return 'task__text'
        }

        if (allTask.status === false && lightDark === true){
            return 'task__text-dark'
        }
        if (allTask.status === true && lightDark === false){
            return 'task__text-checked'
        }

        if (allTask.status === true && lightDark === true){
            return 'task__text-checked-dark'
        }
   }

   const getClassRadio = (allTask= null) =>{

    if (!allTask){
        if (statusNewTask === false && lightDark === false) return 'task__input'

        if (statusNewTask === false  && lightDark === true) return 'task__input-dark' 

        if (statusNewTask === true) return 'task__input-checked'
    }

        if (allTask.status === false && lightDark === false) return 'task__input'

        if (allTask.status === false  && lightDark === true) return 'task__input-dark' 

        if (allTask.status === true) return 'task__input-checked'

        
   }

   const getClassStatus = (ActiveStatus) =>{
        if (lightDark === false & ActiveStatus === activeFilter){
            return 'status__all active-filter'
        }
        if (lightDark === true & ActiveStatus === activeFilter){
            return 'status__all active-filter'
        }
        if (lightDark === false & ActiveStatus !== activeFilter){
            return 'status__all'
        }
        if (lightDark === true & ActiveStatus !== activeFilter){
            return 'status__all status__all-dark'
        }
   }



   useEffect(() =>{
            setTasksFiltered(allTasks);

            const activeTasks2 = allTasks.filter ((activeTask2) =>{
                return activeTask2.status === false;
            })
    
            setLenghtActive (activeTasks2.length)
   }, [allTasks])
    
   
 
 
    return(

        <div className={lightDark === false ? 'todo-container' : 'todo-container todo-container-dark'}>

            <div className="todo-background">
                <img className={lightDark ===false ? 'background-mobile' : 'background-mobile hidden'} src="/images/bg-mobile-light.jpg" alt="" />
                <img className={lightDark === false ? 'background-desktop' : 'background-desktop hidden'} src="/images/bg-desktop-light.jpg" alt="" />

                <img className={lightDark ===true ? 'background-mobile' : 'background-mobile hidden'} src="/images/bg-mobile-dark.jpg" alt="" />
                <img className={lightDark === true ? 'background-desktop' : 'background-desktop hidden'} src="/images/bg-desktop-dark.jpg" alt="" />
            </div>

        
            <div className='todo-general'>


                <div className="title">
                    <h1 className='title__text'>Todo</h1>
                    <img className={lightDark === false ? 'title__icon' : 'title__icon hidden'} onClick={changeTheme} src="/images/icon-moon.svg" alt="icon of a moon" />
                    <img className={lightDark === true ? 'title__icon' : 'title__icon hidden'} onClick={changeTheme} src="/images/icon-sun.svg" alt="icon of a moon" />


                </div>

                <div className="taskRelated">
            
                    <div className={lightDark === false ? 'newtask' : 'newtask newtask-dark'}>

                        <label className='label-radio'>
                            <input  type="radio" checked={statusNewTask === true} onClick={() => setStatusNewTask(!statusNewTask)} className={getClassRadio(null)}/>

                            <div className={statusNewTask === true ? 'span-input-checked' : 'span-input'}>
                                <img src="/images/icon-check.svg" alt="" />
                            </div>
                        </label>



                        
                        <input type="text" value={taskName} onChange={(e) =>setTaskName(e.target.value)} onKeyDown={newTask}  className={lightDark === false ? 'newtask__text' : 'newtask__text newtask__text-dark'} placeholder='Create a new todo...'/>
                    </div>

                    <div className={lightDark === false ? 'allTasks' : 'allTasks-dark'}>

                        {
                            tasksFiltered.map((allTask, index) =>{

                                return(
                                <div className= {lightDark === false ? 'allTasks-task' : 'allTasks-task allTasks-task-dark'} draggable onDragStart={() =>{dragStart(index)}} onDragOver={dropOver} onDrop={()=>drop (index)} key={allTask.id} >
                                    <div className="task-left" onClick={(e) =>{ 
                                        e.preventDefault()
                                        toggleRadio(index)}}>

                                        <label className='label-radio'>
                                            <input type="radio" checked={allTask.status === true}  className={getClassRadio(allTask)} />
                                            <div className={allTask.status === true ? 'span-input-checked' : 'span-input'}>
                                                <img src="/images/icon-check.svg" alt="" />
                                            </div>
                                        </label>
                                        
                                        <span className={getClassTask(allTask)}>{allTask.name}</span>
                                    </div>
                                    <img src="/images/icon-cross.svg" alt="" onClick={excludeTask} />
                                </div>)
                            })
                        }
                        
                    

                        <div className="allTasks-lineBottom">
                            <span className="lineBottom__itensLefting">{lengthActive} itens left</span>

                            <div className={lightDark === false ? 'status': 'status status-dark'}>
                                <span className={getClassStatus(filters.ALL)} onClick={() =>{
                                     setTasksFiltered(allTasks);
                                     setActiveFilter(filters.ALL)}
                                     }>All</span>
                                <span className={getClassStatus(filters.ACTIVE)} onClick={() => {
                                    filter(false);
                                    setActiveFilter(filters.ACTIVE)
                                }}>Active</span>
                                <span className={getClassStatus(filters.COMPLETED)} onClick={() => {
                                    filter(true);
                                    setActiveFilter(filters.COMPLETED)
                                    }}>Completed</span>
                            </div>

                            <span onClick={excludeCompleted} className="lineBottom__clear">Clear Completed</span>
                        </div>
                    </div>

                </div>

                <span className="dragDrop">Drag and drop to reorder list</span>

                


            </div>
        </div>
    )
 
}

export default ToDoList
