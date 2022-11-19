const express = require('express')
const { title } = require('process')
const app = express()
const morgan = require('morgan')
const { log } = require('console')
const mongoose = require('mongoose')
const Blogs = require ('./models/blogs.js')
console.log(Blogs);
require('dotenv/config')
// app.get('/',(req,res)=>{
//     res.send('Hello guys')
// })

// Template engine or view engine
//So far we have been serving html files, so we use template engine to render dynamic data
// We have different template engines like ejs,hbs and pug, but we would use ejs since its quite simple and has nice features
// ejs has a syntax like html but it just allows us to inject dynamic data
// ===== See below how to use ejs and its features==============
//1) install ejs ------ npm install ejs --- check the package.json to confirm the installation
// 2) to use it u can check it out on npmjs.com
// app.set('view engine',ejs) --- the set enables us to configure some app settings..... so ejs now knows 2 to 2 your views folder and search for the exact file u want to serve but if the folder install titiled view then you can create lets say work folder and put in a file like index.ejs and input html templates.... but in the app.js which is awa server file ..... u need to telll ejs thAT u ave a different folder for your view by doing the below
// app.set('view engine',ejs), app.set('views','work')...... to show the work we render and not sendFile ---- res.render('index')
//
//=========================================================================================================================================

// app.get('/',(req,res)=>{
//     res.sendFile('./views/index.html',{root:__dirname})
// })

// app.get('/about',(req,res)=>{
//     res.sendFile('./views/about.html',{root:__dirname})
// })

// app.use((req,res)=>{
//     res.sendFile('./views/error.html',{root:__dirname})
// })


app.set('view engine','ejs')
//==== Middleware Examples
//Even the functions that run in our requests are also middleware, remember that middleware are codes that run on the server d diff is d get req only fires a function for certain routes while use method runs for every req for all routes

//Logger middleware to log details of every request
//Authentication check middleware for protected routes
//Middleware to parse json data from requests
//Return 404 pages(as we have seen already)

app.use(express.urlencoded({extended:true}))
const DbUrl = process.env.DBURL


mongoose.connect(DbUrl)
.then((res)=> console.log('Db connected successfully'))
.catch((err)=> console.log(err))
//START OF TESTING AWA MODELS AND DB
app.get('/add-blog',(req,res)=>{
    const BLOGS = new Blogs({
        title:'latest newssssss',
        message:'we don dey test am',
        name:'Eggys'
    })
    BLOGS.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{console.log(err);})
})

app.get('/all-blogs',(req,res)=>{
    Blogs.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})


app.get('/single-Blog',(req,res)=>{
    Blogs.findById('636fac9af0545d0e717fc5d0')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

//index.ejs
app.use((req,res,next)=>{
    console.log('new request has been made');
    console.log('host:', req.hostname);
    console.log('path:',req.path);
    console.log('method',req.method);

    next()
})

app.use(express.static('public'))
//index.ejs
app.get('/',(req,res)=>{

Blogs.find()
.then((result)=>{
    res.render('index',{title:'Home', Blogs: result})
})
.catch((err)=>{
    console.log(err);
})

    // const newBlogs =[
    //     {title: 'Femi likes to code',body:'And also works'},
    //     {title: 'Tims likes to go for break',body:'And also code'},
    //     {title:'Kamso likes to debug', body:'And also laffs'}
    // ];

    // res.render('index',{title:'Home', newBlogs})
})

//about.ejs
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'})
})

// CreateBlog

app.get('/createBlog',(req,res)=>{
    res.render('createBlog',{title:'Create Blog'})
})

// GET, POST AND DELETE REQUEST

//========================== Post Request ============================================

// Now we use app.post('')
// Ensure that the name attribute on the form is same as the key property used in the schema
// Also we need a middleware that would attach body 2d req, see below
// app.use(express.urlencoded({extended:true}))





app.post('/',(req,res)=>{
    console.log(req.body);
    const singleBlogs = new Blogs(req.body)
    singleBlogs.save()
    .then((rr)=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err);
    })
})

// ============================= Routing to details.ejs ===============================================
app.get('/index/:id',(req,res)=>{
    const id = req.params.id
    Blogs.findById(id)
    .then((Result)=>{
        res.render('details',{Blogs:Result, title: 'details page'})
    })
    .catch((err)=>{
        console.log(err);
    })
})
// DELETE

app.delete('/index/:id', (req,res)=>{
    const id = req.params.id
    Blogs.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/'})
    })
    .catch((err)=>{
        console.log(err);
    })
})







// error page
app.use((req,res)=>{
    res.render('error',{title:'Error'})
})


app.listen(1000)

