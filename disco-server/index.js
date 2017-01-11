var server = require('express')()

server.get('/', function(req, res) {
	res.send('Aces!');
})

server.listen(3000, function() {
	console.log('Running on 3000')
})