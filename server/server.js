const express=require('express');
const path=require('path');

const logger=require('morgan');  //http请求日志
const cookieParser=require('cookie-parser');  //设置、获取cookie
const session=require('express-session');   //在服务端保存数据的中间件
const bodyParser=require('body-parser');
const http=require('http');
const mongoose=require('mongoose');
const fs=require('fs');
const debug = require('debug')('test:server');

const app=express();

const route=require('./route');

const dbUrl='mongodb://127.0.0.1:27017/myspace';    //连接数据库
mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connect error !'));
db.once('open', function() {
    console.log('Mongodb started !');
});

app.use(logger('dev'));
//app.use(bodyParser.json());
//传输数据较大
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../dist')));


// app.get('*',function(req,res){
//     const html=fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),'utf-8');
//     res.send(html);
// })

app.use(route);

app.use(session({
	secret:'123',
	resave:false,
	saveUninitialized:true
}));


const port = '3000';
app.set('port', port);
const server=http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  