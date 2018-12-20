var validateID = (text : String) => {
    return !(/\s/.test(text)) && text.length !== 0
    // the ID will be deemed invalid if at least one of these conditions is met:
    // - Contains any kind of whitespaces, including newlines and tabs..
    // - Empty
}

var validateKey = (text : String) => {
    return (
        // text.length !== 0
        true
    )
    // it is possible to use empty passwords.
    // TODO : fetch password policy from server
}

export {validateID, validateKey};