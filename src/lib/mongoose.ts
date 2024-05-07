import mongoose from 'mongoose';
 
let connected =  false; //variable to check connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
   if(!process.env.MONGODB_URL) {
         console.error('MONGODB_URL is not Found');
         return;
    }
    if(connected) {
        console.log('Already connected to DB');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
           
        });
        connected = true;
        console.log('Connected to DB');
        
    }
    catch(err) {
        console.error('Error in connecting to DB', err);
    }
}