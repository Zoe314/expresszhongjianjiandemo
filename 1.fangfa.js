let express = require('express');   //express是函数
let app = new express();  //app是监听函数

app.use('/',function(req,res,next){
	// res.end('中间件');
	res.setHeader('Content-type','text/html;charset=utf-8')
	next();
})

app.get('/name',function(re1,res){
	res.end('访问name页')
	// res.body = 33333
})
app.get('/age',function(req,res){
	res.end('9')
})
app.all('*',function(req,res){
	// console.log(req)
	res.end('找不到'+req.method+req.path);
})

app.listen(3000,function(){
	console.log('监听子3000')
})
