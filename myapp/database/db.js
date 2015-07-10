var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/users');//；连接数据库
var Schema = mongoose.Schema;   //  创建模型
var userScheMa = new Schema({
    name: String,
    password: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联

userScheMa.statics.findByName=function(username,callback){
   return this.find({name:username},callback);
}

//  与users集合关联
exports.user = db.model('appusers', userScheMa);
//module.exports = mongoose.model('User', UserSchema);