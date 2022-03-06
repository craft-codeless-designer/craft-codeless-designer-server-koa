/**
 * This file is genarated by typeorm-code-generator, it may be overwrited at any time. 
 * Please do NOT modify this file mannually.
 */

import { Context } from 'koa';
import { isNil } from 'lodash';
import { getManager } from 'typeorm';
import { Role } from './Role';
import { router } from '../router';

/**
 * @class RoleController
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */ 
export default class RoleController {
  /**
   * 列出所有记录，不带分页。
   */ 
  public static async roleList(ctx: Context) {
    const roleRepository = getManager().getRepository(Role);
    const list = await roleRepository.find();

    ctx.status = 200;
    ctx.body = list;
  }

  public static async getRole(ctx: Context) {
    const roleRepository = getManager().getRepository(Role);
    const role = await roleRepository.createQueryBuilder().where({ id: ctx.params.id }).getOne();
    ctx.status = 200;
    ctx.body = role;
  }

  public static async saveRole(ctx: Context) {
    const roleRepository = getManager().getRepository(Role);
    const newRole=JSON.parse(ctx.request.body.Role);
    const role = await roleRepository.save(newRole);
    ctx.status = 200;
    ctx.body = role;
  }

  public static async deleteById(ctx: Context) {
    const roleRepository = getManager().getRepository(Role);
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }
    const qb = roleRepository.createQueryBuilder();
    const result = await qb.delete().from(Role).where(' id = :id', { id: id }).execute();
    ctx.status = 200;
    ctx.body = result;
  }
}

router.get('/api/role-list', RoleController.roleList);
router.get('/api/role/:id', RoleController.getRole);
router.post('/api/role/save', RoleController.saveRole);
router.delete('/api/role/:id', RoleController.deleteById);
