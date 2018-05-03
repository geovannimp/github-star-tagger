var restify = require('restify');
var request = require('request');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/auth/github', function (req, res, next) {
  res.redirect({
    hostname: 'github.com',
    pathname: '/login/oauth/authorize',
    secure: true,
    permanent: true,
    query: {
      redirect_uri: 'http://localhost:8080/auth/github/callback',
      client_id: '0eab799f57691afc35c5',
    }
  }, next);
});

server.get('/auth/github/callback', function (req, res, next) {
  request.post('https://github.com/login/oauth/access_token', {
    form: {
      client_id: '0eab799f57691afc35c5',
      client_secret: '7bb0d9e12f68f05b5d3d860a3f467804e711419b',
      code: req.query.code,
    },
    json: true
  }, function (err, res2, body) {
    res.send(body);
    next();
  })
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
