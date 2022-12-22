import express from 'express'
import cors from 'cors'

import users from './users'
import tasks from './tasks'
import run from './run'
import lectures from './lectures'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(users)
app.use(lectures)
app.use(tasks)
app.use(run)

app.listen(7070, () => console.log('Server listen port 7070'))