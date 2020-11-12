const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//User schema model
const User = require('../schemas/user');

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'userName'}, (userName, password, done)=>{
            
            User.findOne({userName : userName})
            .then(user => {
            
                if (!user) {
                    return done(null, false, { message: 'Username is Inccorrect' });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, { message: 'Password is incorrect' });
                    }
                });

                

            }).catch(err => console.log("error in passport config : ",err));
        })
    );
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            // delete user.password;
            console.log(' deserializeUser nnnn user : ', user)
          done(err, user);
        });
      });
}