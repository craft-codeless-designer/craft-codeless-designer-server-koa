/**
 * This file is genarated by typeorm-code-generator, it may be overwrited at any time.
 * Please do NOT modify this file mannually.
 */

import { EntitySchema } from 'typeorm';

/**
 * @class User
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */
export const User = new EntitySchema(
  JSON.parse(
    '{"name":"user","columns":{"id":{"name":"id","type":"int","primary":true,"generated":true,"nullable":true},"userName":{"name":"userName","type":"varchar","primary":false,"generated":false,"nullable":true,"length":128}},"relations":{"roles":{"type":"many-to-many","target":"role","joinTable":{"target":"role"}}}}',
  ),
);
