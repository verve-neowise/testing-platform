export default function TaskItem({task, onSelect}) {

    return (
        <div className="task-item">
            <h2> #{task.id} {task.name}</h2>
            <p>{task.description}</p>
            <div style={{ textAlign: 'end' }}> 
                <button onClick={() => onSelect(task)} className="sm"> Let it {'>>'} </button>
            </div>
        </div>
    )
}