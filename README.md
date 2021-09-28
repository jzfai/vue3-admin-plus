#### 更新日志
```
// 2021-09-27
add multi function   can  view  http://8.135.1.141/vue3-admin-template
add prod mock
// 2021-09-28
add keep-alive transition and fix some issue
```
### 前言
### 本架构为最基础的版本，适合学习和作为基础模板使用，如果需要查看具体实例请查看
#### https://github.com/jzfai/vue3-admin-plus.git
[https://github.com/jzfai/vue3-admin-plus.git]: vue3-element-plus
#### 本架构使用的技术为：vue3(setup-script)+vite2+element-plus 的新一代的前端框架，框架使用类似 vue-admin-template

```
框架有js和ts版本
js版本：https://github.com/jzfai/vue3-admin-template.git
ts版本：https://github.com/jzfai/vue3-admin-ts.git
plus版本：https://github.com/jzfai/vue3-admin-plus.git
新一代的微服务架构：https://github.com/jzfai/micro-service-plus
如果想学习vue3+vite2的可以把这个框架和vue-admin-template框架进行对比，后期也我会出在架构设计过程中
vue2和vue3的区别，以及如何快速的把vue2迁移到3中的教程
```

> 开发和使用感受：两个字 真香！！！！！

#### 和 vue-admin-template 的区别

##### 1.布局方式全部采用 flex 代替以前的 float，float 布局方式全部移除

##### 2.采用 vue3(setup-script)书写，用 vite2 替换 webpack，加入了 vue3 的 jsx 写法

##### 3.简化了部分复杂的逻辑

### 效果

### 线上体验地址：http://8.135.1.141/vue3-admin-template

![http://8.135.1.141/file/images/1629713090928.png](http://8.135.1.141/file/images/1629713090928.png)

![http://8.135.1.141/file/images/1629541566667.png](https://upload-images.jianshu.io/upload_images/21080604-9a46f48ee9114e08.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 页面首次渲染 加载资源（366K） 页面完全打开（0.36s）

![http://8.135.1.141/file/images/1629541566667.png](https://upload-images.jianshu.io/upload_images/21080604-b5dc141d2d6425e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 如何运行

```javascript

克隆项目
git clone https://github.com/jzfai/vue3-admin-template.git

进入项目目录
cd  vue3-admin-template

运行yarn安装依赖
yarn

运行dev命令
yarn run dev


补充：这里说下package.json里的scripts命令
"scripts": {
  "dev": "vite --mode serve-dev", ---- 开发时运行
   "build": "vite build --mode build",  ---- 打包发布生产环境
   "serve": "vite preview --mode build" ---- 这个是在你本地打包完后（yarn run build）后会生产一个dist文件夹，这个命令在你本地启动一个本地服务用于查看dist文件内容，发布生产前可以用这个先看下打包的效果
   "preview:build": "yarn run build && vite preview " --- 构建并查看（建议更新上product前运行一次,查看是否有问题）
},
```

##### 后期会出架构中 vue3+vite2 开发时的一些坑以及如何快速的把 vue2 项目迁移到 vue3，框架还在努力开发中，但是基本功能已经完成

#### 如果需要实时交流的可以加入wx群(有vue3+ts视频教程)



 ![http://8.135.1.141/file/images/wx-groud.png](http://8.135.1.141/file/images/wx-groud1.png)

大家的支持是我前进的动力    欢迎加入一起开发
