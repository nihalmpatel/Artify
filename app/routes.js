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
            else if (users.length!==0){
                res.send('User already exists!');
            } 

            else {   
                // check if email id already exists
                user.find({'local.email':req.body.email},function(err,users){
                    if (err) throw err;

                    else if (users.length!==0){
                        res.send('An account exists with the entered email!');
                    }

                    // if everything is fine, register the user
                    else{
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
                    }
                });
        
            } 
            
        });

        
    });

    app.post('/login',function(req,res){

        user.find({'local.username':req.body.username},function(err,users){

            if (err) throw err;

            //checking if user doesn't exist
            if (users.length==0){
                res.send('User doesn\'t exist!');
            }

            else{

                if(users[0].local.password===req.body.password){
                    res.send('Welcome '+req.body.username);
                }

                else{
                    
                    res.send('Invalid password!');
                }
            }
        }); 
        
    });


}