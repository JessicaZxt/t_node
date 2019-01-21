const template = require('art-template');
const path = require('path');

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qdzxt';

exports.getListPage = (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('studentinfo');
        collection.find({}).toArray((err, docs) => {
            client.close();
            var html = template(path.join(__dirname, '../public/html/list.html'), {student:docs});
            res.send(html);
        })
    });

}