/**
 * Created by enix@foxmail.com on 14-1-12.
 */

	module.exports = function (q, http, fn, errfn) {

		var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags='+ q +'&format=json&jsoncallback=?';

		http.get(url, function (res) {
			var d = '';
			res.setEncoding('utf8');
			res.on('data', function (data) {

				d += data;

			}).on('end', function () {
				//d = d.replace(/^(\()|(\))$/g,'');
				var data = (new Function('return '+ d.slice(1,-1))());
				//console.log(d);

				'function' == typeof(fn) && (data.items.length>0 ?fn({root: data}): errfn());
			})

		}).on('error', function () {
			errfn();
		})

	}