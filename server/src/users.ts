import { Router } from "express";
import { createUser, findUser, User } from "./services/user.service";

const router = Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await findUser(username)

    if (user) {
        const { name, id, group, token } = user

        if (user.password != password) {
            res.status(403).json({
                message: 'Username or password wrong'
            })
        }
        else {
            res.json({
                message: 'Successfuly login',
                user: {
                    id, name, group, username, token
                }
            })
        }
    }
    else {
        res.status(403).json({
            message: 'Username or password wrong'
        })
    }
})

router.post('/register', async (req, res) => {

    const dto: User = req.body
     
    const existsUser = await findUser(dto.username)

    if (existsUser) {
        res.status(403).json({
            message: 'User ' + dto.username + ' already exists'
        })
    }
    else {
        const { username, name, id, group, token } = await createUser(dto)

        res.json({
            message: 'Successfuly register',
            user: {
                id, name, group, username, token 
            } 
        })
    }
})

export default router