const fs = require('fs')
const join = require('path').join
var config = undefined,
    callback

/**
 * @author minhducsun2002
 * @description Take a function (signature is func(data)) & execute
 *              when config has been parsed successfully
 */

const hardcodedFilePath = join(process.cwd(), '/../../config/proxy.json')
const initialValues =
    '{"source":{"address":"1.1.1.1","port":"3000"},"destination":{"address":"localhost","port":"3000"}}'
// the initial value MUST be hardcoded : we cannot trust the user to not deleting the sample file
// if we do use it.
/**
 * @author minhducsun2002
 */

function executeExternalCallback() {
    // callback execute if found
    if (typeof callback !== 'undefined') {
        callback(config)
    }
}

// hardcoded path; this should be changed to something like $USER/.hestia
fs.readFile(
    hardcodedFilePath,
    {
        encoding: 'utf8',
    },
    (err, data) => {
        if (!err) {
            // if there's no error, parse the file
            config = JSON.parse(data)
            executeExternalCallback()
        } else {
            console.log('Error reading configuration file : ', err)
            console.log('\nAttempting to create one...')

            fs.writeFile(
                hardcodedFilePath,
                initialValues,
                {
                    encoding: 'utf8',
                },
                err => {
                    if (err) throw err
                    console.log('Configuration file successfully created.')

                    // here we just the default value
                    // 'cause didn't we just write it out....?
                    config = JSON.parse(initialValues)
                    executeExternalCallback()
                }
            )
        }
    }
)

module.exports = function(func) {
    // if we got the data, we just - well - call the desired func
    if (typeof config !== 'undefined') func(config)
    // leave the callback there; it will be executed later
    else callback = func
}
