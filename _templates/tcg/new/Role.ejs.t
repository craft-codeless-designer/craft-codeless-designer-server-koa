---
to: src/tcg-generated/Role.ts
---

/**
 * This file is genarated by typeorm-code-generator, it may be overwrited at any time. 
 * Please do NOT modify this file mannually.
 * 
 * NOTE: There must be a @koa/router config file in your project for the generated controllers.
 */

import {EntitySchema} from "typeorm";

/**
 * @class Role
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */ 
export const Role = new EntitySchema(JSON.parse('{"name":"Role","columns":{"id":{"name":"id","type":"varchar","primary":true,"generated":false,"nullable":false,"length":128}},"relations":{"users":{"type":"many-to-many","target":"User"}}}'));
