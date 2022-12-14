import { Link } from 'react-router-dom'
import './register.css'
import { useRef } from 'react'
import { register } from '../../http/auth'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { storeAuth } from '../../storage/auth'

function Register() {

    const navigate = useNavigate()

    const mutation = useMutation(user => register(user), {
        onSuccess: (response) => {
            storeAuth(response.data.user)
            navigate('/')
        }
    })

    const usernameInput = useRef()
    const passwordInput = useRef()
    const nameInput = useRef()
    const groupInput = useRef()

    const submit = (event) => {
        event.preventDefault()
        const user = {
            username: usernameInput.current.value,
            password: passwordInput.current.value,
            name: nameInput.current.value,
            group: groupInput.current.value,
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

                <input ref={nameInput} type="text" placeholder="Name" />
                <input ref={groupInput} type="text" placeholder="Group" />

                <button onClick={submit} disabled={mutation.isLoading}> {mutation.isLoading ? 'Loading' : 'Register'} </button>

                <Link to="/login"> Already have account? Login </Link>
            </form>
        </main>
    )
}

export default Register