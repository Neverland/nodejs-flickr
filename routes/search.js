/**
 * Created by enix@foxmail.com on 14-1-13.
 */

	module.exports = function (q, s, http) {

		q = q.query.q;

		require(process.cwd()+'/page/search')(q, http, function (data) {
			//console.log
			s.locals.title = 'Flickr: '+q;
			s.locals.query = q;
			s.render('search', data);

		}, function () {

			s.render('error');

		})
	}