import buttonCodes from './button-codes'
import codesPermission from './codes-permission'
import rolesPermission from './roles-permission'
import lang from './lang'

import copy from './example/copy'
import longpress from './example/longpress'
import debounce from './example/debounce'
import watermark from './example/watermark'
import waves from './example/waves.js'
import clickoutside from './example/clickoutside'

export default function (app) {
  app.directive('ButtonCodes', buttonCodes)
  app.directive('CodesPermission', codesPermission)
  app.directive('RolesPermission', rolesPermission)
  app.directive('lang', lang)

  //example
  app.directive('copy', copy)
  app.directive('longpress', longpress)
  app.directive('debounce', debounce)
  app.directive('watermark', watermark)
  app.directive('waves', waves)
  app.directive('clickoutside', clickoutside)
}
