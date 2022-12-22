import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../common/Navbar'
import TaskItem from '../common/TaskItem'
import './home.css'
import TaskList from '../common/TaskList'
import Lectures from './Lectures'

function Home() {

    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <>
            <Navbar/>
            <div className="home-layout">
                <Lectures id={id}/>
                <TaskList 
                    id={id}
                    onSelect={task => navigate('/task/' + task.id)}
                />
            </div>
        </>
    )
}

export default Home