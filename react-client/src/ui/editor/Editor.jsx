import './editor.css'

import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { confirmCode, getTask, runCode } from "../../http/tasks"
import Navbar from "../common/Navbar"
import { useState } from 'react'

import CodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import Cases from './Cases'
import { mapCase, mapCaseWithResult } from '../../models/test-case'

export default function Editor() {

    const params = useParams()

    const [cases, setCases] = useState([])
    const [task, setTask] = useState({})

    const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}')
    const [terminal, setTerminal] = useState('COnsole output')

    const query = useQuery('task/' + params.id, () => getTask(params.id), {
        onSuccess: (response) => {
            setCases(response.data.cases.map(mapCase))            
            setTask(response.data.task)
        }
    })

    const mutation = useMutation('/run', (params) => runCode(params), {
        onSuccess: (response) => {
            if (Array.isArray(response.data.result)) {
                
                const result = response.data.result
               
                console.log(result);
                
                setCases(cases => (
                    cases.map(_case => mapCaseWithResult(
                        _case, 
                        result.find(res => res.caseId == _case.id)
                        )
                    )
                ))

                const message = result
                                    .filter(res => res.status == 'error')
                                    .reduce((acc, value) => acc + '[' + value.name + ']: ' + value.message, '')

                setTerminal(message)
            }
            else {
                setTerminal(response.data.result.message)
            }
        }
    })

    const confirmMutation = useMutation('/confirm', (params) => confirmCode(params), {
        onSuccess: (response) => {
            if (Array.isArray(response.data.result)) {
                
                const result = response.data.result
               
                console.log(result);
                
                setCases(cases => (
                    cases.map(_case => mapCaseWithResult(
                        _case, 
                        result.find(res => res.caseId == _case.id)
                        )
                    )
                ))

                const message = result
                                    .filter(res => res.status == 'error')
                                    .reduce((acc, value) => acc + '[' + value.name + ']: ' + value.message, '')

                setTerminal(message)
            }
            else {
                setTerminal(response.data.result.message)
            }
        }
    })

    const run = () => {
        const params = {
            taskId: task.id,
            code
        }
        mutation.mutate(params)
    }

    const confirm = () => {
        const params = {
            taskId: task.id,
            code
        }
        confirmMutation.mutate(params)
    }

    return (
        <div className='editor-layout'>
            <Navbar />
            {
                query.isLoading && <span>Loading</span>
            }
            {
                query.error && <span className="error"> {query.error.data.message} </span>
            }
            {
                query.isSuccess && (
                    <div className="editor">
                        <div className="left">
                            <h2> #{query.data.data.task.id} {query.data.data.task.name} </h2>
                            <p>
                                {query.data.data.task.content}
                            </p>
                            <hr />
                            <h3> Test cases </h3>
                            <Cases cases={cases}/>

                        </div>
                        <div className="right">
                            <div className="right-flex">
                                <button onClick={run}>Run</button>
                                <button onClick={confirm}>Confirm</button>                                
                            </div>
                            <CodeEditor
                                value={code}
                                onValueChange={code => setCode(code)}
                                highlight={code => highlight(code, languages.js)}
                                padding={10}
                                style={{
                                    border: '1px solid #b5b5b5',
                                    width: '100%',
                                    height: '100%',
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 18,
                                }}
                            />
                            <CodeEditor
                                value={terminal}
                                highlight={code => highlight(code, languages.js)}
                                padding={10}
                                style={{
                                    border: '1px solid #b5b5b5',
                                    width: '100%',
                                    height: '100%',
                                    color: '#b5b5b5',
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 18,
                                }}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}