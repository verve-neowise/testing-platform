import { useRef } from "react"
import { useState } from "react"
import Cases from "../editor/Cases"

export default function AddDialog({isShow, close, confirm}) {

    const [cases, setCases] = useState([])

    const taskName = useRef()
    const taskDesc = useRef()
    const taskContent = useRef()
    const caseName = useRef()
    const caseInput = useRef()
    const caseExpect = useRef()

    const onSend = () => {
        confirm({
            task: {
                name: taskName.current.value,
                description: taskDesc.current.value,
                content: taskContent.current.value
            },
            cases
        })
    }

    const addCase = () => {

        console.log(caseName.current);
        console.log(caseInput.current);
        console.log(caseExpect.current);

        setCases(old => [...old, {
            name: caseName.current.value,
            input: caseInput.current.value,
            expect: caseExpect.current.value
        }])
    }

    const deleteCase = (index) => {
        setCases(cases => cases.filter((value, itemIndex) => itemIndex != index))
    }

    return (
        <div className={"dimmer " + (isShow ? 'show' : '')}>
            <div className="modal">
            <button onClick={close}>Close</button>
                <div className="form">
                    <div className="form-content">
                        <input ref={taskName} placeholder="Task name" type="text" />
                        <input ref={taskDesc} placeholder="Description" type="text" />
                        <textarea ref={taskContent} placeholder="content" type="text"></textarea>
                        <button onClick={onSend}>Send</button>
                        <hr />
                        <input ref={caseName} placeholder="Name" type="text" />
                        <input ref={caseInput} placeholder="Input" type="text" />
                        <input ref={caseExpect} placeholder="Expect" type="text" />
                        <button onClick={addCase}> Add Case </button>                        
                    </div>
                    <div className="form-content">
                        <h3>Cases</h3>
                        <Cases cases={cases} onDelete={ (index) => deleteCase(index) }/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}