import express from 'express';
import path from 'path';

const app = express();
const viewsRouter = express.Router();

app.use(express.json());

app.use(viewsRouter);

viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/join', serveStatic('join', 'user/'));
viewsRouter.use('/login', serveStatic('login', 'user/'));
viewsRouter.use('/mypage', serveStatic('mypage', 'user/'));
viewsRouter.use('/user-security', serveStatic('user-security', 'user/'));
viewsRouter.use('/orderlist', serveStatic('orderlist', 'order/'));
viewsRouter.use('/info/:id', serveStatic('info', 'order/', 'id'));
viewsRouter.use('/orderlist', serveStatic('orderlist', 'order/'));
viewsRouter.use('/admin', serveStatic('admin-admin', 'order/admin'));
viewsRouter.use('/ordercheck', serveStatic('admin-ordercheck', 'order/admin'));

function serveStatic(resource, temp = '', pathParam = null) {
  const resourcePath = path.join(__dirname, `./views/${temp}/${resource}`);
  const option = { index: `${resource}.html` };

  if (pathParam) {
    option.setHeaders = (res, path, stat) => {
      const paramValue = res.req.params[pathParam];

      res.set('X-Path-Param', paramValue);
    };
  }

  return express.static(resourcePath, option);
}

export { app };
