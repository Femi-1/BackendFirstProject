//require mongoose
//From mongoose we use a method which is Sschema(this defines the structure of the doc we would store in a collection, its the thing that a model wraps around)
const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true}) 

// lets create awa model (model is with surrounds the Schema and provides us with and interface by which to communicate with  a DB)

const Blogs = mongoose.model('Blog', blogSchema)

module.exports = Blogs