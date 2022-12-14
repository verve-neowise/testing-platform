import './login.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { login } from '../../http/auth'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { storeAuth } from '../../storage/auth'

function Login() {

    const navigate = useNavigate()

    const mutation = useMutation(user => login(user), {
        onSuccess: (response) => {
            storeAuth(response.data.user)
            navigate('/')
        }
    })

    const usernameInput = useRef()
    const passwordInput = useRef()

    const submit = (event) => {
        event.preventDefault()
        const user = {
            username: usernameInput.current.value,
            password: passwordInput.current.value,
        }

        mutation.mutate(user)
    }

    return (
        <main>
            <form>
                <h1> Verse </h1>
                { mutation.isError ? 
                    <span className="error"> {mutation.error.response.data.message} </span> 
                    :
                     null
                }
                <input ref={usernameInput} type="text" placeholder="Username" />
                <input ref={passwordInput} type="text" placeholder="Password" />
                <button onClick={submit} disabled={mutation.isLoading}> {mutation.isLoading ? 'Loading' : 'Login'} </button>
                <Link to="/register"> Create an account </Link>
            </form>
        </main>
    )
}

export default Login