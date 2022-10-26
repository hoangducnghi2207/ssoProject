const checkLogin=(req,res,next)=>{
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        if(req.path==='/login'){
            return res.redirect("/")
        }
        
        next();
    } else{
        if(req.path==='/login'){
            next()
        }
        else{
        return res.redirect("/login");}
    }
}
module.exports = { checkLogin }