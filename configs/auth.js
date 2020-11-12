module.exports = {
    ensureAuthenticated : (req, res, next) => {
        if(req.isAuthenticated()){
             return next();
            //return({isAuthenticated: true})
        }else{
            //return({isAuthenticated : false})
        }

       
    }
}