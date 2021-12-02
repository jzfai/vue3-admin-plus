# vue3-admin-plus

**English** | [中文](./README-zh_CN.md)

> vue3 admin plus provides enterprise-level development demo

A new  generation admin  construct   using  vue3(setup-script)+vite2+element-plus ，It's fast!

Use eslint+prettier+gitHooks format and verification code to improve code standardization and development efficiency


## Update log

```javascript
//11-11
update element-plus vite2 vue3 version ,add func of element-svg icon for side menu
add domo of 'import export download template' in CRUD
//11-26
update vue3 version and so on;
add keep-alive use demo and router using  demo ，look for "http://8.135.1.141/vue3-admin-template/#/writing-demo/keep-alive"
add the param cachePage and leaveRmCachePage to route for keep-alive,look for https://github.com/jzfai/vue3-admin-template/blob/master/src/router/index.js
add collection the error log of img loading fail,look for "http://8.135.1.141/vue3-admin-template/#/error-log/log"
in router page you need add root element,such as div, but is not necessary for children component
fix some issue
```

## Online experience

[github address](https://github.com/jzfai/vue3-admin-plus.git)

[Access address](http://8.135.1.141/vue3-admin-plus)

国内体验地址：http://8.135.1.141/vue3-admin-plus

github 地址：  https://github.com/jzfai/vue3-admin-plus.git

## Demo

 ---- Let's look at the loading speed and the size of the built package first.：

![template-speed-analysis](http://8.135.1.141/file/images/template-speed-analysis.png)

![template-demo](http://8.135.1.141/file/images/plus-demo.png)


## Related items

The framework is available in js, ts and plus versions
- js version：[vue3-element-admin](https://github.com/jzfai/vue3-admin-template.git)
- ts version：[vue3-element-ts](https://github.com/jzfai/vue3-admin-ts.git)
- js version for plus：[vue3-element-plus](https://github.com/jzfai/vue3-admin-plus.git)
- react version： [react-admin-template](https://github.com/jzfai/react-admin-template.git)
- java Micro-service background data：[micro-service-plus](https://github.com/jzfai/micro-service-plus)
> development and  experience：two words  Really fragrant！！！！！

## Documents

- [目录结构，代码格式eslint+pretty，以及git hooks 使用（基础篇）](https://juejin.cn/post/7036301333304967181)
- [前端proxy跨域，nginx，后端跨域配置介绍， 以及跨域原理简介（基础篇）](https://juejin.cn/post/7029560170451566606)
- [Vue3 ref和reactive的使用和区别以及响应式原理](https://juejin.cn/post/7029559671648518151)

#### Comparison of performance between vue3 and vue2

- 41% reduction in package size

- The initial rendering is 55% faster, the update rendering is 133% faster

- Memory reduction 54%

- **Use Proxy instead of defineProperty to implement data responsiveness**

- **Rewrite the implementation of virtual DOM and Tree-Shaking**


[Comparison of packaging speed between vite2 and webpack](https://github.com/jzfai/vue3-admin-plus/issues/2)

## Build Setup

```bash
# clone the project
git clone https://github.com/jzfai/vue3-admin-plus.git

# enter the project directory
cd vue3-admin-plus

# install dependency(Recommend use yarn)
yarn

# develop
yarn run dev
```

using the browser to open http://localhost:5001

## Build

```bash
# build for dev environment
yarn run build-serve

# build for production environment
yarn run  build
```

## Others

```bash
# preview the dev environment effect
yarn run preview:build-serve

# preview the release environment effect
yarn run preview

# code format check
yarn run lint

```

## Extra

Architecture development is not easy. If you feel good, please give me a **start**. The architecture is still being improved. Welcome to join me in development and become Contributors together! ! ! !


## Browsers support

Note: Vue3 is not supported the Internet Explorer

Modern browsers and Internet Explorer 11+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
|Edge| last 2 versions| last 2 versions| last 2 versions

## Discussion and Communication
[WeChat group](http://8.135.1.141/file/images/wx-groud.png)

## License

[MIT](https://github.com/jzfai/vue3-admin-plus/blob/master/LICENSE) license.

Copyright (c) 2021-present  kuanghua

