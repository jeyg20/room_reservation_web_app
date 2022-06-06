const express = require ( 'express' );
const bodyparser = require("body-parser");
const app = express();

const postmodel = require('./models/post');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://pythonJ:Python123@cluster0.c1vms.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true})
.then(()=>{
  console.log("Connected to database");
})
.catch(()=>{
  console.log("Connection Failed");
});

app.use(bodyparser.json());

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.put("/api/posts/:id", (req, res, next)=>{
  const post = new postmodel({
    _id: req.body.id,
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    breakfast: req.body.breakfast,
    amenities: req.body.amenities
  });
  postmodel.updateOne({_id:req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message: "Update Successful!"})
  });
});

app.post("/api/posts",(req, res, next)=>{
  const post = new postmodel({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    breakfast: req.body.breakfast,
    amenities: req.body.amenities
  });
  post.save().then(result=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });

  });
});

app.get('/api/posts', (req, res, next) =>{
  postmodel.find()
  .then((documents)=>{
    console.log(documents);
    res.status(200).json({
      message: 'Posts Fetched Successfully',
      posts: documents
    });
  });
});

app.get("/api/posts/:id",(req, res, next)=>{  
    postmodel.findById(req.params.id).then(post =>{  
        if(post){  
          res.status(200).json(post);  
        }else{  
          res.status(484).json({message: 'Post not Found!'});  
        }  
      });  
});  

app.delete("/api/posts/:id", (req, res, next)=>{
  postmodel.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Post deleted!"
    });
  });
});

module.exports = app;
