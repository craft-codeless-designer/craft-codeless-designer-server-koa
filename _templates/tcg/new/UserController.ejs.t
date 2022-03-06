---
to: src/tcg-generated/UserController.ts
---

/**
 * This file is genarated by typeorm-code-generator, it may be overwrited at any time. 
 * Please do NOT modify this file mannually.
 */

import { Context } from 'koa';
import { isNil } from 'lodash';
import { getManager } from 'typeorm';
import { User } from './User';
import { router } from '../router';

/**
 * @class UserController
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */ 
export default class UserController {
  /**
   * 列出所有记录，不带分页。
   */ 
  public static async userList(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const list = await userRepository.find();

    ctx.status = 200;
    ctx.body = list;
  }

  public static async getUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.createQueryBuilder().where({ id: ctx.params.id }).getOne();
    ctx.status = 200;
    ctx.body = user;
  }

  public static async saveUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const newUser=JSON.parse(ctx.request.body.User);
    const user = await userRepository.save(newUser);
    ctx.status = 200;
    ctx.body = user;
  }

  public static async deleteById(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }
    const qb = userRepository.createQueryBuilder();
    const result = await qb.delete().from(User).where(' id = :id', { id: id }).execute();
    ctx.status = 200;
    ctx.body = result;
  }
}

router.get('/api/user-list', UserController.userList);
router.get('/api/user/:id', UserController.getUser);
router.post('/api/user/save', UserController.saveUser);
router.delete('/api/user/:id', UserController.deleteById);
