const template = require('art-template');
const path = require('path');
const databasetool = require(path.join(__dirname, '../tools/databasetool'));

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qdzxt';

exports.getListPage = (req, res) => {
    //拿到请求地址中的参数
    const keywords = req.query.key || '';
    databasetool.find('studentinfo', { name: { $regex: keywords } }, (err, docs) => {
        var html = template(path.join(__dirname, '../public/html/list.html'), { student: docs, keywords });
        res.send(html);
    })

    /* MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('studentinfo');
        collection.find({ name: { $regex: keywords } }).toArray((err, docs) => {
            client.close();
            var html = template(path.join(__dirname, '../public/html/list.html'), { student: docs, keywords });
            res.send(html);
        })
    }); */

}

//跳转到add页面
exports.getAddPage = (req, res) => {
    var html = template(path.join(__dirname, '../public/html/add.html'), {});
    res.send(html);
}

//add添加数据到数据库，并跳转到学生列表
exports.add=(req,res)=>{
    databasetool.insertOne('studentinfo',req.body,(err,result)=>{
        if(!result){
            res.send(`<script>alert('新增失败')</script>`);
        }else{
            res.send(`<script>location.href='/student/list'</script>`);
        }
    })
}