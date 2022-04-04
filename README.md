<h1 align="center">Craft Codeless Designer Server Koa</h1>

## 1.简介

基于 Koa 的服务端:

- 为 craft-codeless-designer-demo 提供服务，前端界面在此项目中：https://github.com/craft-codeless-designer/craft-codeless-designer-demo 。**请先启动此服务端工程，然后再启动前端工程，前端工程依赖此工程提供服务。**
- 根据前端配置的页面自动生成实体类和 CRUD 接口。
- 根据前端配置的数据模型自动操作数据库表。

## 2.用法

- 在你的 mysql(或 MariaDB) 中创建一个数据库 ccd_codeless_designer (如果不想使用此默认的数据库名称，请修改此项目根目录下的 ormconfig.json 配置文件)。
- 用 git clone 此项目。
- 用 VSCode 打开项目，修改 ormconfig.json 中的数据库连接到你自己的数据库。
- 此服务端默认使用 8888 端口，如需修改请编辑 /src/server.ts
- yarn install
- npm start

## 3.注意

前端保存了数据模型设计之后，此服务端会自动执行以下动作：

- 自动调用 TCG 代码生成器来生成实体类和 CRUD 接口。
- typrorm 自动根据生成的实体类创建 SQL 语句，然后自动执行建表或者改表动作，如果存在错误的约束关系，alter table 可能失败。**注意：TCG 会根据前端页面上的数据模型配置自动调用 typeorm 同步表结构，所以请不要手动修改自动生成的那些数据库表，手动进行的操作会被覆盖掉。**
- 以上动作全部执行成功之后，服务器自动重启，自动生成的接口此时可以被前端正常调用。

**特别注意：如果以上过程出现了错误，需要手动做以下动作：**

- 到数据库中把自动生成的表删除。
- 手动把 tcg-generated 中生成的错误代码删除掉，然后重启此服务端。

关于 TCG 代码生成器的使用，请参考：https://github.com/craft-codeless-designer/typeorm-code-generator

关于 typeorm 的数据结构规范请参考：https://typeorm.io

## 4.License

[MIT licensed](./LICENSE).
