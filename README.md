# vite-plugin-amd-babel

#### 介绍

让你在使用 vite + vue2 的时候兼容到 ie9。 

[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 只能兼容到ie11,还会打包两份代码,

使用`vite-plugin-amd-babel`就只会打包一份代码,代价是增加了require.js

#### 软件架构

vite 不兼容低版本浏览器的原因是打包格式为 es
将输出的类型改为 amd 再用 [babel](https://github.com/rollup/plugins/tree/master/packages/babel) 转换一下就轻松兼容到 ie9 了(vue3 就不要想了)  

#### 使用说明

> 参考./example 

1. 安装`vite-plugin-amd-babel`  ,`@babel/preset-env`

2. vite.config.js

   ```js
   import { createVuePlugin } from 'vite-plugin-vue2'
   import amdBabel from 'vite-plugin-amd-babel';
   export default {
     plugins: [createVuePlugin(), amdBabel(
       // {
       //   requirejs: "/js/require.min.js"//从cdn下载下来放到public
       // }
     )]
   }
   ```

3. babel.config.js

   ```js
   module.exports = function (api) {
       api.cache(true);
       const presets = [
           ['@babel/preset-env', {
               'targets': [
                   'last 2 version',
                   'ie >= 9'
               ],
               modules: false
           }]
       ];
       const plugins = [
       ];
       return {
           presets,
           plugins
       };
   };
   ```
#### 参考代码

[linsk1998/vite-plugin-amd](https://github.com/linsk1998/vite-plugin-amd)
