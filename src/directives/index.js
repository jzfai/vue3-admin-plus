import permission from './permission'
import copy from './copy'
import longpress from './longpress'
import debounce from './debounce'
import watermark from './watermark'
import waves from './waves/waves'
import clickoutside from './clickoutside'
export default function (app) {
  app.directive('permission', permission)
  app.directive('copy', copy)
  app.directive('longpress', longpress)
  app.directive('debounce', debounce)
  app.directive('watermark', watermark)
  app.directive('waves', waves)
  app.directive('clickoutside',clickoutside)
}
