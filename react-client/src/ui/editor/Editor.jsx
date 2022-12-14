import './editor.css'

import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getTask } from "../../http/tasks"
import Navbar from "../common/Navbar"
import { useState } from 'react'

import CodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import Cases from './Cases'

export default function Editor() {

    const params = useParams()

    const query = useQuery('task/' + params.id, () => getTask(params.id))

    const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}')
    const [console, setConsole] = useState('COnsole output')

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
                            <Cases cases={query.data.data.cases}/>

                        </div>
                        <div className="right">
                            <button>Run</button>
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
                                value={console}
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