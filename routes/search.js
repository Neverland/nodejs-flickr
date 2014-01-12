/**
 * Created by enix@foxmail.com on 14-1-13.
 */

	module.exports = function (q, s, http) {
		require(process.cwd()+'/page/search')(q.query.q, http, function (data) {
			//console.log
			s.locals.title = 'Flickr:' +q.query.q;
			s.render('search', data);

		}, function () {

			s.render('error');

		})
	}