//导包
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');

//创建app
const app=express();

//设置在全文中都可以拿到json格式数据，对数据都可以进行解码
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

//设置静态根目录
app.use(express.static(path.join(__dirname,'public')));

//导入路由对象
const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'));
app.use('/account',accountRouter);

const studentRouter=require(path.join(__dirname,'routers/studentRouter.js'));
app.use('/student',studentRouter);


//启动
app.listen(8080,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');
})