import eval from 'eval'

type Case = {
    name: string,
    input: string,
    expect: string
}

type Result = {
    name: string,
    status: 'success' | 'error',
    message: string
}

function test(code: string, cases: Case[]): Result[] | Result {
    try {

        const func: any = eval(code)

        return cases.map((_case) => {
            try {
                const args: any = eval("module.exports = " + _case.input)
                console.log(args);
                
                const expected: any = eval("module.exports = " + _case.expect)
                console.log(expected);

                const res = func(...Object.values(args))
                console.log(res);

                return {
                    name: _case.name,
                    message: expected === res ? 'Successfuly' : `Expected ${expected}, but received ${res}`,
                    status: expected === res ? 'success' : 'error'
                }
            }
            catch(err: any) {
                return {
                    name: _case.name,
                    message: 'Error: ' + err.toString(),
                    status: 'error'
                }
            }
        })
    }
    catch(err: any) {
        return {
            name: 'code',
            status: 'error',
            message: err.toString()
        }
    }
}

const res = test(`
    module.exports = function (a, b) {
        return a + b + 1
    }
`, [
    {
        input: "{ a: 10, b: 5}",
        expect: "15",
        name: "10 + 5",
    }
])

console.log(res);
