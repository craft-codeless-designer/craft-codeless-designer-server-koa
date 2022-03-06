const multer = require('@koa/multer');

//默认存储在项目根目录下的 /upload 文件夹
const filePath = './upload';

function uploads() {
  const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: Function) {
      cb(null, filePath);
    },
    filename: function (req: any, file: any, cb: Function) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({
    storage: storage,
  }).single('file');
  return upload;
}

function handler(ctx: any) {
  const { filename, originalname, size } = ctx.request.file;
  ctx.body = { filename, originalname, size };
}

export const { upload, routeHandler } = {
  upload: uploads(),
  routeHandler: handler,
};
