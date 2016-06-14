//NODE MODULES
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash        = require('connect-flash')


var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000)

app.get('*', function(req,res){
	res.sendfile('views/addmenu.html')
})

// app.get('/items/all', function(req,res){
// 	res.json()
// })




