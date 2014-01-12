/**
 * Created by guoaimin on 14-1-12.
 */

	module.exports = function (q, fn, errfn) {

		require('http').get('http://api.flickr.com/services/feeds/photos_public.gne?tags='+ q +'&format=json&jsoncallback=?',function (res) {
			var d = '';
			res.setEncoding('utf8');
			res.on('data', function (data) {

				d += data;

			}).on('end', function () {
				//d = d.replace(/^(\()|(\))$/g,'');
				var data = (new Function('return '+ d.slice(1,-1))());
				//console.log(d);
				'function' == typeof(fn) && fn({root: data});
			})

		}).on('error', function () {
			errfn();
		})

	}