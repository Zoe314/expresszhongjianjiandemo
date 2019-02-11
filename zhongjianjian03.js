var express = require('express')
var app = express()
// 这是一个名为“myLogger”的中间件函数的简单示例。当对应用程序的请求通过时，此函数只打印“LOGGED”。中间件函数被分配给名为myLogger的变量。

// 注意上面的调用next（）。调用此函数会调用应用程序中的下一个中间件函数。 next（）函数不是Node.js或Express API的一部分，
// 而是传递给中间件函数的第三个参数。 next（）函数可以命名为任何东西，但按照惯例，它总是被命名为“next”。为避免混淆，请始终使用此约定。


// 要加载中间件函数，请调用app.use（），指定中间件函数。例如，以下代码在到根路径（/）的路由之前加载myLogger中间件函数。

// var myLogger = function (req, res, next) {
//   console.log('LOGGED')
//   next()
// }

// 每次应用程序收到请求时，它都会向终端输出消息“LOGGED”。

// 中间件加载的顺序很重要：首先加载的中间件函数也会先执行。

// 如果myLogger在到达根路径的路径之后加载，则请求永远不会到达，并且应用程序不会打印“LOGGED”，
// 因为根路径的路由处理程序会终止请求 - 响应周期。

// 中间件函数myLogger只是打印一条消息，然后通过调用next（）函数将请求传递给堆栈中的下一个中间件函数。

// app.use(myLogger)

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// 该应用程序现在使用requestTime中间件功能。 此外，根路径路由的回调函数使用中间件函数添加到req（请求对象）的属性。
// var requestTime = function (req, res, next) {
//   req.requestTime = Date.now()
//   next()
// }

// app.use(requestTime)

// app.get('/', function (req, res) {
//   var responseText = 'Hello World!<br>'
//   responseText += '<small>Requested at: ' + req.requestTime + '</small>'
//   res.send(responseText)
// })

// app.use('/user/:id', function (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })     
//Request URL: /user/jio    Request Type: GET


var router = express.Router()

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/', function (req, res) {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, function (req, res) {
  res.sendStatus(401)
})

app.listen(8080)