// app/routes.js

const user=require('./models/user.js');

module.exports= function(app) {

    // HOME PAGE (with login links) 
    app.get('/',function(req,res){

        res.render('index.ejs');
        //res.send('hi!');
    });

    var test=function(req,res,next){

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token){

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded; 
                console.log("Token accepted: "+decoded);
                next();
            }
            });

        } 
        else{
            
                //res.redirect('/login');
        
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            }); 
            
        } 
    };

    app.get('/login',function(req,res){
        res.render('login.ejs');
    });

    app.get('/signup',function(req,res){
        res.render('signup.ejs');
    });

    app.get('/stories',test,function(req,res){
        res.send('stories will available here.');
    });

    app.get('/new-story',function(req,res){
        res.render('new-story.ejs');
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
                            res.send("Signup successful!");
                            
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
                    //res.send('Welcome '+req.body.username);
                    var token=app.get('jwtoken').sign(users[0],app.get('superSecret'),{expiresIn:'24h'});
                    console.log(token);
                    res.redirect('/stories');
                }

                else{
                    res.send('Invalid password!');
                }
            }
        }); 
        
    });


}