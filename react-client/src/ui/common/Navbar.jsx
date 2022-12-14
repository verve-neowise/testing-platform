import { useNavigate } from "react-router-dom"
import { getAuth, storeAuth } from '../../storage/auth'

export default function Navbar() {

    const auth = getAuth()

    const navigate = useNavigate()

    const logout = () => {
        storeAuth(null)
        navigate('/login')
    }

    return (
        <header>
            <h1> Verse </h1>
            <div>
                <span> {auth.username} </span>
                |
                <button className="sm" onClick={logout}> Log out </button>
            </div>
        </header>
    )
}