import { Context } from 'koa';
import { isNil } from 'lodash';
import { getManager } from 'typeorm';
import { EntityChart } from '../entity/EntityChart';
const { generate } = require('typeorm-code-generator');

export default class EntityChartController {
  public static async listCharts(ctx: Context) {
    const offset = ctx.request.body.offset;
    const limit = ctx.request.body.limit;

    const entityChartRepository = getManager().getRepository(EntityChart);
    const qb = entityChartRepository.createQueryBuilder();
    const pageList = await qb
      .select(['id', 'chart_name', 'DATE_FORMAT(MAX(time),"%Y-%m-%e %H:%i:%s") as time', 'COUNT(id) as count'])
      .groupBy('id')
      .orderBy('time', 'DESC')
      .skip(offset) //从第?行开始取
      .take(limit) //取?条结果
      .getRawMany();

    //获取总条数
    const totalCount = await qb.select('COUNT(DISTINCT id) as total').getRawOne();

    ctx.status = 200;
    ctx.body = { dataSet: pageList, ...totalCount };
  }

  public static async getEntityChartDetail(ctx: Context) {
    const entityChartRepository = getManager().getRepository(EntityChart);
    const chart = await entityChartRepository.findOne(+ctx.params.id);

    if (chart) {
      ctx.status = 200;
      ctx.body = chart;
    } else {
      ctx.status = 404;
    }
  }

  public static async newEntityChart(ctx: Context) {
    let newEntityChart = new EntityChart();
    newEntityChart.chartName = ctx.request.body.chartName;
    newEntityChart.chartData = JSON.stringify({});
    newEntityChart.entitySchemaJson = JSON.stringify({});

    getManager().transaction(async transactionalEntityManager => {
      newEntityChart = await transactionalEntityManager.save(newEntityChart);
    });

    ctx.status = 200;
    ctx.body = newEntityChart;
  }

  /**
   * 根据 id 更新 chart 内部的数据
   * @param ctx
   * @returns
   */
  public static async updateChartData(ctx: Context) {
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }

    const chartData = JSON.stringify(ctx.request.body.chartData);
    const entitySchemaJson = JSON.stringify(ctx.request.body.entitySchemaJson);
    const entityChartRepository = getManager().getRepository(EntityChart);
    const qb = entityChartRepository.createQueryBuilder();
    const result = await qb
      .update(EntityChart)
      .set({ chartData: chartData, entitySchemaJson: entitySchemaJson, time: new Date() })
      .where(' id = :id', { id: id })
      .execute();
    ctx.status = 200;
    ctx.body = result;

    try {
      //TODO:等代码生成执行成功之后再返回，如果有报错，把出错信息返回到页面上。
      /**
       * 调用 tcg (typeorm-code-generator) ，根据传入的 Entity Schema 动态生成代码。
       * 只要 JSON 数据符合 typeorm 框架定义的 Schema 格式， tcg 就可以动态生成代码。
       * 生成代码的实现细节请参考： https://github.com/craft-codeless-designer/typeorm-code-generator
       * 默认把代码生成在 src/tcg-generated 目录中
       */
      generate({ inputJSON: entitySchemaJson });
      // generate({ inputJSON: 'test.json', distPath: './src/test/test2/test3', entity: true, repository: true });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 更新 chart 本身的信息
   * @param ctx
   * @returns
   */
  public static async updateChartInfo(ctx: Context) {
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }

    const entityChartRepository = getManager().getRepository(EntityChart);
    const chartName = ctx.request.body.chartName;
    const qb = entityChartRepository.createQueryBuilder();
    const result = await qb.update(EntityChart).set({ chartName: chartName, time: new Date() }).where(' id = :id', { id: id }).execute();
    ctx.status = 200;
    ctx.body = result;
  }

  public static async deleteEntityChart(ctx: Context) {
    const id = ctx.request.body.id;
    if (isNil(id)) {
      return;
    }
    const entityChartRepository = getManager().getRepository(EntityChart);
    const qb = entityChartRepository.createQueryBuilder();
    const result = await qb.delete().from(EntityChart).where(' id = :id', { id: id }).execute();
    ctx.status = 200;
    ctx.body = result;
  }
}
