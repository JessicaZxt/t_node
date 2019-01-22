
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qdzxt';


//查找一条数据
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

//新增一条数据
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

//找到匹配的数据
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

//修改一条数据
const updateOne = (controllername, id, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection(controllername);
        //判断数据是否存在
        collection.updateOne(id, { $set: data }, (err, doc) => {
            // 关闭数据库
            client.close();
            callback(err, doc);
        })
    });
}

//删除一条数据
const deleteOne=(controllername,id,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection(controllername);
        //判断数据是否存在
        collection.deleteOne(id, (err, doc) => {
            // 关闭数据库
            client.close();
            callback(err, doc);
        })
    });
}

const objectId = require('mongodb').ObjectID;

module.exports = {
    findOne,
    insertOne,
    find,
    objectId,
    updateOne,
    deleteOne
}