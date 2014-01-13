/**
 * Created by enix@foxmail.com on 14-1-12.
 */

	module.exports = function (q, http, fn, errfn) {

		var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags='+ q +'&format=json&jsoncallback=?',
			fs = require('fs'),
			schedule = require('node-schedule'),
			rule = new schedule.RecurrenceRule(),
			dataPath = process.cwd()+'/data/'+ q +'.json',
			oldTime = 1000 * 60 * 60 * 4 ;

		//console.log(schedule)
		rule.minute = 45;
		schedule.scheduleJob(rule, function () {

			console.log('Romve all files on:' +(new Date).toLocaleDateString());
			removeCache();

		})

		fs.exists(dataPath, function (e) {
			e || getDataFromFlickr(function(data){

				writeIn(data);

			});
			e && getDataFromCache();

		});

		function removeCache() {

			var path = process.cwd()+'/data/';

			fs.readdir(path, function (err, files) {

				err || files.length && files.forEach(function (a) {
					fs.unlink(path + a);
				})
			});

		}

		function writeIn(data) {

			fs.writeFile(dataPath, data, {
				encoding : 'utf8',
				mode: 0666,
				flag: 'w'
			}, data);

		}

		function getDataFromCache() {

			//获取文件状态
			fs.stat(dataPath, function (err, stat) {
				if(err) return getDataFromFlickr();

				if(+new Date - (+new Date(stat.mtime)) < oldTime ){
					fs.readFile(dataPath, function(err, data){

						err ? getDataFromFlickr() : fn(JSON.parse(data));

					})
				} else {

					fs.unlink(dataPath, function () {
						getDataFromFlickr(function (data) {

							writeIn(data);

						})
					})
				}
				//console.log(stat);

			});
		}
		function getDataFromFlickr(callback) {

			http.get(url, function (res) {
				var d = '';
				res.setEncoding('utf8');
				res.on('data', function (data) {

					d += data;

				}).on('end', function () {
					//d = d.replace(/^(\()|(\))$/g,'');
					var data = (new Function('return '+ d.slice(1,-1))());
					//console.log(d);

					if(data.items.length>0) {
						data = {root: data}

						'function' == typeof(callback) && callback(JSON.stringify(data));
						'function' == typeof(fn) && fn(data);
					} else {
						errfn();
					}
				})

			}).on('error', function () {
				errfn();
			})
		}


	}