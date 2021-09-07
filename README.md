#### 更新日志
```
// 2021-09-07
1.增加了echart图表使用示例
2.增加了富文本编辑器tinymce使用示例
```

### 前言
#### 本架构使用的技术为：vue3(setup-script)+vite2+element-plus 的新一代的前端框架，框架使用类似 vue-admin-template

```
框架有js和ts版本
js版本分支：https://github.com/jzfai/vue3-admin-template.git
ts版本分支：https://github.com/jzfai/vue3-admin-ts.git
plus分支：https://github.com/jzfai/Vue3-Admin-Plus.git
如果想学习vue3+vite2的可以把这个框架和vue-admin-template框架进行对比，后期也我会出在架构设计过程中
vue2和vue3的区别，以及如何快速的把vue2迁移到3中的教程
```

> 开发和使用感受：两个字 真香！！！！！

#### 和 vue-admin-template 的区别

##### 1.布局方式全部采用 flex 代替以前的 float，float 布局方式全部移除

##### 2.采用 vue3(setup-script)书写，用 vite2 替换 webpack，加入了 vue3 的 jsx 写法

##### 3.简化了部分复杂的逻辑

### 效果

### 线上体验地址：http://8.135.1.141/vue3-admin-plus

![http://8.135.1.141/file/images/1631018643776.png](http://8.135.1.141/file/images/1631018643776.png)

#### 页面首次渲染 加载资源（366K） 页面完全打开（0.36s）

![http://8.135.1.141/file/images/1629541566667.png](https://upload-images.jianshu.io/upload_images/21080604-b5dc141d2d6425e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 如何运行

```javascript

克隆项目
git clone https://github.com/jzfai/vue3-admin-plus.git

进入项目目录
cd  vue3-admin-plus

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

#### 如果需要实时交流的可以加入wx群(有vue3+ts视频教程)

 ![http://8.135.1.141/file/images/1631005886699.png](http://8.135.1.141/file/images/1631005886699.png)

大家的支持是我前进的动力    欢迎加入一起开发
