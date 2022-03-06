import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { router } from './router';

createConnection()
  .then(() => {
    const app = new Koa();
    app.use(cors());
    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods());
    app.use(
      koaStatic(path.resolve(__dirname, '..') + '/upload', {
        hidden: false,
        defer: true,
        gzip: true,
      }),
    );
    app.listen(8888);
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
