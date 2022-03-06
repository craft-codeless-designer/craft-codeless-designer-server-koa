/**
 * This file is genarated by typeorm-code-generator, it may be overwrited at any time. 
 * Please do NOT modify this file mannually.
 */

import {EntitySchema} from "typeorm";

/**
 * @class Permission
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */ 
export const Permission = new EntitySchema(JSON.parse('{"name":"permission","columns":{"id":{"name":"id","type":"int","primary":true,"generated":true,"nullable":true},"code":{"name":"code","type":"varchar","primary":false,"generated":false,"nullable":false,"length":128}},"relations":{"roles":{"type":"many-to-many","target":"role"}}}'));
