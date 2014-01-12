
	var express = require('express');
	var routes = require('./routes');
	var user = require('./routes/user');
	var http = require('http');
	var path = require('path');

	var app = express();

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
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'bower_components')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.get('/', routes.index);
	app.get('/users', user.list);

		/*require('http').get('http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&format=json&jsoncallback=?',function (res) {
			var d = '';
			res.setEncoding('utf8');
			res.on('data', function (data) {

				d += data;

			}).on('end', function () {
				//console.log(typeof(d))
				d = d.replace(/^(\()|(\))$/g,'');
				d = JSON.parse('{"root":'+d+'}')
				console.log(d.root.title)
			})

		}).on('error', function () {

		})*/

	app.get('/search', function (q, s, n) {
		require('./search.js')(q.query.q, function (data) {
			//console.log
			if(data.root.items.length == 0) {
				s.render('error');
				return;
			}
			s.locals.title = 'Flickr:' +q.query.q;
			s.render('search', data);

		}, function () {

			s.render('error');

		})
	})



	app.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
