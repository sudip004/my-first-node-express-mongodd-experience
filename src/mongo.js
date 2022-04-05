const mongoose=require("mongoose")

const db = "mongodb+srv://G9:8509870013s@cluster0.v1f4d.mongodb.net/testdb?retryWrites=true&w=majority"
mongoose.connect(db,{
    useNewUrlParser: true
    // useCreateIndex:true,
    // useUnifiendTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("connection successful")
}).catch(()=>{
    console.log("no connection")
})

