/*
 * GET home page.
 */

exports.index = function (req, res) {
	res.locals.title = 'Flickr';
	res.render('index');
};