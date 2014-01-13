
	var express = require('express'),
		routes = require('./routes'),
		user = require('./routes/user'),
		search = require('./routes/search'),
		http = require('http'),
		path = require('path'),
		http = require('http'),
		app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.compress({level: 6}));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000*6}));
	app.use(express.static(path.join(__dirname, 'bower_components'), {maxAge: 86400000*30}));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.get('/', routes.index);
	app.get('/users', user.list);
	app.get('/search', function (q, s, n) {
		search(q, s, http);
	});


	app.listen(app.get('port'), function(){
	    console.log('Express server listening on port ' + app.get('port'));
	});
