<h1 align="center">Craft Codeless Designer Server Koa</h1>

## 1.简介

基于 Koa 的服务端:

- 为 craft-codeless-designer-demo 提供服务，前端界面在此项目中：https://github.com/craft-codeless-designer/craft-codeless-designer-demo
- 利用 typeorm-code-generator 自动生成实体类和 CRUD 服务

## 2.用法

- 在 mysql 中创建一个数据库 ccd_codeless_designer
- 用 git clone 此项目
- 用 VSCode 打开项目，修改 ormconfig.json 中的数据库连接到你自己的数据库
- 此服务端默认使用 8888 端口，如需修改请编辑 /src/server.ts
- yarn install
- npm start

## 3.License

[MIT licensed](./LICENSE).
