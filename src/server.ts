import app from "./config/app.config";
import colors from "colors";
import connectDB from "./config/db.config";

const connect = async ():Promise<void> => {
    // connect database
    await connectDB()
}

connect();

const PORT = process.env.PORT

const server = app.listen(PORT, ()=>{
    console.log(colors.yellow.bold(`Server running in ${process.env.NODE_ENV}`))
})

// handle unhandled rejection error
process.on('unhandledRejection', (err: any, promise) => {
    console.log(colors.bold.red(`Error: ${err.message}`));
    server.close(() => process.exit())
})