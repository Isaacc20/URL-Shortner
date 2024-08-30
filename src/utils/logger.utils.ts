import colors from 'colors'
import { LogRequestDTO } from '../dtos/system.dto';

class Logger {
    constructor () {}

    /**
     * @name log
     * @description logs out the data supplied to console
     * @param payload - see LogRequestDTO
     * @returns { void } - void
     */
    public log(payload: LogRequestDTO) {

        const { data, label, type } = payload
        
        if (data) {
            
            if (label) {

                console.log(label);
                
            }

            if (typeof(data) === 'string') {

                if (type) {

                    if (type === 'error') {
                        console.log(colors.red.bold(data));
    
                    } else if (type === 'warning') {
                        console.log(colors.yellow.bold(data));
    
                    } else if (type === 'info') {
                        console.log(colors.blue.bold(data));
    
                    } else if (type === 'success') {
                        console.log(colors.green.bold(data));
    
                    }

                } else {
                    console.log(data)
                }
                
            } else {
                console.log(data)
            }

        }

    }
}

export default new Logger();