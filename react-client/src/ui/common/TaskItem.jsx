export default function TaskItem({task, onSelect, onDelete}) {

    return (
        <div className="task-item">
            <div className="task-title">
                <h2> #{task.id} {task.name}</h2>
                {
                    task.isComplete && <span className="success">[COMPLETED]</span>
                }
            </div>
            <p>{task.description}</p>
            <div style={{ textAlign: 'end' }}> 
                <button onClick={() => onSelect(task)} className="sm"> Let it {'>>'} </button>
            </div>
            {
                onDelete && <button onClick={() => onDelete(task)} className="sm"> Delete </button>
            }
        </div>
    )
}