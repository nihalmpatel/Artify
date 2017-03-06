// app/routes.js

const user=require('models/user.js');

module.exports= function(app,passport) {

    // HOME PAGE (with login links) 
    app.get('/',function(req,res){

        res.render('index.ejs');
        //res.send('hi!');
    });

    app.get('/login',function(req,res){
        res.render('login.ejs');
    });

    app.get('/signup',function(req,res){
        res.render('signup.ejs');
    });

    app.post('/login',function(req,res){
        res.send(req.body.username);
    });


}