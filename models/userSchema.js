/**
 * @imports module
 * @const
 */
const mongoose = require('mongoose');
/**
 * @imports module
 * @const
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Mongoose Schema for User
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contactNo: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},
    {
        collection: 'userData'
    }
);



//Hashing the password
/**
 * @params {method}
 * @async
 */
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});


//generating Token

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}


const user = mongoose.model('USERDATA', userSchema);
/**
 * @exports {mongoose.model}
 */
module.exports = user;