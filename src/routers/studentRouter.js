//导包
const express=require('express');
const path=require('path');

//创建路由
const studentRounter=express.Router();

//导入控制器
const studentControllers=require(path.join(__dirname,'../controllers/studentController'))

//处理请求
studentRounter.get('/list',studentControllers.getListPage);
//访问新增页面
studentRounter.get('/add',studentControllers.getAddPage);
//发送数据到新增页面，并处理
studentRounter.post('/add',studentControllers.add);
//访问编辑页面
studentRounter.get('/edit/:studentId',studentControllers.getEditPage);
//修改后再提交
studentRounter.post('/edit/:studentId',studentControllers.edit);
//删除数据
studentRounter.get('/delete/:studentId',studentControllers.deleteStudent);


//导出
module.exports=studentRounter;