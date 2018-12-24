// Input sanitization & validation scripts

/**
 * @name validateID : validate an ID
 * @param {String} text : an ID to verify
 * @returns {boolean} : input ID's validity
 * @author minhducsun2002
 */

function validateID (text) {
    return !(/\s/.test(text)) && text.length !== 0
    // who uses an ID with whitespace and who uses an empty ID?
}

/**
 * @name validateKey : validate a key
 * @param {String} key : a key to verify
 * @returns {boolean} : input key's validity
 * @todo : fetch password policy from server
 * @author minhducsun2002
 */

function validateKey (key) {
    return (true);
    // verify if key is valid
}

export {validateID, validateKey};