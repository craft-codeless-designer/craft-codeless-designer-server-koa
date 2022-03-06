<h1 align="center">Craft Codeless Designer Server Koa</h1>

## 1.简介

基于 Koa 的服务端，用于演示如何对接 Designer。

## 2.用法

- 先在 mysql 中创建一个数据库 ccd_codeless_designer
- 用 git clone 此项目
- 用 VSCode 打开项目，修改 ormconfig.json 中的数据库连接到你自己的数据库
- 此服务端默认使用 8888 端口，如需修改请编辑 /src/server.ts
- yarn install
- npm start

## 3.License

[MIT licensed](./LICENSE).
