import TaskItem from "./TaskItem"
import { useQuery } from 'react-query'
import { getTasks } from '../../http/tasks'
import { useParams } from "react-router-dom"

export default function TaskList({ onSelect, onDelete, id }) {

    const { isLoading, isError, data } = useQuery('tasks', () => getTasks(id))

    console.log(data?.data);

    return (
        <div className="task-list">
            {
                isLoading ?
                    <span>Loading</span>
                    : isError ?
                        <span className="error"> Error </span>
                        :
                        data.data.tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onSelect={onSelect}
                                onDelete={onDelete}
                            />
                        ))
            }
        </div>
    )
}