//导出一个方法，该方法获取注册页面
const path = require('path');
const captchapng = require('captchapng');

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qdzxt';

//访问注册页面
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/register.html'));
}

//处理注册页面返回数据
exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    };
    const { username } = req.body;
    console.log(username);

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection('accountinfo');
        //判断用户名是否存在
        collection.findOne({ username }, (err, doc) => {
            if (doc) {
                //存在
                result.status = 1;
                result.message = '用户名已存在';
                //关闭数据库
                client.close();
                //返回注册状态
                res.json(result);
            } else {
                //不存在，添加数据到数据库
                collection.insertOne(req.body, (err, result2) => {
                    if (!result2) {
                        //操作失败
                        result.status = 2;
                        result.message = '注册失败';

                    }
                    client.close();
                    //返回注册状态
                    res.json(result);
                })
            }
        })

    });

}

//访问登录页面
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
}

//获取验证码的图片
exports.getVcode = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    req.session.vcode = vcode;

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = Buffer.from(img, "base64");
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//处理登录页面返回数据
exports.Login = (req, res) => {
    const result = {
        status: 0,
        message: '登录成功'
    };
    //判断验证码是否正确
    const session = req.session.vcode;

    //取到传过来的用户名，密码，以及验证码的参数
    const { username, password, vcode } = req.body;
    console.log(username, password);

    console.log(session);
    //判断验证码是否正确
    if (session == vcode) {
        //继续判断用户名及密码是否正确
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            const db = client.db(dbName);
            // Get the documents collection
            const collection = db.collection('accountinfo');
            //判断用户名及密码是否存在
            collection.findOne({ username, password }, (err, doc) => {
                console.log(doc);
                if (!doc) {
                    //错误
                    result.status = 2;
                    result.message = '用户名或密码有误';
                }
                //关闭数据库
                client.close();
                //返回注册状态
                res.json(result);
            })

        });

    } else {
        //验证码不正确
        result.status = 1;
        result.message = '验证码错误';
        res.json(result);
    }
}