import React, { useState } from 'react'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import AddNewToDo from './AddNewToDo'
import PersonIcon from '@mui/icons-material/Person'
import Task from './Task'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import Chip from '@mui/material/Chip'

type propTypes = {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const ToDoList: React.FC<propTypes> = ({ tasks, setTasks }) => {
    type Task = {
        id: number
        taskName: string
        date: string
        tags: string[]
        completed: boolean
        timeCreated: Date
        hidden: boolean
        priority: string
    }

    const [isOpen, setShowModal] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [date, setDate] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tag, setTag] = useState('')
    const [priority, setPriority] = useState('')

    const handleTaskNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTaskName(event.target.value)
        console.log(event.target.value)
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }

    const handleSetTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value)
    }

    const handleAddTagToArray = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if ((event.key !== '' && event.key !== 'Enter') || tag === '') return

        const updateTags = [...tags, tag]

        setTags(updateTags)

        setTag('')
    }

    const handleAddTagToArrayNoKeyboard = () => {
        if (tag === '') return

        const updateTags = [...tags, tag]

        setTags(updateTags)

        setTag('')
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newTask: Task = {
            id: tasks.length + 1,
            taskName: taskName,
            date: date,
            tags: tags,
            completed: false,
            timeCreated: new Date(),
            hidden: false,
            priority: priority,
        }

        const updateTasks = [...tasks, newTask]

        setTasks(updateTasks)

        setTags([])

        setShowModal(false)
    }

    const handleCheckBoxChange = (task: Task) => {
        if (!task.completed === true) {
            let index = tasks.findIndex((item) => item.id === task.id)

            console.log(index)

            if (index !== -1) {
                let copiedTasks: Task[] = structuredClone(tasks)
                console.log(tasks)
                console.log(tasks)
                let [item] = copiedTasks.splice(index, 1)
                item.completed = true
                copiedTasks.push(item)
                setTasks(copiedTasks)
            }
        } else {
            let index = tasks.findIndex((item) => item.id === task.id)

            let copiedTasks: Task[] = structuredClone(tasks)

            copiedTasks[index].completed = false

            setTasks(copiedTasks)
        }
    }

    function deleteTask(index: number): void {
        const newArray: Task[] = tasks.filter((task, i) => i != index)
        setTasks(newArray)
    }

    function setPriortityCritical() {
        setPriority('critical')
    }

    function setPriorityNonCritical() {
        setPriority('non-critical')
    }

    return (
        <div className="todo-wrapper">
            <h1 className="main-page-header">Upcoming</h1>

            <div className="ToDoList">
                <h2>Today's tasks</h2>

                <div
                    className="add-task-border"
                    onClick={() => setShowModal(true)}
                >
                    <p>
                        <AddSharpIcon style={{ color: 'white' }}>
                            {' '}
                            <h6>Add New Task</h6>
                        </AddSharpIcon>
                        Add New Task
                    </p>
                </div>

                {isOpen && (
                    <div className="add-new-todo">
                        <form onSubmit={handleSubmit}>
                            <button
                                type="button"
                                className="cancel-add-todo"
                                onClick={() => setShowModal(false)}
                            >
                                <CloseIcon style={{ color: 'grey' }} />
                            </button>
                            <h3>New Task # {tasks.length}</h3>
                            <hr></hr>
                            <p>
                                Assignee{' '}
                                <PersonIcon style={{ color: 'white' }} /> Me
                            </p>
                            <p>
                                Status{' '}
                                <button
                                    type="button"
                                    style={{ background: 'yellow' }}
                                >
                                    Pending
                                </button>
                            </p>
                            <p>
                                Task Name{' '}
                                <input
                                    id="taskName"
                                    name="taskName"
                                    type="text"
                                    onChange={handleTaskNameChange}
                                    required
                                ></input>
                            </p>
                            <p>
                                due date{' '}
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    onChange={handleDateChange}
                                ></input>
                            </p>
                            <p>
                                task priority{' '}
                                <button
                                    type="button"
                                    onClick={setPriortityCritical}
                                >
                                    critical
                                </button>{' '}
                                <button
                                    type="button"
                                    onClick={setPriorityNonCritical}
                                >
                                    non-critical
                                </button>
                            </p>
                            {priority ? (
                                <p>
                                    <b>marked as: {priority}</b>
                                </p>
                            ) : (
                                <p></p>
                            )}
                            <h4>tags</h4>
                            <p>
                                {tags.map((tag, index) => (
                                    <Chip
                                        style={{ background: 'red' }}
                                        label={'#' + tag}
                                        size="small"
                                    />
                                ))}
                            </p>
                            <input
                                placeholder="Add a tag"
                                onChange={handleSetTag}
                                value={tag}
                                onKeyDown={handleAddTagToArray}
                            ></input>{' '}
                            <button
                                type="button"
                                onClick={handleAddTagToArrayNoKeyboard}
                            >
                                add tag
                            </button>
                            <button type="submit" className="submit">
                                Create
                                <SendIcon style={{ color: 'white' }} />
                            </button>
                        </form>
                    </div>
                )}

                <div className="task">
                    {tasks
                        .filter((task) => !task.hidden)
                        .map((task, index) => (
                            <div>
                                <div
                                    className="font-icon-delete"
                                    onClick={() => deleteTask(index)}
                                >
                                    <DeleteIcon
                                        style={{ color: 'white' }}
                                        fontSize="small"
                                    ></DeleteIcon>
                                    delete
                                </div>

                                <Checkbox
                                    style={{ color: 'red' }}
                                    checked={task.completed}
                                    onChange={() => handleCheckBoxChange(task)}
                                    defaultChecked={false}
                                ></Checkbox>
                                <span
                                    style={{
                                        textDecoration: task.completed
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                >
                                    {task.taskName}
                                </span>

                                <Task
                                    name={task.taskName}
                                    id={task.id}
                                    done={false}
                                    date={task.date}
                                    tags={task.tags}
                                    arrayOfTasks={tasks}
                                    setTasks={setTasks}
                                    completed={task.completed}
                                    priority={task.priority}
                                    timeCreated={task.timeCreated}
                                />

                                <hr className="task-seperator"></hr>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ToDoList
