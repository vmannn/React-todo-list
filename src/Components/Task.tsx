import React, { Dispatch, SetStateAction, useState } from 'react'
import Chip from '@mui/material/Chip'
import { Label } from '@mui/icons-material'

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

type propTypes = {
    name: string
    id: number
    done: boolean
    date: string
    tags: string[]
    arrayOfTasks: Task[]
    setTasks: Dispatch<SetStateAction<Task[]>>
    completed: boolean
    priority: string
    timeCreated: Date
}

const Task: React.FC<propTypes> = ({
    name,
    id,
    done,
    date,
    tags,
    arrayOfTasks,
    setTasks,
    completed,
    priority,
    timeCreated,
}) => {
    return (
        <div className="task">
            <p>
                <p>Tags:</p>
                {tags.map((tag, index) => (
                    <Chip
                        style={{ background: 'red' }}
                        label={'#' + tag}
                        size="small"
                    />
                ))}
            </p>
            <pre>
                {completed ? (
                    <Chip
                        style={{ background: 'green' }}
                        label="Completed"
                        size="small"
                    />
                ) : (
                    <Chip
                        style={{ background: 'yellow' }}
                        label="Pending"
                        size="small"
                    />
                )}{' '}
                Due Date: {date} {priority} Date Created:{' '}
                {timeCreated.toLocaleString()}
            </pre>
        </div>
    )
}

export default Task
