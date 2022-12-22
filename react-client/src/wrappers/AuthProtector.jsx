import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from '../storage/auth'

function AuthProtector({ adminRequired, children }) {

    const navigate = useNavigate()
    const auth = getAuth()

    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }     
        else if (adminRequired && !auth.isAdmin) {
            navigate('/login')
        }
    }, [])

    if (!auth) {
        return <span> Not Authorized </span>
    } 
    else {
        return children
    }
}

export default AuthProtector