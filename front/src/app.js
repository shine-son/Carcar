// import cors from 'cors';
// import express from 'express';
// import { viewsRouter } from './routers';

// const app = express();

// // CORS 에러 방지
// app.use(cors());

// // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.json());

// // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.urlencoded({ extended: false }));

// //html, css, js 라우팅
// app.use(viewsRouter);

/* */

// import cors from 'cors';
// import express from 'express';
// import { viewsRouter } from './routers';

// const app = express();

// // CORS 에러 방지
// app.use(cors());

// // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.json());

// // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.urlencoded({ extended: false }));

// //html, css, js 라우팅
// app.use(viewsRouter);

// export { app };
import express from 'express';
import path from 'path';

const app = express();
const viewsRouter = express.Router();
const __dirname = path.resolve();
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// html, css, js 라우팅
app.use(viewsRouter);

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
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
viewsRouter.use('/main', serveStatic('main', 'product/'));
viewsRouter.use('/cart', serveStatic('cart', 'order/'));
viewsRouter.use('/product/:id', serveStatic('product', 'product/', 'id'));
viewsRouter.use('/product_list', serveStatic('product_list', 'product/'));
// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
//temp값이 undefined 일 때 기본적으로 빈 string 값이 들어간다
function serveStatic(resource, temp = '', pathParam = null) {
  const resourcePath = path.join(__dirname, `./src/views/${temp}/${resource}`);
  const option = { index: `${resource}.html` };

  if (pathParam) {
    option.setHeaders = (res, path, stat) => {
      // Get the value of the path parameter from the request params
      const paramValue = res.req.params[pathParam];
      // Set the path parameter value as a header
      res.set('X-Path-Param', paramValue);
    };
  }

  return express.static(resourcePath, option);
}

export { app };
