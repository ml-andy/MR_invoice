const path = require('path');
const fs = require('fs');
const jsonServer = require('json-server');
const pause = require('connect-pause');

const server = jsonServer.create();
const port = 3000;
const pauseTime = 500;

const routesFile = path.resolve(__dirname, '../json-server/routes.json');

const createUrlRewriter = () => {
  const routes = JSON.parse(fs.readFileSync(routesFile));
  return jsonServer.rewriter(routes);
};

server.use(createUrlRewriter());

const target = {};
const files = fs.readdirSync(path.resolve(__dirname, '../json-server/modules/'));

files.forEach((file) => {
  if (file.indexOf('.json') > -1) {
    const fileModules = require(path.resolve(__dirname, '../json-server/modules/', file));
    const source = {
      [file.replace('.json', '')]: fileModules,
    };
    Object.assign(target, source);
  }
});

const router = jsonServer.router(target);

server.use(jsonServer.defaults());
server.use(pause(pauseTime));
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running at ${port}`);
});
