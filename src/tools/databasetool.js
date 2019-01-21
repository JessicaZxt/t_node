
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qdzxt';



const findOne = (controllername, data, callback) => {
   
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection(controllername);
        //判断数据是否存在
        collection.findOne(data, (err, doc) => {
            // 关闭数据库
            client.close();
            callback(err, doc);
        })
    });
}

const insertOne = (controllername, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection(controllername);
        //判断数据是否存在
        collection.insertOne(data, (err, doc) => {
            // 关闭数据库
            client.close();
            callback(err, doc);
        })
    });
}

const find = (controllername, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection(controllername);
        //判断数据是否存在
        collection.find(data).toArray((err, docs) => {
            // 关闭数据库
            client.close();
            callback(err, docs);
        })
    });
}

module.exports = {
    findOne,
    insertOne,
    find
}