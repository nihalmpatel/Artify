// app/routes.js

module.exports= function(app,passport) {

    // HOME PAGE (with login links) 
    app.get('/',function(err,req,res){
        if (err) throw err;
        //res.render('index.ejs');
        res.send('hi!');
    });

}