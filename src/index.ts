import server from './server'
import config from 'config'

const APP_PORT = config.get('API_PORT')

server.listen(APP_PORT, () => {
    console.log(`Server started on port: ${APP_PORT}`)
})

process.on('unhandledRejection', (error) => {
    throw error
})

process.on('uncaughtException', (error) => {
    console.log(error)
    // integrate Sentry to get notifeid
})
