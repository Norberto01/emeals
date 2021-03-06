var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    //session = require('express-session'),
    //csrf = require('csurf'),
    //methodOverride = require('method-override'),
    //errorHandler = require('errorhandler'),
    //favicon = require('serve-favicon'),
    requireDir = require('require-dir'),
    partials = require('./routes/partials'),
    models = require('./models'),
    entityServerCtrl = require('./routes/entity/entityServerCtrl'),
    userServerCtrl = require('./routes/users/userServerCtrl');


var app = express();

//var routes = requireDir('./routes', {recurse: true});
//console.log(routes);
//for(var i in routes) app.use('/', routes[i]);
//var favicon = require('serve-favicon'),
// view engine setup
app.set('controllers', path.join(__dirname, 'controllers')) ;
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

//app.use(function (req, res) {
//    res.setHeader('Content-Type', 'text/plain')
//    res.write('you posted:\n')
//    res.end(JSON.stringify(req.body, null, 2))
//})
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/custom', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/bower_components'));
app.use('/modules', express.static(__dirname + '/public/app/components'));
//app.use(favicon(path.join('public','favicon.ico')));

//app.use('/', routes);
//app.use('/hellow', routes);

app.use('/partials/entities/:name', partials.entityRouter);
app.use('/partials/users/:name', partials.usersRouter);
app.use('/partials/:name', partials.defaultRouter);
app.use('/entity', entityServerCtrl);
app.use('/user', userServerCtrl);

// server view partials
//app.use('/partials', partials);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//app.get('/partials/:name', routes.partials);
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.get('/', function(req, res, next) {
    res.render('views/index');
});

module.exports = app;
