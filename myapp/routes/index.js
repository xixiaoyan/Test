var express = require('express');
var fs = require('fs');
var router = express.Router();
var user = require('../database/db').user;
var multipart = require('connect-multiparty');

/* GET home page. */
router.get('/', function(req, res) {
      res.render('index', { title: 'index' });
});

//router.index = function(req , res){
//    res.render('index', {title : 'index'});
//}

/* login */
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

/* ucenter */
router.post('/ucenter', function(req, res) {
    var query = {username: req.body.username, password: req.body.password};
    (function(){
        user.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
            console.log("----"+doc+"----"+err+"----");
            if(doc == 1){
                console.log(query.username + ": 登陆成功 " + new Date());
                res.render('ucenter', { title:'ucenter' });
            }else{
                console.log(query.username + ": 登陆失败 " + new Date());
                res.redirect('/');
            }
        });
    })(query);
});

/* logout */
router.get('/logout',function(req,res){
  		res.redirect('/');
});

/*doregister*/
router.get('/doregister',function(req,res){
     res.render('register', {title: 'register'});
});

/* register */
router.post('/register',function(req,res){
    var insertuser=new user({username:req.body.username,password:req.body.password});//new user({name:'zhangsan',password:'123'});
    user.findOne({
        username:req.body.username
    },function(err,user){
            console.log(":user="+user+"---"+err+"----");
            if(user!=null){
                console.log(":注册失败,用户名重复" + new Date());
                res.send({success:'0',message:'注册失败，用户名重复！'});
            }else{
                insertuser.save(function(err){
                    if(err){
                        console.log(":注册失败" + new Date());
                        // res.sendStatus(1);
                        //res.send({data:"{'success':'0','message':'注册失败，请稍后重试！'}"});
                        res.send({success:'0',message:'注册失败，请稍后重试！'});
                    }else{
                        console.log( ":注册成功" + new Date());
                        res.send({success:'1',message:'注册成功，请在登录页面进行登录！'});
                    }
                });
            }
        }
    );
});

/*upload*/
router.get('/upload', function(req, res) {
    res.render('upload', { title: 'upload' });
});

/*doUpload*/
router.post('/doUpload', function(req, res) {
   /* //console.log(req.body);
    //console.log(req.files);
    console.log("---"+req.body.filename+"----");
   //console.log("---"+req.body.test+"----"+req.body.data.test+"----"+req.test+"----");
    console.log("---"+req.body.file+"---");
    console.log("---"+req.body+"---");
    console.log("---"+req.body.data+"---"+req.data+"----");
    console.log("----"+req.body.files+"---"+req.body.codecsv+"----"+req.codecsv+"-----");
    console.log("----"+req.files+"---");
    if (req.files && req.files.codecsv != 'undefined') {
        var temp_path = req.files.codecsv.path;
        if (temp_path) {
            fs.readFile(temp_path, 'utf-8', function(err, content) {
                //文件的内容
                console.log('content',content);
                // 删除临时文件
                fs.unlink(temp_path);
            });
        }
    }*/
    //console.log("--filename--"+req.body.filename+"---");
    //console.log("-data2--"+req.body.data+"---");
    //console.log("---"+req.body.data+"---");
    //console.log("---"+req.body.files+"---");
    //console.log("---"+req.files+"---"+req.body.files+"----");
    //console.log("----"+req.files.files.originalFilename+"----");
    console.log("----"+req.url+"----");
    console.log("---"+req.litImg+"---");
    console.log("---"+req.body.litImg+"---");
    console.log("----"+req.files+"---");
    //app.post('/upload', multipart(), function(req, res){
       // var filename = req.files.files.originalFilename || path.basename(req.files.files.ws.path);
       // var targetPath = path.dirname(__filename) + '/public/' + filename;
        //fs.createReadStream(req.files.files.ws.path).pipe(fs.createWriteStream(targetPath));
        //res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
   // });
});

/*upl iframe*/
router.get('/upl',function(req,res){
    //var str = fs.readFileSync("./upload.html");
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.end(str , "utf-8");
    res.render('uploadFiles');
});

module.exports = router;