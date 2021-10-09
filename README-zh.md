# vue3-admin-plus

> vue3-admin-plus 提供企业级开发demo


本架构使用的技术为：vue3(setup-script)+vite2+element-plus 的新一代的前端框架，框架使用类似 vue-admin-admin

使用 eslint+prettier 格式和校验代码,提高代码规范性和开发效率

[Access address](http://8.135.1.141/vue3-admin-plus)

[国内访问](http://8.135.1.141/vue3-admin-plus)

## 更新日志

```javascript
//10-08
add error log collection func
```

## 例子

 ---- 我们先看看加载速度和构建后的包大小：

![template-speed-analysis](http://8.135.1.141/file/images/template-speed-analysis.png)

![template-demo](http://8.135.1.141/file/images/plus-demo.png)

## 相关项目

- js版本：[vue3-element-admin](https://github.com/jzfai/vue3-admin-template.git)
- ts版本：[vue3-element-ts](https://github.com/jzfai/vue3-admin-ts.git)
- js实例参考版本：[vue3-element-plus](https://github.com/jzfai/vue3-admin-plus.git)
- react版本： [react-admin-template](https://github.com/jzfai/react-admin-template.git)
- 微服务后台数据：[micro-service-plus](https://github.com/jzfai/micro-service-plus)


## 文档
-- 文档努力开发中。。。。
可以先参考(和vue-admin-template使用类似)：[vue-admin-template使用文档](https://juejin.im/post/59097cd7a22b9d0065fb61d2)


## 构建步骤

```bash
# 克隆项目
git clone https://github.com/jzfai/vue3-admin-plus.git

# 进入项目目录
cd  vue3-admin-plus

# 安装依赖(建议用yarn)
yarn

# 启动服务
yarn run dev
```

浏览器访问 http://localhost:5002


## 发布

```bash
# 构建测试环境
yarn run build

# 构建生产环境
yarn run build-serve
```

## 其它

```bash
# 预览发布环境效果
yarn run preview:build-serve

# 预览生产环境
yarn run preview

# 代码格式检查并自动修复
yarn run lint
```

## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - serve
  - build
  - priview
  - lint

- 全局功能
  #- 国际化多语言
  #- 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  #- Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  #- JSON 等多格式

#- Excel
  #- 导出excel
  #- 导入excel
  #- 前端可视化excel
  #- 导出zip

- 表格
  - 动态表格
  #- 拖拽表格
  #- 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  #- 拖拽Dialog
  #- 拖拽Select
  #- 拖拽看板
  #- 列表拖拽
  #- SplitPane
  #- Dropzone
  #- Sticky
  #- CountTo

- 综合实例
- 错误日志
- Dashboard
#- 引导页
- ECharts 图表
#- Clipboard(剪贴复制)
#- Markdown2html
```

>注：#---暂未实现(希望大家能一起开发)

## 额外

本架构还在努力完善中.....

## 浏览器支持

注意：vue3不在支持IE浏览器
Modern browsers and Internet Explorer 11+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
|Edge| last 2 versions| last 2 versions| last 2 versions

## 讨论和交流(群里有vue3+ts和react17视频教程 )
[WeChat group](http://8.135.1.141/file/images/wx-groud.png)

## 版本

[MIT](https://github.com/jzfai/vue3-admin-plus/blob/master/LICENSE) license.

Copyright (c) 2021-present  kuanghua


