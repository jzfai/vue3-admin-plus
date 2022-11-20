import buttonCodes from './button-codes'
import codesPermission from './codes-permission'
import rolesPermission from './roles-permission'
import lang from './lang'
export default function (app) {
  app.directive('ButtonCodes', buttonCodes)
  app.directive('CodesPermission', codesPermission)
  app.directive('RolesPermission', rolesPermission)
  app.directive('lang', lang)
}
