import mongoose, { ConnectOptions } from 'mongoose'
import { ENVType } from '../utils/enums.util'
import colors from 'colors'

const options: ConnectOptions = {
    autoIndex: true,
    maxPoolSize: 60000,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 60000,
    serverSelectionTimeoutMS: 60000,
    family: 4,
}

const connectDB = async () => {

    // connect to database
    if (process.env.NODE_ENV === ENVType.DEVELOPMENT || process.env.NODE_ENV === ENVType.PRODUCTION) {
        
        try {

            const dbConn = await mongoose.connect(process.env.MONGO_URI || '', options);
            console.log(colors.cyan.bold.underline(`Database connected: ${dbConn.connection.host}`));
            
        } catch (error) {
            
            console.log(colors.red.bold.underline(`Could not connect to database: ${error}`));
            process.exit(1);
            
        }
    }
}

export default connectDB;