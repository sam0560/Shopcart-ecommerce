const app = require('./app');
const connectDatabase = require("./config/database")

const dotenv = require('dotenv')

// Handle Uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1)
})

// Setting up config file
dotenv.config({path: 'backend/config/config.env'})

// Connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

// Handling unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhadles Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})
 