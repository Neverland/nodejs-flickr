/**
 * Created by enix@foxmail.com on 14-1-13.
 */

	module.exports = function (q, s, n) {
		require(process.cwd()+'/page/search')(q.query.q, function (data) {
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
	}