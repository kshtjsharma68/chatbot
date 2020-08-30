var  mongoose = require("mongoose")
var { v4 : uuidv4 } = require("uuid");
var bcrypt = require("bcrypt-nodejs");

// exports.USER_TYPES = {
//     CONSUMER: "consumer",
//     SUPPORT: "support"
// }

const SALT_FACTOR = 10


const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        name: String,
        email: String,
        password: String,
    },
    {
        timestamps: true,
        collection: "users",
    }
)

userSchema.statics.createUser = async function(
    name,
    email, 
    password
) {
    try {
        const user = await this.create({name, email, password});
        return user;
    }catch(e) {
        throw e;
    }
};


userSchema.statics.findUserForLogin = async function(email, password, callback) {
    return await this.findOne({email}, {})
        .exec(function(err, user) {
            if (err) {
                return callback(err)
            } else if(!user) {
                var err = new Error('User not found');
                err.status = 400;
                callback(err)
            }
            
            bcrypt.compare(password, user.password, function(err, result) {
                if (result == true) {   
                    return callback(null, user);
                } else {
                    return callback(err);
                }
            })
        });
}

var noop = function() {}

userSchema.pre("save", function(done) {
    var user = this;

    if ( !user.isModified("password") ) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return done(err); }

        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        })
    })
})

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
}

module.exports =  mongoose.model("User", userSchema)