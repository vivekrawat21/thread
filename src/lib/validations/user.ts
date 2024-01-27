import * as z from 'zod';

export const userValidiation = z.object({
    profile_photo :z.string().url().min(1),
    name :z.string().min(3).max(30),  // can be passed as second varible in th  min function for the errors{message:'Minimum three characters'}
    username :z.string().min(3).max(30),
    bio :z.string().min(3).max(1000)   
})