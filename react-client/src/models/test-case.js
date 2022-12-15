export function mapCase(input) {
    return {
        ...input,
        status: 'none',
        message: null
    }
}

export function mapCaseWithResult(input, result) {
    if (result) {
        return {
            ...input,
            status: result.status,
            message: result.message
        }    
    }
    else {
        return mapCase(input)
    }
}

