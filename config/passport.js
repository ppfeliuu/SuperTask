const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al modelo que se va autenticar
const Usuarios = require('../models/Usuarios');


// local strategy - login con credenciales propios (usuarios y password)

passport.use(new LocalStrategy(
    // por default espera usuario y password
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const usuario = await Usuarios.findOne({
                where: {
                    email,
                    activo: 1
                }
            });
            // El usuario existe, password incorrecto
            if(!usuario.verificarPassword(password)) {
                return done(null, null, {message: 'Password incorrecto'})
            }
            // El email existe y pass correct

        return done(null, usuario);

        } catch (error) {
            // Usuario no existe
            return done(null, null, {message: 'Esta cuenta no existe'})
        }
    }
));

// Serializar el usuario
passport.serializeUser((usuario, callback) =>{
    callback(null, usuario);
});

// deserializar usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;

