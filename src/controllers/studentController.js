const template = require('art-template');
const path = require('path');
const databasetool = require(path.join(__dirname, '../tools/databasetool'));
const objectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qdzxt';

exports.getListPage = (req, res) => {
    //拿到请求地址中的参数
    const keywords = req.query.key || '';
    databasetool.find('studentinfo', { name: { $regex: keywords } }, (err, docs) => {
        var html = template(path.join(__dirname, '../public/html/list.html'), { student: docs, keywords, loginedName:req.session.loginedName });
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
    var html = template(path.join(__dirname, '../public/html/add.html'), {loginedName:req.session.loginedName});
    res.send(html);
}

//add添加数据到数据库，并跳转到学生列表
exports.add = (req, res) => {
    databasetool.insertOne('studentinfo', req.body, (err, result) => {
        if (!result) {
            res.send(`<script>alert('新增失败')</script>`);
        } else {
            res.send(`<script>location.href='/student/list'</script>`);
        }
    })
}

//跳转到编辑页面
exports.getEditPage = (req, res) => {
    const _id = databasetool.objectId(req.params.studentId);
    
    databasetool.findOne('studentinfo', { _id }, (err, doc) => {
        doc.loginedName=req.session.loginedName;
        var html = template(path.join(__dirname, '../public/html/edit.html'), doc);
        res.send(html);
    })
}

//修改数据后提交
exports.edit = (req, res) => {
    const _id = databasetool.objectId(req.params.studentId);
    databasetool.updateOne('studentinfo', { _id }, req.body, (err, doc) => {
        if (!doc) { //不成功，则提示修改失败
            res.send(`<script>alert('修改失败！')</script>`);

        } else {//如果提交成功，则跳转回学生列表页面
            res.send(`<script>location.href='/student/list'</script>`);
        }
    })

}

//删除学生数据
exports.deleteStudent = (req, res) => {
    const _id = databasetool.objectId(req.params.studentId);
    databasetool.deleteOne('studentinfo', { _id }, (err, doc) => {
        if (doc) {//删除成功则跳转页面
            res.send(`<script>location.href='/student/list'</script>`);
        } else {
            res.send(`<script>alert('删除失败！')</script>`);
        }

    })

}