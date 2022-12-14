import './home.css'

function Home() {
    return (
        <main>
            <header>
                <h1> Verse </h1>
                <div>
                    <span> Username </span>
                    |
                    <button className="sm" > Log out </button>
                </div>
            </header>

            <div className="task-list">
                <span className="error"> Error </span>
                <span>Loading</span>
                {/* <TaskItem task={item} /> */}
            </div>
        </main>
    )
}

export default Home