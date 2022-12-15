export default function Cases({cases}) {

    return (
        <div className="case-list">
            {
                cases.map(_case => (
                    <div key={_case.id} className="case">

                        {
                            _case.status == 'error' && <span className="error"> [FAILED] </span>
                        }
                        {
                            _case.status == 'success' && <span className="success"> [PASSED] </span>
                        }

                        <h4>{_case.name}</h4>
                        <span>
                            <b>Input: </b>
                             {_case.input} 
                        </span>
                        <br />
                        <span>
                            <b>Expect: </b>
                            {_case.expect}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}