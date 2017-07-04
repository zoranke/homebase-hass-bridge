const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();

exports.start = function(PORT, cb) {
  // log request URL:
  app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
  });

  // parse request body:
  app.use(bodyParser());

  // add controller:
  app.use(controller());

  app.listen(PORT);

  console.log('server listen on port %s', PORT);
  cb(null, PORT);
};
