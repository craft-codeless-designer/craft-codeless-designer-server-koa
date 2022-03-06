/**
 * This file is genarated by typeorm-code-generator, it may be overwrited at any time. 
 * Please do NOT modify this file mannually.
 */

import {EntitySchema} from "typeorm";

/**
 * @class Role
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */ 
export const Role = new EntitySchema(JSON.parse('{"name":"role","columns":{"id":{"name":"id","type":"int","primary":true,"generated":true,"nullable":true},"roleName":{"name":"roleName","type":"varchar","primary":false,"generated":false,"nullable":true,"length":128}},"relations":{"users":{"type":"many-to-many","target":"user"},"permissions":{"type":"many-to-many","target":"permission","joinTable":{"target":"permission"}}}}'));
