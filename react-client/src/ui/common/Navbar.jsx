import { getAuth, storeAuth } from '../../storage/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ title }) {

    const auth = getAuth()

    const navigate = useNavigate()

    const logout = () => {
        storeAuth(null)
        navigate('/login')
    }

    return (
        <header>
            
            <Link to={'/'}> 
               <h1> { title ?? 'Verse' } </h1>
             </Link>
            <div>
                <span> {auth.username} </span>
                |
                <button className="sm" onClick={logout}> Log out </button>
            </div>
        </header>
    )
}