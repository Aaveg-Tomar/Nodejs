var express = require("express");
var bodyParser = require('body-parser');
var rn = require('random-number');

var app = express();

app.use(bodyParser.json());

// part 1 ---------------------------------------
// app.get('/' , (req , res)=>{
//     console.log(req.body);
//     res.send("world");

// })

// app.get('/user' , (req , res)=>{
//     res.send("hello");

// })

// app.post('/login' , (req , res) =>{
//     const username = req.body.username;
//     const password = req.body.password;

//     console.log(username);
//     console.log(password);

//     res.send("login");
// })

// Part2 -----------------------------------

//CURD Operations
var users=[
    {id:123 , name:"A" , age:27},
    {id:125 , name:"ef" , age:33},
    {id:127 , name:"cs" , age:21},
    {id:129 , name:"bb" , age:24},

];

app.get('/api/users' ,(req , res) =>{
    res.json(users);


   
})

app.get('/api/users/:id' , (req , res) =>{
    const id = req.params.id;
    console.log(id);

    const user = users.find((user)=>user.id==id);
    
    if(!user)
    {
        res.status(404).json({message:"user doesnot exists"});
    }

    res.send(user);

})

// Create a new User ------

var gen = rn.generator({
    min:  1
  , max:  1000
  , integer: true
  })

  
app.post('/api/users', (req, res) => {

    if(!req.body.name || !req.body.age)
    {
        res.status(400).json({message:"invalid Data! "});

    }
    const user = {  id:gen(),
                  name:req.body.name,
                  age:req.body.age 
                 }
    users.push(user);
    res.send(user);
    
});


// update the user via id

app.put('/api/users/:id' , (req , res)=>{
    const id = req.params.id;

  const user =   users.find((user)=>user.id==id);

    if(!user){
        res.status(404).json({message:"Invalid user id"});
    }

    const keys = Object.keys(req.body);

    keys.forEach((key)=>{
        if(!user[key])     
        {
            res.status(400).send({message:"invalid details passed in the body"});
        }

        user[key] = req.body[key];
    })

    res.send(user);
});


// delete Id  on basis of id

app.delete('/api/users/:id' , (req , res)=>{
    const id = req.params.id;
    const user = users.find((user)=>user.id == id);

    if(!user)
    {
        res.status(404).send({message:"invalid user id"})
    }

    users = users.filter((user)=>user.id !== parseInt(id));

    res.send(user);
})



app.listen(8002 , ()=>{
    console.log("Your server running on 8002");
})
