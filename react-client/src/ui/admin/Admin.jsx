import './admin.css'
import Navbar from "../common/Navbar";
import { useNavigate } from 'react-router-dom'
import TaskList from '../common/TaskList'
import AddDialog from './AddDialog';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { deleteTask, postTask } from '../../http/tasks';

export default function Admin() {

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const sendMutation = useMutation((data) => postTask(data), {
        onSuccess: (data) => {
            setRefresh(value => !value)
        }
    })

    const deleteMutation = useMutation((id) => deleteTask(id), {
        onSuccess: (data) => {
            setRefresh(value => !value)
        }
    })

    const onSend = (data) => {
        sendMutation.mutate(data)
    }

    return (
        <>
            <Navbar title={'Admin'} />
            <button onClick={() => setShow(true)}>Add task</button>
            <TaskList
                onSelect={task => navigate('/task/' + task.id)}
                onDelete={task => deleteMutation.mutate(task.id)}
            />

            <AddDialog 
                isShow={show}
                confirm={onSend}
                close={ () => setShow(false) }
            />
        </>
    )
}