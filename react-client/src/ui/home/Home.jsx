import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getTasks } from '../../http/tasks'
import Navbar from '../common/Navbar'
import TaskItem from './TaskItem'
import './home.css'

function Home() {

    const navigate = useNavigate()

    const query = useQuery('tasks', () => getTasks())

    return (
        <>
            <Navbar/>
            <div className="task-list">
                {
                    query.isLoading ? 
                        <span>Loading</span>
                    : query.isError ?
                        <span className="error"> Error </span>
                    :
                        query.data.data.tasks.map(task => (
                            <TaskItem
                                key={task.id} 
                                task={task}
                                onSelect={(task) => navigate('/task/' + task.id)}
                            />
                        ))
                }
            </div>
        </>
    )
}

export default Home