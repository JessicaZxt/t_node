//导包
const express=require('express');
const path=require('path');

//创建路由
const studentRounter=express.Router();

//导入控制器
const studentControllers=require(path.join(__dirname,'../controllers/studentController'))

//处理请求
studentRounter.get('/list',studentControllers.getListPage);
studentRounter.get('/add',studentControllers.getAddPage);
studentRounter.post('/add',studentControllers.add);

//导出
module.exports=studentRounter;