/**
 * This file is genarated by typeorm-code-generator, it may be overwrited at any time. 
 * Please do NOT modify this file mannually.
 */

import { Context } from 'koa';
import { isNil } from 'lodash';
import { getManager } from 'typeorm';
import { Permission } from './Permission';
import { router } from '../router';

/**
 * @class PermissionController
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */ 
export default class PermissionController {
  /**
   * 列出所有记录，不带分页。
   */ 
  public static async permissionList(ctx: Context) {
    const permissionRepository = getManager().getRepository(Permission);
    const list = await permissionRepository.find();

    ctx.status = 200;
    ctx.body = list;
  }

  public static async getPermission(ctx: Context) {
    const permissionRepository = getManager().getRepository(Permission);
    const permission = await permissionRepository.createQueryBuilder().where({ id: ctx.params.id }).getOne();
    ctx.status = 200;
    ctx.body = permission;
  }

  public static async savePermission(ctx: Context) {
    const permissionRepository = getManager().getRepository(Permission);
    const newPermission=JSON.parse(ctx.request.body.Permission);
    const permission = await permissionRepository.save(newPermission);
    ctx.status = 200;
    ctx.body = permission;
  }

  public static async deleteById(ctx: Context) {
    const permissionRepository = getManager().getRepository(Permission);
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }
    const qb = permissionRepository.createQueryBuilder();
    const result = await qb.delete().from(Permission).where(' id = :id', { id: id }).execute();
    ctx.status = 200;
    ctx.body = result;
  }
}

router.get('/api/permission-list', PermissionController.permissionList);
router.get('/api/permission/:id', PermissionController.getPermission);
router.post('/api/permission/save', PermissionController.savePermission);
router.delete('/api/permission/:id', PermissionController.deleteById);
