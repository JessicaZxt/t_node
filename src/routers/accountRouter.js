//处理登录的页面
const express=require('express');
const path=require('path');


//创建路由对象
const accountRouter=express.Router();

//导入控制器模块
const accountController=require(path.join(__dirname,'../controllers/accountController'))

//获取注册页面的请求
accountRouter.get('/register',accountController.getRegisterPage);

//点击注册发送的post请求
accountRouter.post('/register',accountController.register);

//获取登录页面的请求
accountRouter.get('/login',accountController.getLoginPage);

//获取验证码图片
accountRouter.get('/vcode',accountController.getVcode);

//处理登录页面返回数据
accountRouter.post('/login',accountController.Login);


//导出路由对象
module.exports=accountRouter;