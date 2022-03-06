import { Context } from 'koa';
import { isNil } from 'lodash';
import { getManager } from 'typeorm';
import { Page } from '../entity/Page';

/**
 * @class PageController
 * 示例代码，请勿直接用于生产环境。
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */
export default class PageController {
  /**
   * 根据 id 获取最新保存的页面数据
   * @param ctx
   */
  public static async getPage(ctx: Context) {
    const pageRepository = getManager().getRepository(Page);
    const page = await pageRepository.createQueryBuilder().where({ id: ctx.params.id }).getOne();
    ctx.status = 200;
    ctx.body = page;
  }

  /**
   * 获取所有副本
   * @param ctx
   */
  public static async getAllCopies(ctx: Context) {
    const pageRepository = getManager().getRepository(Page);
    const pageList = await pageRepository.createQueryBuilder().where({ pageId: ctx.params.pageId }).orderBy('time', 'DESC').getMany();
    ctx.status = 200;
    ctx.body = pageList;
  }

  /**
   * 获取所有页面列表，以 page-id 做 distinct ，以创建时间倒排，带分页，带数量统计。
   * @param ctx
   */
  public static async getPages(ctx: Context) {
    const offset = ctx.request.body.offset;
    const limit = ctx.request.body.limit;

    const pageRepository = getManager().getRepository(Page);
    const qb = pageRepository.createQueryBuilder();
    const pageList = await qb
      .select([
        'id',
        'page_id',
        'page_name',
        'page_route',
        'device_type',
        'DATE_FORMAT(MAX(time),"%Y-%m-%e %H:%i:%s") as time',
        'COUNT(page_id) as count',
      ])
      .groupBy('page_id')
      .orderBy('time', 'DESC')
      .skip(offset) //从第?行开始取
      .take(limit) //取?条结果
      .getRawMany();

    //获取总条数
    const totalCount = await qb.select('COUNT(DISTINCT page_id) as total').getRawOne();

    ctx.status = 200;
    ctx.body = { dataSet: pageList, ...totalCount };
  }

  /**
   * 保存页面
   * @param ctx
   */
  public static async savePage(ctx: Context) {
    const pageRepository = getManager().getRepository(Page);
    const newPage = new Page();
    newPage.pageId = ctx.request.body.pageId;
    newPage.pageData = JSON.stringify(ctx.request.body.pageData);
    newPage.deviceType = ctx.request.body.deviceType;

    const page = await pageRepository.save(newPage);
    ctx.status = 200;
    ctx.body = page;
  }

  public static async newPage(ctx: Context) {
    let newPage = new Page();
    newPage.pageId = ctx.request.body.pageId;
    newPage.pageName = ctx.request.body.pageName;
    newPage.pageData = JSON.stringify(ctx.request.body.pageData);
    newPage.deviceType = ctx.request.body.deviceType;

    getManager().transaction(async transactionalEntityManager => {
      newPage = await transactionalEntityManager.save(newPage);
      newPage.pageRoute = `/page/${newPage.id}`;
      newPage = await transactionalEntityManager.save(newPage);
    });

    ctx.status = 200;
    ctx.body = newPage;
  }

  /**
   * 更新页面内部的数据
   * @param ctx
   * @returns
   */
  public static async updatePageData(ctx: Context) {
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }

    const pageData = JSON.stringify(ctx.request.body.pageData);
    const pageRepository = getManager().getRepository(Page);
    const qb = pageRepository.createQueryBuilder();
    const result = await qb.update(Page).set({ pageData: pageData, time: new Date() }).where(' id = :id', { id: id }).execute();
    ctx.status = 200;
    ctx.body = result;
  }

  public static async updatePageInfo(ctx: Context) {
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }

    const pageName = ctx.request.body.pageName;
    const deviceType = ctx.request.body.deviceType;

    const pageRepository = getManager().getRepository(Page);
    const qb = pageRepository.createQueryBuilder();
    const result = await qb
      .update(Page)
      .set({ pageName: pageName, deviceType: deviceType, time: new Date() })
      .where(' id = :id', { id: id })
      .execute();
    ctx.status = 200;
    ctx.body = result;
  }

  /**
   * 删除页面
   * @param ctx
   * @returns
   */
  public static async deleteByPageId(ctx: Context) {
    const pageId = ctx.request.body.pageId;
    if (isNil(pageId)) {
      return;
    }
    const pageRepository = getManager().getRepository(Page);
    const qb = pageRepository.createQueryBuilder();
    const result = await qb.delete().from(Page).where(' page_id = :page_id', { page_id: pageId }).execute();
    ctx.status = 200;
    ctx.body = result;
  }
}
