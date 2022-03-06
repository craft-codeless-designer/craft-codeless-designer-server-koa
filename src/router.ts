/**
 * !IMPORTANT 如果使用了生成器自动生成代码，这份路由配置文件只能放在项目的根目录下，而且文件名不能修改，在自动生成的代码中会默认引用根目录下的这份路由配置文件。
 */
import Router from '@koa/router';
import EntityChartController from './controllers/EntityChartController';
import { routeHandler, upload } from './controllers/FileUpload';
import PageController from './controllers/PageController';
import UserController from './controllers/UserController';

const router = new Router();
router.post('/api/pages', PageController.getPages);
router.get('/api/pages/:id', PageController.getPage);
router.get('/api/page-copies/:pageId', PageController.getAllCopies);
router.post('/api/pages/new-page', PageController.newPage);
router.post('/api/pages/save', PageController.savePage);
router.post('/api/pages/update-pagedata', PageController.updatePageData);
router.post('/api/pages/update-pageinfo', PageController.updatePageInfo);
router.post('/api/pages/delete', PageController.deleteByPageId);

router.get('/api/users', UserController.listUsers);
router.get('/api/users/:id', UserController.showUserDetail);
router.put('/api/users/:id', UserController.updateUser);
router.delete('/api/users/:id', UserController.deleteUser);

router.post('/api/entity-chart', EntityChartController.listCharts);
router.get('/api/entity-chart/:id', EntityChartController.getEntityChartDetail);
router.post('/api/entity-chart/new-entity-chart', EntityChartController.newEntityChart);
router.post('/api/entity-chart/update-chart-info', EntityChartController.updateChartInfo);
router.post('/api/entity-chart/update-chart-data', EntityChartController.updateChartData);
router.post('/api/entity-chart/delete', EntityChartController.deleteEntityChart);

router.post('/api/upload', upload, routeHandler);

export { router };
