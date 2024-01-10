const passport = require('passport');
const {Strategy} = require('passport-local');
const User = require('../database/schemas/User');
const {comparePassword} = require('../utils/helpers');

passport.serializeUser((user, done)=>{
    console.log('Serializing user...');
    console.log(user);
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing User');
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    console.log(user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
    new Strategy(
        {
            usernameField: 'email',
        },
        async (email, password, done)=>{
            console.log(email);
            console.log(password);
            try {
                if(!email || !password) throw new Error('Missing credentials!');
                const userDB = await User.findOne({email});
                const isValid = comparePassword(password, userDB.password);
                if(isValid){
                    console.log('Authenticate successful!');
                    done(null, userDB)
                } else {
                    console.log('Invalid authentication!');
                    done(null, null);
                }
            } catch(err){
                console.log(err);
                done(err,null)
            }
        }
    )
);