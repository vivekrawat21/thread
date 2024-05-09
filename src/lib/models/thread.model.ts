
import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true ,
    },
    
    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        // required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    
    },
    parentId:{
        type:String //If the thread is a comment 
    },
    children:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    
    }],
    

});

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;

// Thread Original:
//   ->Thread comment1
//   ->Thread comment2
//     ->Thread comment3(childs childs) mutliple levels of threads