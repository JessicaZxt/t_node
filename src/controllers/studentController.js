const template = require('art-template');
const path = require('path');

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qdzxt';

exports.getListPage = (req, res) => {
    //拿到请求地址中的参数
    const keywords = req.query.key || '';
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('studentinfo');
        collection.find({name:{$regex:keywords}}).toArray((err, docs) => {
            client.close();
            var html = template(path.join(__dirname, '../public/html/list.html'), { student: docs, keywords });
            res.send(html);
        })
    });

}