const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel.js");

//as we are exporting we can place everything into a function and pass bcrypt and passport
//as params
module.exports = function (passport, bcrypt) {
  //tells passport how to set up the cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  //tells passport how to "break open" the cookie
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  //this lays out a blueprint for passport in what way to deal with login.
  //local strategy sets up passport to deal with email and password in database set up
  passport.use(
    "local",
    new LocalStrategy(
      //sets up which fields to use as opposed to default user / password
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        //find the user and exit if there is an err
        User.findOne({ email: email }, (err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false, { message: "no such user" });
          //compare a hash of the user password to our hashed db password
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) return done(err);
            if (result === false)
              return done(null, false, { message: "Password did not match" });
            //pass user to req on everything being completed, null error
            return done(null, user);
          });
        });
      }
    )
  );
};
