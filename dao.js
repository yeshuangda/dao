/**
 * Created by macbook on 2017/9/15.
 */
var MongodbClient=require("mongodb").MongoClient;
//数据库连接
var __mongodbconn=function (callback) {
    var url="mongodb://localhost:27017/test";
    MongodbClient.connect(url,function (err,db) {
        callback(err,db);
    })
}
//插入数据
exports.insertone=function (cname,json,callback) {
    __mongodbconn(function (err,db) {
        if(err){
            console.log("连接失败");
            return;
        }
        db.collection(cname).insertOne(json,function (err,result) {
            callback(err,result);
            db.close();
        })
    })
}
//查找数据
exports.find=function (cname,json,c,d) {
    var result=[];
    var page=0;
    var skip=0;
    var callback=null;
    if(arguments.length===3){
        callback=c;
    }else if(arguments.length===4){
        callback=d;
        page=10;
        skip=c*page-page;
    }
    __mongodbconn(function (err,db) {
        if(err){
            console.log("连接数据库失败");
            return;
        }
        var cuosr=db.collection(cname).find(json).limit(page).skip(skip);
        cuosr.each(function (err,data) {
            if(err){
                callback(err,null);
                db.close;
                return;
            }
            if(data!==null){
                result.push(data);
            }else{
                callback(null,result);
                db.close;
                result;
            }

        })
    })
}
//删除数据
exports.delete=function (cname,json,callback) {
    __mongodbconn(function (err,db) {
        db.collection(cname).deleteMany(
            json,
            function (err,result) {
                callback(err,result);
                db.close();
            }
        )
    })
}
//修改数据
exports.update=function (cname,json1,json2,callback) {
    __mongodbconn(function (err,db) {
        if(err){
            console.log("连接失败");
            return;
        }
        db.collection(cname).updateMany(
            json1,
            json2,
            function (err,result) {
                callback(err,result);
                db.close();
            }
        )
    })
}