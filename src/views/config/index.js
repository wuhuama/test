const FILE_PATH = process.env.NODE_ENV === 'production' ?
  '../../json/' : // 生产环境
  '/static/' // 开发环境

export {
  FILE_PATH
}
