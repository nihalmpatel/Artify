// app/routes.js

const user=require('./models/user.js');


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

    app.post('/signup',function(req,res){

        user.find({'local.username':req.body.username},function(err,users){
            if (err) throw err;

            //checking if user already exists 
            else if (users[0].local.username==req.body.username){
                res.send('User already exists!');
            } 

            else {
               //console.log('aaaaa');                
                var us=new user({
                    local:{
                        username : req.body.username,
                        password : req.body.password,
                        email : req.body.email, 
                    },
                    profile:{
                        firstname: '',
                        lastname: '',
                    }
                });
        
                us.save(function(err){
                    if (err) throw (err);
                    res.send('Signup Successful!');
                });

                //res.render('signup.ejs');
            } 
            
        });

        
    });

    app.post('/login',function(req,res){
        res.send(req.body.username);
    });


}