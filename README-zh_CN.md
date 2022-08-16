# vue3-admin-plus

**中文** | [English](./README.md)



> vue3-admin-plus提供企业级的开发demo

本架构使用的技术为：vue3(setup-script)+vite3+element-plus 的新一代的前端框架，It's fast!

使用 eslint+prettier+gitHooks 格式和校验代码,提高代码规范性和开发效率

使用最先进的包管理工具pnpm

Vite need  Node.js 16+

## 文档

- [真香定律！带你用vue3+vite2撸后台（系列文章入口）](https://juejin.cn/post/7036302298435289095)

- [中文官网](https://github.jzfai.top/vue3-admin-doc/zh/)

## 线上体验

github 地址：  https://github.com/jzfai/vue3-admin-plus.git

国内体验地址：https://github.jzfai.top/vue3-admin-plus


## 例子

---- 我们先看看加载速度和构建后的包大小：

![template-speed-analysis](https://github.jzfai.top/file/images/template-speed-analysis.png)

![template-demo](https://github.jzfai.top/file/images/template-demo.png)

## 相关项目

框架有js，ts，plus和electron版本

- js版本：[vue3-element-admin](https://github.com/jzfai/vue3-admin-template.git)
- ts版本：[vue3-element-ts](https://github.com/jzfai/vue3-admin-ts.git)
- js实例参考plus版本：[vue3-element-plus](https://github.com/jzfai/vue3-admin-plus.git)
- electron版本：[vue3-element-electron](https://github.com/jzfai/vue3-admin-electron.git)
- react版本： [react-admin-template](https://github.com/jzfai/react-admin-template.git)
- java微服务后台数据：[micro-service-plus](https://github.com/jzfai/micro-service-plus)

> 开发和使用感受：两个字 真香！！！！！



vue3和vue2在性能上的对比

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

- **使用Proxy代替defineProperty实现数据响应式**

- **重写虚拟DOM的实现和Tree-Shaking**

[vite2和webpack打包速度上的对比](https://github.com/jzfai/vue3-admin-plus/issues/2)

## 构建步骤

```bash
# 克隆项目
git clone https://github.com/jzfai/vue3-admin-plus.git

# 进入项目目录
cd  vue3-admin-plus

# pnpm address https://pnpm.io/zh/motivation
# 安装依赖(建议用pnpm)
# 你可以使用 "npm -g i pnpm@7.9.0" 去安装pnpm
pnpm i

# 启动服务
pnpm run dev
```

浏览器访问 http://localhost:5001


## 发布

```bash
# 构建测试环境
pnpm run build-serve

# 构建生产环境
pnpm run build
```

## 其它

```bash
# 预览发布环境效果
pnpm run preview:build-serve

# 预览生产环境
pnpm run preview

# 代码格式检查并自动修复
pnpm run lint
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
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
#- Markdown2html
```

>注：#---暂未实现(希望大家能一起开发)

## 额外

架构开发不易，如果感觉好，请给我点个 star ，架构还在不断完善中，欢迎加入我开发，一起成为Contributors ！！！！

## 浏览器支持

注意：vue3不在支持IE浏览器




## 讨论和交流(含vue3+ts视频教程)
[WeChat group](https://github.jzfai.top/file/images/wx-groud.png)




