const ngrok = require('ngrok')
const Hapi = require('@hapi/hapi')
const Joi = require('joi')
const fs = require('fs')

const processEnvSchema = Joi.object({
    PORT: Joi.number()
}).unknown(true)

const environmentVariableValidation = processEnvSchema.validate(process.env)
if (environmentVariableValidation.error) {
    console.log(environmentVariableValidation.error)
    process.exit(1)
}

const init = async () => {

    const ngrokUrl = await ngrok.connect({
        addr: process.env.PORT
    })

    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    })
    server.route({
        method: 'POST',
        path: '/',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                multipart: true
            }
        },
        handler: async (request, h) => {
            if (request.payload?.file) {
                const name = request.payload.file.hapi.filename
                const path = `${__dirname}/uploads/${name}`
                const file = fs.createWriteStream(path)
                file.on('error', (err) => console.error(err))
                request.payload.file.pipe(file)
                return name
            }
        }
    })
    await server.start()
    console.log(`Pubucket running.  POST to URL ${ngrokUrl}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()
